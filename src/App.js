import './App.css'
import './colors.css'
import { ProposalList } from './components/ProposalList.js'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Proposal } from './components/Proposal.js'
import { Summary } from './components/Summary.js'
import logo from './logo.svg'

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">
          <header>
            <img src={logo} className="logo"/>
            <h1>Decentraland DAO proposal voting data</h1>
          </header>
        </Link>
        {/* <Link to="/all">
          <h2>All vote activity summary</h2>
        </Link> */}
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
          .logo {
            width: 2rem;
            margin-right: 1rem;
            vertical-align: middle;
          }
          ul {
            padding:0;
          }
          a {
            text-decoration: none;
            color: black;
          }
          a:visited {
            color: grey;
          }
          a:visited h1, h2 {
            color: black;
          }
          header {
            font-size: 1rem;
          }
          h1 {
            display: inline;
            vertical-align: middle;
          }
        `}</style>
    </div>
    </Router>
  );
}

export default App;
