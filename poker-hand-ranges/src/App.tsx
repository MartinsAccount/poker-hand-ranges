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

	// stores = null;
	// constructor(props) {
	//   super(props);

	//   this.stores = { MainStore: new MainStore() };
	// }

	render() {
		// const stores = { MainStore: new MainStore() };

		return (
			<Provider {...this.stores}>
				<div className="App">
					<HandRangeTemplate />
					<HandRangeConfig />
					<PositionFilter />
				</div>
			</Provider>
		);
	}
}

// export default App;
