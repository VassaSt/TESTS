reearth.ui.show(`
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap');

  html,
  body {
    margin: 0;
    overflow: hidden;
    font-family: "Roboto";
    font-size: 12px;
    font-weight: 500;
    line-height: 120%;
  }

  button {
    cursor: pointer;
    border-radius: 4px;
    border: none;
    box-shadow: 1px 1px 4px 0px rgba(124, 124, 124, 0.20);
    color: #ffffff;
    margin-bottom: 5px;
    background-color: #4c00ff;
  }

  #wrapper {
    box-sizing: border-box;
    max-width: 210px;
    max-height: 560px;
    border-radius: 4px;
    background-color: #ffffff;
    padding: 12px;
    border-radius: 4px;
    overflow: auto;
  }

  #search {
    margin: 8px 0;
  }

  #start-btn {
    display: block;
    width: 100%;
    padding: 4px 24px;
  }
</style>
<div id="wrapper">
  <label for="search">Search: </label>
  <input id="search" type="text">

  <button id="start-btn"> START </button>
</div>

<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script src='https://unpkg.com/@turf/turf@6/turf.min.js'></script>
<script>
  let reearth, cesium, property, layers, layerId
  let newDay = new Date();

  const btn = document.getElementById("start-btn")

  let czml = [
    {
      id: "document",
      name: "CZML Polygon - Interpolating References",
      version: "1.0",
    }]

  let latValue = "52.52";
  let longValue = "13.41";
  let start = "2024-03-16";
  let end = "2024-03-16";
  let params = "temperature_2m,relative_humidity_2m,rain";
  //Temperature, Precipitation, Humidity, Wind, Sunlight,　Frost, Hail, Relative humidity, Soil moisture, Clouds, 

  window.addEventListener("message", function (e) {
    if (e.source !== parent) return;
    reearth = e.source.reearth
    layers = reearth.layers.layers;
    cesium = reearth.Cesium;
  })

  async function getWeather() {
    let apiUrl = "https://archive-api.open-meteo.com/v1/archive?latitude=" + latValue + "&longitude=" + longValue + "&start_date=" + start + "&end_date=" + end + "&hourly=" + params;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }

  function timeSet(item) {
    let date = new Date(item);
    // let result = new Date(date + date.getTimezoneOffset())
    return date.toJSON();
  }

  function setLableObj(item) {
    let result = {
      text: item,
      font: "18px Roboto",
      showBackground: false,
      horizontalOrigin: "CENTER",
      VerticalOrigin: "TOP",
      style: "FILL",
      fillColor: {
        rgba: [255, 255, 255, 255],
      },
      outlineWidth: 2,
      pixelOffset: {
        cartesian2: [0, 15],
      },
    }
    return result;
  }

  function czmlObject(i, item, time, coords, color) {
    let height = item * 1000;
    //TO DO: create from latValue, longValue more 3 points for polygon
    let result = {
      id: i,
      name: item,
      availability: time,
      polygon: {
        positions: {
          cartographicDegrees: coords,
        },
        material: {
          solidColor: {
            color: {
              rgba: color,
            },
          },
        },
        height: 0,
        extrudedHeight: height,
      },
    }

    return result
  }

  function getCoords(center) {
    const radius = 10;
    const options = { steps: 4, units: 'kilometers' };
    const circle = turf.circle(center, radius, options);
    const coordsArray = circle.geometry.coordinates[0]
    return [coordsArray[0][0], coordsArray[0][1], 0, coordsArray[1][0], coordsArray[1][1], 0, coordsArray[2][0], coordsArray[2][1], 0, coordsArray[3][0], coordsArray[3][1], 0]
  }

  function getCoords2(center) {
    let radius = 10;
    const options = { steps: 4, units: 'kilometers' };
    const circle = turf.circle(center, radius, options);
    const center2 = circle.geometry.coordinates[0][0]
    const radius2 = 10;
    const circle2 = turf.circle(center2, radius2, options);
    const coordsArray = circle2.geometry.coordinates[0]
    return [coordsArray[0][0], coordsArray[0][1], 0, coordsArray[1][0], coordsArray[1][1], 0, coordsArray[2][0], coordsArray[2][1], 0, coordsArray[3][0], coordsArray[3][1], 0]
  }


  btn.addEventListener('click', loadData);

  function setCzml(data) {
    let center = [longValue, latValue];
    let coords = getCoords(center)
    let center2 = [coords[3], coords[4]]
    let coords2 = getCoords2(center2)
    let center3 = [coords2[3], coords2[4]]
    let coords3 = getCoords2(center3)

    for (let i = 0; i < data.time.length; i++) {
      // const element = data.time[i];
      const rain = data.rain[i];
      let temperature = data.temperature_2m[i];
      let humidity =data.relative_humidity_2m[i]

      let startTime = timeSet(data.time[i]);
      let endTime = timeSet(new Date(data.time[i]).setMilliseconds(new Date(data.time[i]).getMilliseconds() + 3.6e+6));
      let time = startTime + "/" + endTime;

      let x = "T_" + i;
      let obj = czmlObject(x, temperature, time, coords, [0, 0, 255, 185])
      // TO DO one more object for lable (point or box)
      // obj.label = setLableObj(temperature)

      let y = "R_" + i;
      let obj2 = czmlObject(y, rain, time, coords2, [0, 255, 0, 185])
      // obj2.label = setLableObj(rain)
      // czml.push(obj)
      // czml.push(obj2)

      let h = "H_" + i;
      let obj3 = czmlObject(h, humidity, time, coords3, [255, 0, 0, 185])
      // obj3.label = setLableObj(humidity)

      czml.push(obj)
      czml.push(obj2)
      czml.push(obj3)
      
    }
    czml[0].clock = {
      interval: timeSet(data.time[0]) + "/" + timeSet(data.time[data.time.length - 1]),
      currentTime: timeSet(data.time[0]),
      multiplier: 100000,
    }
    console.log("czml: ", czml);
    czmlInLayer(czml)

  }


  function czmlInLayer(czml) {
    layerId = reearth.layers.add({
      type: "simple",

      // 1. how to load data
      data: {
        type: "czml",
        url: czml,
      },
    });

    reearth.camera.flyTo({
      lng: longValue,
      lat: latValue,
      height: 1500000.0,
      pitch: -1.5,
    }, {
      duration: 2
    });
    // console.log(layerId);
  }

  async function loadData() {
    const weatherData = await getWeather();
    setCzml(weatherData.hourly)
  }

</script>
`,);

reearth.on("update", send);
send();

function send() {
reearth.ui.postMessage({
property: reearth.widget.property,
layers: reearth.layers.layers
})
}