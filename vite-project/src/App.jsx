import './App.css'
import user from "./user.json"

function Greeting(props) {
  const { name } = props;
  return (
      <h1 className='greeting'> Hello, <i className='emphasize'>{name}</i>.  Welcome!</h1>
  )
}

function Main() {
  return (
    <main className='app'>
      <h2>About me</h2>
      <p>Biography: ... </p>
      <div>Name: {user.name}</div>
      <ul>
        Hobbies:
        {user.hobbies.map((hobby) => (<li key={hobby}>{hobby}</li>))}
      </ul>
    </main>
  )
}

export default function App() {
  return (
    <section>
      <Greeting name="Everyone" />
      <Main/>
    </section>
  )
}

