import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Character from "./Containers/Character"
import { Switch, Route, BrowserRouter } from 'react-router-dom'

ReactDOM.render( <BrowserRouter><Switch>
    <Route exact path="/" component={App} />
    <Route path="/characters" component={Character} />
  </Switch></BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
