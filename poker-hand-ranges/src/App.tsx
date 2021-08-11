import './App.scss';
import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { MainStore } from './stores/MainStore';
import PositionFilter from './components/PositionFilter/PositionFilter';
import StrategiesPage from './components/StrategiesPage/StrategiesPage';

export default class App extends Component {
	private stores = { MainStore: new MainStore() };

	render() {
		return (
			<Provider {...this.stores}>
				<div className="App">
					<StrategiesPage />
					<PositionFilter />
				</div>
			</Provider>
		);
	}
}
