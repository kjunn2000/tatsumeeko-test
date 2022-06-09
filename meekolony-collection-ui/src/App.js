import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import MeekolonyCollection from "./pages/MeekolonyCollection";
import MeekolonyHolder from "./pages/MeekolonyHolder";
import Nav from "./components/Nav/Nav";
function App() {
  return (
    <div className="App min-h-screen bg-slate-900">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/meekolony-collection">
            <MeekolonyCollection />
          </Route>
          <Route exact path="/meekolony-holder">
            <MeekolonyHolder />
          </Route>
          <Route path="/">
            <Redirect to="/meekolony-collection" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
