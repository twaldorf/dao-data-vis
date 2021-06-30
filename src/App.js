import './App.css'
import { ProposalList } from './components/ProposalList.js'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { Proposal } from './components/Proposal.js'

function App() {

  const id = 'fc6f60a0-bdb5-11eb-8849-33c326fb5301'

  return (
    <Router>
      <div className="App">
        <Link to="/">
          <header>
            <h1>Decentraland proposal voting data</h1>
          </header>
        </Link>
        <Switch>
          <Route path="/:id">
            <Proposal />
          </Route>
          <Route path="/">
            <ProposalList />
          </Route>
        </Switch>
        <style jsx>{`
          .App {
            text-align: left;
            padding: 4rem;
          }
        `}</style>
    </div>
    </Router>
  );
}

export default App;
