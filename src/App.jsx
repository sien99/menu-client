import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Main from "./components/Main";


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/main" exact component={Main} />
          <Route path="*" component={()=><Redirect to="/main" />} />
        </Switch>
    </Router>
  );
}

export default App;
