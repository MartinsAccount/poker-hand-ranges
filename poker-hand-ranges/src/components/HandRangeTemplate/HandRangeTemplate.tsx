import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Hand, MultiAction } from '../../models/models';
import { MainStore } from '../../stores/MainStore';
import styles from './HandRangeTemplate.module.scss';

interface IHandRangeTemplateProps {
	MainStore?: MainStore;
	configurable: boolean;
	onClick?: () => void;
	table?: any;
}

@inject('MainStore')
@observer
export default class HandRangeTemplate extends Component<IHandRangeTemplateProps> {
	static defaultProps = {
		configurable: true
	};

	componentDidMount() {
		this.props.MainStore!.createRange();
	}

	render() {
		const { MainStore, configurable, onClick } = this.props;

		return (
			<div className={styles.handRangeTable}>
				{this.props.table.map((row: Hand[], index) => (
					<div key={index} className={styles.row}>
						{row.map((cell: Hand) => (
							<div
								key={cell.hand}
								className={styles.cardCell}
								data-action={cell.action}
								onMouseDown={(e) => (configurable ? MainStore!.isMouseDownToggle(e) : null)}
								onMouseUp={(e) => (configurable ? MainStore!.isMouseDownToggle(e) : null)}
								onMouseMove={() => (configurable ? MainStore!.changeHandRange(cell) : null)}
								onClick={() => (configurable ? MainStore!.changeHandRange(cell, true) : onClick())}
							>
								<p className={styles.hand}>{cell.hand}</p>

								{cell.isMultiActions &&
									cell.multiActions.map((obj: MultiAction, index) => (
										// 36 / (100 / obj.percent)
										<span
											key={index}
											className={styles.multiActions}
											data-action={obj.action}
											style={{ width: `${36 / (100 / obj.percent)}px`, height: '36px' }}
										></span>
									))}
							</div>
						))}
					</div>
				))}
			</div>
		);
	}
}
