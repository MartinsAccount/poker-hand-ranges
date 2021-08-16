import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { MainStore } from '../../stores/MainStore';
import HandRangeConfig from '../HandRangeConfig/HandRangeConfig';
import HandRangeTemplate from '../HandRangeTemplate/HandRangeTemplate';
import styles from './NewTableModal.module.scss';

interface IPositionFilterProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export default class NewTableModal extends Component<IPositionFilterProps> {
	render() {
		const { MainStore } = this.props;

		return (
			<div className={styles.modalContainer}>
				<div className={styles.modalContent}>
					{/* <HandRangeTemplate table={MainStore.newHandRange} /> */}
					<HandRangeConfig />
				</div>
			</div>
		);
	}
}
