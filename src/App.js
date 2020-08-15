import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Activity from './pages/Activity';
import Settings from './pages/Settings';
import Overview from './pages/Overview';


function App() {
  return (
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/activitiy" component={Activity} />
    <Route exact path="/settings" component={Settings} />
    <Route exact path="/overview" component={Overview} />
    <Route component={Error404} />
  </Switch>
  );
}

export default App;
