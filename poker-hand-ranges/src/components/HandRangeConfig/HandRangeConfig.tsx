import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { MainStore } from '../../stores/MainStore';
import styles from './HandRangeConfig.module.scss';
import { Actions } from '../../models/models';
import { ACTIONS } from '../../models/constants';

interface IHandRangeConfigProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export default class HandRangeConfig extends Component<IHandRangeConfigProps> {
	render() {
		const { MainStore } = this.props;

		return (
			<div>
				{ACTIONS.map((action: Actions) => (
					<button className={styles.radioButton} onClick={() => MainStore!.selectAction(action)}>
						{action}
					</button>
				))}
				<ActionRadioButton action="fold" />
				<ActionRadioButton action="limp" />
				<ActionRadioButton action="allin" />
				<ActionRadioButton action="call" />
				<ActionRadioButton action="raise" />
				<ActionRadioButton action="3-bet" />
				<ActionRadioButton action="4-bet" />
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
