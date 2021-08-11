import './App.scss';
import React, { Component } from 'react';
import HandRangeTemplate from './components/HandRangeTemplate/HandRangeTemplate';
import { Provider } from 'mobx-react';
import { MainStore } from './stores/MainStore';
import HandRangeConfig from './components/HandRangeConfig/HandRangeConfig';
import PositionFilter from './components/PositionFilter/PositionFilter';

interface IAppProps {
	MainStore?: MainStore;
}

export default class App extends Component<IAppProps> {
	private stores = { MainStore: new MainStore() };

	render() {
		return (
			<Provider {...this.stores}>
				<div className="App">
					<HandRangeTemplate />
					<HandRangeConfig />
					<PositionFilter />
					<button className="newTableButton">New hand range</button>
				</div>
			</Provider>
		);
	}
}
