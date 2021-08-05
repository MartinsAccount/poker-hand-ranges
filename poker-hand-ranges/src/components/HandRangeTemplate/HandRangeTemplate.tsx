import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Hand } from '../../models/models';
import { MainStore } from '../../stores/MainStore';
import styles from './HandRangeTemplate.module.scss';

// [{
//     name: "sb",
//     stack: 25,
//     action: "limp",
//     versus: "btn",
// },
// {
//     name: "btn",
//     stack: 60,
//     action: "raise",
//     versus: "utg1",
// },
// ];

// const PFI_STRATEGY = [
//   {
//     name: "sb",
//     stack: 25,
//     action: "limp",
//     versus: "btn",
//   },
//   {
//     name: "btn",
//     stack: 60,
//     action: "raise",
//     versus: "utg1",
//   },
// ];

// const cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

// const handRange = [
//     {
//         hand: "AA",
//     },
// ];

interface IHandRangeTemplateProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export default class HandRangeTemplate extends Component<IHandRangeTemplateProps> {
	// constructor(props: any) {
	//     super(props);
	// }

	componentDidMount() {
		this.props.MainStore!.createRange();
	}

	render() {
		return (
			<div>
				{this.props.MainStore!.handRange.map((row: Hand[]) => (
					<div className={styles.row}>
						{row.map((cell: Hand) => (
							<div
								// onClick={() => this.changeHandRange(cell.card)}
								className={`${styles.cardCell} ${cell.action ? styles.clicked : null}`}
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
