import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { ACTIONS, STACKS } from '../../models/constants';
import { Actions, HandRange, Stacks } from '../../models/models';
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
			<main>
				<section className={styles.topPageFilters}>
					<article className={styles.stackFilter}>
						{STACKS.map((stack: Stacks) => (
							<button className={styles.filterButton}>{stack}bb</button>
						))}
					</article>
					<article className={styles.actionFilter}>
						<article className={styles.hero}>
							{ACTIONS.map((action: Actions) => (
								<button className={styles.filterButton}>{action}</button>
							))}
						</article>
						vs
						<article className={styles.villain}>
							{ACTIONS.map((action: Actions) => (
								<button className={styles.filterButton}>{action}</button>
							))}
						</article>
					</article>
				</section>

				<section className={styles.mainContainer}>
					{data.map((handRange: HandRange) => {
						if (handRange.hero.position === MainStore.positionFilter.hero) {
							return <HandRangeTemplate table={handRange.hands} />;
						}

						return null;
					})}

					<button onClick={() => MainStore.toggleModal()} className={styles.newTableButton}>
						New hand range
					</button>
				</section>

				{MainStore.isOpenModal && <NewTableModal />}
				<PositionFilter />
			</main>
		);
	}
}
