import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Hand } from '../../models/models';
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
			<div>
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
							>
								{cell.hand}
							</div>
						))}
					</div>
				))}
			</div>
		);
	}
}
