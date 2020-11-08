import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { SearchUsers, RepoDetail } from "./modules";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/repos" component={RepoDetail} />

        <Route exact path="/" component={SearchUsers} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
