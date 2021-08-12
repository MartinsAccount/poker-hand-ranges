import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Hand, MultiAction } from '../../models/models';
import { MainStore } from '../../stores/MainStore';
import styles from './HandRangeTemplate.module.scss';

interface IHandRangeTemplateProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export default class HandRangeTemplate extends Component<IHandRangeTemplateProps> {
	componentDidMount() {
		this.props.MainStore!.createRange();
	}

	render() {
		const { MainStore } = this.props;

		return (
			<div className={styles.handRangeTable}>
				{MainStore!.handRange.map((row: Hand[], index) => (
					<div key={index} className={styles.row}>
						{row.map((cell: Hand) => (
							<div
								key={cell.hand}
								className={styles.cardCell}
								data-action={cell.action}
								onMouseDown={(e) => MainStore!.isMouseDownToggle(e)}
								onMouseUp={(e) => MainStore!.isMouseDownToggle(e)}
								onMouseMove={() => MainStore!.changeHandRange(cell)}
								onClick={() => MainStore!.changeHandRange(cell, true)}
							>
								<p className={styles.hand}>{cell.hand}</p>

								{cell.isMultiActions &&
									cell.multiActions.map((obj: MultiAction) => (
										// 36 / (100 / obj.percent)
										<span
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
