import './App.css'
import { ProposalList } from './components/ProposalList.js'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Proposal } from './components/Proposal.js'
import { Summary } from './components/Summary.js'

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">
          <header>
            <h1>Decentraland proposal voting data</h1>
          </header>
        </Link>
        <Link to="/all">
          <h2>All vote activity summary</h2>
        </Link>
        <Switch>
          <Route path="/:id">
            <Proposal />
          </Route>
          <Route path="/all">
            <Summary />
          </Route>
          <Route path="/">
            <ProposalList />
          </Route>
        </Switch>
        <style>{`
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
