import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/user/home/Home';
import Signup from './components/user/signup/Signup';
import Signin from './components/user/signin/Signin';
import Dashboard from './components/admin/dashboard/Dashboard';
import Accounts from './components/admin/accounts/Accounts';
import Settings from './components/admin/settings/Settings';
import Task from './components/admin/task/Task';
import useToken from './useToken';


const App = () => {
      
    function ProtectedRoute() {const {token, setToken} = useToken();
         
    if(!token) { 
          return <Signin setToken={setToken} />};}
  
  return (
      <div className="app">
        <Router>
      <Switch>
        <Route exact path="/"> <Home /></Route>
        <Route path="/signup"> <Signup/></Route>
        <Route path="/signin"> <Signin/></Route>
        <ProtectedRoute path="/dashboard"> <Dashboard/></ProtectedRoute>
        <Route path="/dashboard/accounts"> <Accounts/></Route>
        <Route path="/dashboard/settings"> <Settings/></Route>
        <Route path="/dashboard/tasks"> <Task/></Route>
        </Switch>
        </Router>
      </div>
  );

}

export default App;