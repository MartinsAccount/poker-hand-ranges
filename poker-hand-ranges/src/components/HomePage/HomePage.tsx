import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { MainStore } from '../../stores/MainStore';
import NavBar from '../NavBar/NavBar';

interface IStrategiesPageProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export default class StrategiesPage extends Component<IStrategiesPageProps> {
	render() {
		const { MainStore } = this.props;

		return <div></div>;
	}
}
