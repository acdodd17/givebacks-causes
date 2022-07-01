import logo from '../src/assets/logo.png';
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Memberhub logo" />
        <h1 className='title'>Givebacks</h1>
        <p id='tagline'><em>Empowering communities through everyday purchases</em></p>
      </header>
    </div>
  );
}

export default App;
