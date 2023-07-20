import { Switch, Route, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './pages/Home';
import AddChannel from './pages/AddChannel';
import ChannelList from './pages/ChannelList';
import EditChannel from './pages/EditChannel';
import DeleteChannel from './pages/DeleteChannel';
import Navbar from './components/Navbar';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginStatus = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={AddChannel} />
        <Route exact path="/list" component={ChannelList} />
        <Route exact path="/edit/:id" component={EditChannel} />
        <Route exact path="/delete/:id" component={DeleteChannel} />
        <Route exact path="/login">
          <LoginForm onLoginStatusChange={handleLoginStatus} />
        </Route>
        {isLoggedIn ? (
          <>
            {/* Render other routes only when the user is logged in */}
            {/* Add more routes here for protected pages */}
          </>
        ) : (
          // If not logged in, redirect to login page
          <Redirect to="/login" />
        )}
      </Switch>
    </div>
  );
}

export default App;
