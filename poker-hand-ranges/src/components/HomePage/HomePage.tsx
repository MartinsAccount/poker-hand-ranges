import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { MainStore } from '../../stores/MainStore';
import styles from './HomePage.module.scss';

interface IStrategiesPageProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export default class StrategiesPage extends Component<IStrategiesPageProps> {
	render() {
		const { MainStore } = this.props;

		return (
			<>
				<section className={styles.landing}></section>
				<section className={styles.section3}></section>
				<section className={styles.section1}></section>
				<section className={styles.section2}></section>
			</>
		);
	}
}
