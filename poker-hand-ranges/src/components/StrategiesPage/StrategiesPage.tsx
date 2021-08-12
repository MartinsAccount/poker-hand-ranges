import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { MainStore } from '../../stores/MainStore';
import NewTableModal from '../NewTableModal/NewTableModal';
import PositionFilter from '../PositionFilter/PositionFilter';
import styles from './StrategiesPage.module.scss';

interface IStrategiesPageProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export default class StrategiesPage extends Component<IStrategiesPageProps> {
	render() {
		const { MainStore } = this.props;

		return (
			<div>
				{MainStore.isOpenModal && <NewTableModal />}
				<button onClick={() => MainStore.toggleModal()} className={styles.newTableButton}>
					New hand range
				</button>
				<PositionFilter />
			</div>
		);
	}
}
