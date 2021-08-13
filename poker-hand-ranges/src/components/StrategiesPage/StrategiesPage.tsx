import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Hand, HandRange, MultiAction } from '../../models/models';
import { MainStore } from '../../stores/MainStore';
import HandRangeTemplate from '../HandRangeTemplate/HandRangeTemplate';
import NewTableModal from '../NewTableModal/NewTableModal';
import PositionFilter from '../PositionFilter/PositionFilter';
import styles from './StrategiesPage.module.scss';
const data = require('../../testdata/TestData.json');

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
				<main className={styles.mainContainer}>
					{data.map((handRange: HandRange) => {
						if (handRange.hero.position === MainStore.positionFilter.hero) {
							return <HandRangeTemplate table={handRange.hands} />;
						}

						return null;
					})}

					<button onClick={() => MainStore.toggleModal()} className={styles.newTableButton}>
						New hand range
					</button>
				</main>

				{MainStore.isOpenModal && <NewTableModal />}
				<PositionFilter />
			</div>
		);
	}
}
