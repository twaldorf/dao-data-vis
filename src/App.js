import logo from './logo.svg'
import './App.css'

import { Figure } from './components/Figure.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      </header>
      <Figure size={800}/>
    </div>
  );
}

export default App;
