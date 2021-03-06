import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import ForgotPassword from './Components/Auth/ForgotPassword';
import NotFound from './Components/Views/NotFound';


// views page
import Blog from './Components/Views/Blog';
import Profile from './Components/Views/Profile';
import AllUsers from './Components/Views/AllUsers';


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
    <Switch>
       <Route path="/" exact component={Login} />
       <Route path="/register" exact component={Register} />
       <Route path="/forgotpass" exact component={ForgotPassword} />
       <Route path="/blogs" exact component={Blog} />
       <Route path="/profiles/:user" exact component={Profile} />
       <Route path="/users" exact component={AllUsers} />


       <Route component={NotFound} />

       </Switch>
    </Router>
  );
}

export default App;
