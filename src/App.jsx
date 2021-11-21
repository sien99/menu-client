import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Main from "./components/Main";
import Success from "./components/Payment/Success";
import Cancel from "./components/Payment/Cancel";


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/main" exact component={Main} />
          <Route path="/success" exact component={Success} />
          <Route path="/cancel" exact component={Cancel} />
          <Route path="*" component={()=><Redirect to="/main" />} />
        </Switch>
    </Router>
  );
}

export default App;
