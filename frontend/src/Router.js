import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import React from 'react';
import { observer, inject } from 'mobx-react';
import Page from '@/components/System/Page';
import HomePage from '@pages/HomePage/HomePage';
import NotFound from '@pages/System/NotFound';

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getPage(routerProps, Component, type) {
    return (
      <Page>
        <Component type={type} {...routerProps} />
      </Page>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={p => this.getPage(p, HomePage)} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default inject('services')(observer(Router));
