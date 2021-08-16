import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { MainStore } from '../../stores/MainStore';
import styles from './HandRangeConfig.module.scss';
import { Actions, Groups, Positions, Stacks, Strategies } from '../../models/models';
import { ACTIONS, GROUPS_SELECT, POSITIONS, STACKS, STRATEGIES } from '../../models/constants';
import HandRangeTemplate from '../HandRangeTemplate/HandRangeTemplate';

interface IHandRangeConfigProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export default class HandRangeConfig extends Component<IHandRangeConfigProps> {
	render() {
		const { MainStore } = this.props;

		return (
			<div className={styles.outerContainer}>
				<div className={styles.titleContainer}>
					{/* <label htmlFor="title">Title</label> */}
					<input
						onChange={(e) => MainStore.configureHandRangeProperties('title', e.target.value)}
						type="text"
						id="title"
						placeholder="Give title to this hand range table"
					/>
				</div>

				<div className={styles.configContainer}>
					<div className={styles.actionsContainer}>
						{ACTIONS.map((action: Actions) => (
							<button
								className={`${styles.radioButton}  ${MainStore.selectedAction === action && styles.activeButton}`}
								onClick={() => MainStore!.selectAction(action)}
							>
								{action}
							</button>
						))}
					</div>

					<div className={styles.tableContainer}>
						<HandRangeTemplate table={MainStore.newHandRange} />

						<div className={styles.groupsContainer}>
							{GROUPS_SELECT.map((group: Groups) => (
								<button onClick={() => MainStore.selectGroup(group)} className={styles.groupsButton}>
									{group}
								</button>
							))}
						</div>
					</div>

					<div className={styles.customActionsContainer}></div>

					<div className={styles.mainConfigs}>
						<div className={styles.strategiesContainer}>
							{STRATEGIES.map((strategy: Strategies) => (
								<button
									onClick={(e) => MainStore.configureHandRangeProperties('strategy', strategy)}
									className={styles.radioButton}
								>
									{strategy}
								</button>
							))}
						</div>

						<div className={styles.stacksContainer}>
							{STACKS.map((stack: Stacks) => (
								<button className={styles.radioButton}>{stack}</button>
							))}
						</div>

						<div className={styles.positionsContainer}>
							<div className={styles.dropDown} onClick={() => MainStore.togglePositions('hero')}>
								<div className={`${styles.dropDownBlock} ${MainStore.isOpenPositions.hero && styles.openedDropDown}`}>
									{MainStore.handRangeStrategy.hero.position?.toUpperCase() || 'Select hero position'}
								</div>
								<div className={styles.dropDownContent}>
									{MainStore.isOpenPositions.hero &&
										POSITIONS.map((pos: Positions) => (
											<div onClick={() => MainStore.configureHandRangeProperties('hero', pos)}>{pos.toUpperCase()}</div>
										))}
								</div>
							</div>
							<p>vs</p>
							<div className={styles.dropDown} onClick={() => MainStore.togglePositions('villain')}>
								<div className={`${styles.dropDownBlock} ${MainStore.isOpenPositions.villain && styles.openedDropDown}`}>
									{MainStore.handRangeStrategy.villain.position?.toUpperCase() || 'Select villain position'}
								</div>
								<div className={styles.dropDownContent}>
									{MainStore.isOpenPositions.villain &&
										POSITIONS.map((pos: Positions) => (
											<div onClick={() => MainStore.configureHandRangeProperties('villain', pos)}>{pos.toUpperCase()}</div>
										))}
								</div>
							</div>
						</div>

						<div className={styles.descriptionContainer}>
							<label htmlFor="description">Description</label>
							<textarea
								onChange={(e) => MainStore.configureHandRangeProperties('description', e.target.value)}
								name="description"
								id="description"
								rows={6}
								cols={35}
							></textarea>
						</div>

						<button className={styles.save} onClick={() => MainStore.saveNewTable()}>
							Save
						</button>
					</div>

					<div onClick={() => MainStore.toggleModal()} className={styles.close}></div>
				</div>
			</div>
		);
	}
}
