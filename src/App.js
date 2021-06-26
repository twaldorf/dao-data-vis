import logo from './logo.svg'
import * as api from './scripts/api.js'
import './App.css'

import { Proposal } from './components/Proposal.js'

function App() {

  const id = 'fc6f60a0-bdb5-11eb-8849-33c326fb5301'

  return (
    <div className="App">
      <header>
      </header>
      <Proposal id={id} />
    </div>
  );
}

export default App;
