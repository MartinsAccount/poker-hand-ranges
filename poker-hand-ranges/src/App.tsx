import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { MainStore } from './stores/MainStore';
import StrategiesPage from './components/StrategiesPage/StrategiesPage';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';

export default class App extends Component {
	private stores = { MainStore: new MainStore() };

	render() {
		return (
			<Provider {...this.stores}>
				<Router>
					<div className="App">
						<NavBar />
						<Switch>
							<Route path="/home" component={HomePage}></Route>
							<Route exact path="/strategies" component={StrategiesPage}></Route>
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}
