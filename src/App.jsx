import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Success from "./components/Payment/Success";
import Cancel from "./components/Payment/Cancel";
import Error from "./components/Error/Error";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="main" element={<Main />} />
          <Route path="dashboard" element={<Main />} />
          <Route path="payment">
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
          </Route>
          <Route path="/" element={<Navigate replace to="/main" />} />
          <Route path="*" element={<Error />} />
          
        </Routes>
    </Router>
  );
}

export default App;
