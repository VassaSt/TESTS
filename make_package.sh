# Get the current date and format it as YYYYMMDD
DATE=$(date +"%Y%m%d")
# Rename test-plugin.html to test-plugin.js
mv test-plugin.html test-plugin.js

if [ -f test-plugin-$DATE.zip ]; then
  zip -u test-plugin-$DATE.zip test-plugin.js reearth.yml
else
  zip test-plugin-$DATE.zip test-plugin.js reearth.yml
fi

# Rename test-plugin.js to its original name
mv test-plugin.js test-plugin.html
