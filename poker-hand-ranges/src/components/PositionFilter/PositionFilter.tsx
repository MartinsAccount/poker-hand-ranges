import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { MainStore } from '../../stores/MainStore';
import styles from './PositionFilter.module.scss';
import { POSITIONS } from '../../models/constants';
import { Positions } from '../../models/models';

interface IPositionFilterProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export default class PositionFilter extends Component<IPositionFilterProps> {
	render() {
		const { MainStore } = this.props;

		return (
			<>
				<div className={`${styles.positionsContainer} ${styles.heroPositions}`}>
					{POSITIONS.map((pos: Positions) => (
						<div
							className={`${styles.positionButton} ${MainStore.positionFilter.hero === pos && styles.activeButton}`}
							onClick={() => MainStore.positionFiltering(pos, 'hero')}
						>
							{pos.toUpperCase()}
						</div>
					))}
				</div>
				<div className={`${styles.positionsContainer} ${styles.villainPositions}`}>
					{POSITIONS.map((pos: Positions) => (
						<div
							className={`${styles.positionButton} ${MainStore.positionFilter.villain === pos && styles.activeButton}`}
							onClick={() => MainStore.positionFiltering(pos, 'villain')}
						>
							{pos.toUpperCase()}
						</div>
					))}
				</div>
			</>
		);
	}
}
