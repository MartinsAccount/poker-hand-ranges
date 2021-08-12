import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { MainStore } from '../../stores/MainStore';
import styles from './HandRangeConfig.module.scss';
import { Actions, Positions, Stacks } from '../../models/models';
import { ACTIONS, GROUPS_SELECT, POSITIONS, STACKS } from '../../models/constants';

interface IHandRangeConfigProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export default class HandRangeConfig extends Component<IHandRangeConfigProps> {
	render() {
		const { MainStore } = this.props;

		return (
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

				<div className={styles.stacksContainer}>
					{STACKS.map((stack: Stacks) => (
						<button className={styles.radioButton}>{stack}</button>
					))}
				</div>

				<div className={styles.positionsContainer}>
					<div className={styles.dropDown} onClick={() => MainStore.togglePositions('hero')}>
						<div className={styles.dropDownBlock}>{MainStore.heroParams.position?.toUpperCase() || 'Select hero position'}</div>
						<div className={styles.dropDownContent}>
							{MainStore.isOpenPositions.hero &&
								POSITIONS.map((pos: Positions) => (
									<div onClick={() => MainStore.changePositions(pos, 'hero')}>{pos.toUpperCase()}</div>
								))}
						</div>
					</div>
					<p>vs</p>
					<div className={styles.dropDown} onClick={() => MainStore.togglePositions('villain')}>
						<div className={styles.dropDownBlock}>
							{MainStore.villainParams.position?.toUpperCase() || 'Select villain position'}
						</div>
						<div className={styles.dropDownContent}>
							{MainStore.isOpenPositions.villain &&
								POSITIONS.map((pos: Positions) => (
									<div onClick={() => MainStore.changePositions(pos, 'villain')}>{pos.toUpperCase()}</div>
								))}
						</div>
					</div>
				</div>

				<div className={styles.inputsContainer}>
					<div className={styles.titleContainer}>
						<label htmlFor="title">Title</label>
						<input
							onChange={(e) => MainStore.changeTableTitle(e.target.value)}
							type="text"
							id="title"
							placeholder="Give title to this hand range table"
						/>
					</div>
					<label htmlFor="description">Description</label>
					<textarea
						onChange={(e) => MainStore.changeTableDescription(e.target.value)}
						name="description"
						id="description"
						rows={6}
						cols={35}
					></textarea>
				</div>

				<button className={styles.save} onClick={() => MainStore.saveNewTable()}>
					Save
				</button>

				<div onClick={() => MainStore.toggleModal()} className={styles.close}></div>

				<div className={styles.groupsContainer}>
					{GROUPS_SELECT.map((group: string) => (
						<button onClick={() => MainStore.selectGroup(group)} className={styles.groupsButton}>
							{group}
						</button>
					))}
				</div>

				{/* <ActionRadioButton action="fold" />
				<ActionRadioButton action="limp" />
				<ActionRadioButton action="allin" />
				<ActionRadioButton action="call" />
				<ActionRadioButton action="raise" />
				<ActionRadioButton action="3-bet" />
				<ActionRadioButton action="4-bet" /> */}
			</div>
		);
	}
}

interface IActionRadioButtonProps {
	MainStore?: MainStore;
	action: Actions;
}

@inject('MainStore')
@observer
class ActionRadioButton extends Component<IActionRadioButtonProps> {
	render() {
		const { MainStore, action } = this.props;

		return (
			<button className={styles.radioButton} onClick={() => MainStore!.selectAction(action)}>
				{action}
			</button>
		);
	}
}
