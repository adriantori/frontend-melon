import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Mains from './main/pages/Mains';
import Plants from './plant/pages/Plants';
import PlantStatus from './status/pages/PlantStatus';
import NewPlant from './plant/pages/NewPlant';
import UpdatePlant from './plant/pages/UpdatePlant';
import UpdateStats from './plant/pages/UpdateStats';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';


const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if(token){
    routes = (
      <Switch>
        <Route path="/" exact>
            <Mains />
          </Route>
          <Route path="/:plantId/status">
            <PlantStatus />
          </Route>
          <Route path="/addPlant" exact>
            <NewPlant />
          </Route>
          <Route path="/plants" exact>
            <Plants />
          </Route>
          <Route path="/plant/:plantId/stats">
            <UpdateStats />
          </Route>
          <Route path="/plant/:plantId/">
            <UpdatePlant />
          </Route>
          <Route path="/addPlant" exact>
            <NewPlant />
          </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Mains />
        </Route>
        <Route path="/auth" exact>
          <Auth/>
        </Route>
        <Redirect to="/auth" />
      </Switch>

    );
  }

  return (
    <AuthContext.Provider value={{ 
        isLoggedIn: !!token, 
        token: token, 
        userId: userId, 
        login: login, 
        logout: logout 
      }}>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
