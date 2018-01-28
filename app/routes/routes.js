require('../styles/style.sass')
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, IndexRoute, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import axios from 'axios'


import App from '../App.js';

axios.defaults.headers.common['access_token'] = localStorage.access_token


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#6699ff',
		accent1Color: '#ffac4d',
    textColor: '#454545',
    alternateTextColor: '#f3f5f2',
  },

  checkbox: {
    checkedColor: "#ffcc33",
    boxColor: "#222222",
    requiredColor: "#e1f5fe"
  },

});

var routes = (
	<MuiThemeProvider muiTheme={muiTheme}>
		<BrowserRouter>
			<div>
        <Switch>
			    <Route path="/" component={App}/>
        </Switch>
      </div>
		</BrowserRouter>
	</MuiThemeProvider>
);

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

render(routes, document.getElementById('root'));
