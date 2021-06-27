import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/header';
import Home from './home';
import StudentDetails from './student-detail';
import StudentAdd from './student-add';

const Navigator = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/details/:id" exact>
          <StudentDetails />
        </Route>
        <Route path="/studentAdd" exact>
          <StudentAdd />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default Navigator;
