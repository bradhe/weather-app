import React from 'react';
import {
  BrowserRouter,
  StaticRouter,
  Route,
  Switch,
} from 'react-router-dom'
import { connect } from "react-redux";

import Home from './pages/Home';

class Router extends React.Component {
  renderStaticRouter() {
    return (
      <StaticRouter location={this.props.path}>
        {this.props.children}
      </StaticRouter>
    );
  }

  renderBrowserRouter() {
    return (
      <BrowserRouter {...this.props}>
        {this.props.children}
      </BrowserRouter>
    );
  }

  render() {
    if (typeof window === 'undefined') {
      return this.renderStaticRouter();
    } else {
      return this.renderBrowserRouter();
    }
  }
};

class Routes extends React.Component {
  render() {
    const { dispatch } = this.props;

    return (
      <Router path={this.props.path}>
        <main>
          <Route exact path='/' component={Home} />
        </main>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Routes);
