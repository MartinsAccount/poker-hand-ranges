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

		const strategy = MainStore.handRangeStrategy.strategy;

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
								// @ts-ignore
								onWheel={(e) => MainStore.wheelHandle(e, action)}
							>
								<span
									className={styles.customActionButton}
									data-action={action}
									style={{ height: `${50 / (100 / MainStore.multiAction[action])}px` }}
								></span>
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

					<div className={styles.mainConfigs}>
						{/* <p className={styles.categoryLabel}>Select strategy</p> */}
						<div className={styles.strategiesContainer}>
							{STRATEGIES.map((strategy: Strategies) => (
								<button
									onClick={(e) => MainStore.configureHandRangeProperties('strategy', strategy)}
									className={`${styles.radioButton} ${MainStore.handRangeStrategy.strategy === strategy && styles.activeButton}`}
								>
									{strategy}
								</button>
							))}
						</div>

						{/* <p className={styles.categoryLabel}>Select effective stack size</p> */}
						<div className={styles.stacksContainer}>
							{STACKS.map((stack: Stacks) => (
								<button
									onClick={(e) => MainStore.configureHandRangeProperties('stack', stack)}
									className={`${styles.radioButton} ${MainStore.handRangeStrategy.stack === stack && styles.activeButton}`}
								>
									{stack}bb
								</button>
							))}
						</div>

						{/* <p className={styles.categoryLabel}>Select hero & villain params</p> */}
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
							<div
								className={`${styles.dropDown} ${strategy === 'PFI' && styles.disabled}`}
								onClick={() => strategy !== 'PFI' && MainStore.togglePositions('villain')}
							>
								<div
									className={`${styles.dropDownBlock} ${strategy === 'PFI' && styles.disabled} ${
										MainStore.isOpenPositions.villain && styles.openedDropDown
									}`}
								>
									{MainStore.handRangeStrategy.villain.position?.toUpperCase() || 'Select villain position'}
								</div>
								<div className={styles.dropDownContent}>
									{MainStore.isOpenPositions.villain &&
										POSITIONS.map((pos: Positions) => (
											<div onClick={() => MainStore.configureHandRangeProperties('villain', pos)}>{pos.toUpperCase()}</div>
										))}
								</div>
							</div>
							{MainStore.handRangeStrategy.strategy === 'Defense' && (
								<div className={styles.dropDown} onClick={() => MainStore.toggleVillainActions()}>
									<div className={`${styles.dropDownBlock} ${MainStore.isOpenActions && styles.openedDropDown}`}>
										{MainStore.handRangeStrategy.villain.action || 'Select villain action'}
									</div>
									<div className={styles.dropDownContent}>
										{MainStore.isOpenActions &&
											ACTIONS.map((action: Actions) => (
												<div onClick={() => MainStore.configureHandRangeProperties('villain', action, true)}>{action}</div>
											))}
									</div>
								</div>
							)}
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
