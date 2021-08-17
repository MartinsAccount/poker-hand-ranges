import { action, computed, flow, observable, toJS } from 'mobx';
import { ACTIONS, CARDS, POSITIONS } from '../models/constants';
import { Actions, Groups, Hand, HandRange, MultiAction, Player, Players, Positions } from '../models/models';

export class MainStore {
	@observable newHandRange: Array<Hand[]> = [];
	@observable handRangeStrategy: HandRange = new HandRange();

	@observable isOpenActions: boolean = false;
	@observable isMouseDown: boolean = false;
	@observable isOpenModal: boolean = false;
	@observable selectedAction: Actions = 'fold';
	@observable isOpenPositions: { hero: boolean; villain: boolean } = { hero: false, villain: false };
	@observable positionFilter: { hero: Positions; villain: Positions } = { hero: 'bb', villain: 'sb' };

	@observable createMultiAction: boolean = false;
	@observable multiAction: { [key: string]: number } = {}; // {fold: 50}

	@observable heroParams: Player = { position: null, action: null };
	@observable villainParams: Player = { position: null, action: null };

	@action wheelHandle(e: WheelEvent, action: Actions) {
		// deltaY = +100/-100
		if (!this.createMultiAction) {
			return;
		}
		if (this.multiAction[action] === 100 && e.deltaY === -100) {
			// 100 fölé nem megy
			return;
		}
		if (this.multiAction[action] === 0 && e.deltaY === 100) {
			// 0 alá nem megy
			return;
		}
		if (this.sumActionsPercentages === 100 && e.deltaY === -100) {
			// összese 100% főlé nem megy
			return;
		}
		if (this.multiAction[action]) {
			this.multiAction[action] += e.deltaY * -0.05;
		}
		if (!this.multiAction[action] && e.deltaY === -100) {
			// ha még nincs az objectben
			this.multiAction[action] = 0 + e.deltaY * -0.05;
		}

		console.log(toJS(this.multiAction));
	}

	@computed get sumActionsPercentages() {
		if (Object.keys(this.multiAction).length) {
			return Object.values(this.multiAction).reduce((prev, cur) => prev + cur);
		}

		return 0;
	}

	@action createRange() {
		// card schema : "QJo" || "32s" || "KK"
		// soronként hozza létre a range-t
		// Egy számláló hogy hányszor megy végig a tömbön (13 szor kell összesen) pl.: round = 0
		let _handRange: Array<Hand[]> = [];

		for (let i = 0; i < CARDS.length; i++) {
			let round: number = i;
			let handRangeRow: Hand[] = [];

			CARDS.forEach((card: string, index: number) => {
				// equal
				if (index === round) {
					return handRangeRow.push({
						hand: `${card}${card}`,
						action: null,
						isMultiActions: false,
						multiActions: [],
						combos: 6
					});
				}
				// offsuit
				if (index < round) {
					return handRangeRow.push({
						hand: `${card}${CARDS[round]}o`,
						action: null,
						isMultiActions: true,
						multiActions: [],
						combos: 12
					});
				}
				// suit
				if (index > round) {
					return handRangeRow.push({
						hand: `${CARDS[round]}${card}s`,
						action: null,
						isMultiActions: false,
						multiActions: [],
						combos: 6
					});
				}
			});

			_handRange.push(handRangeRow);
		}
		this.newHandRange = _handRange;
		console.log(this.newHandRange);
	}

	@action changeHandRange(hand: Hand, click?: boolean) {
		// console.log(hand);
		if (this.isMouseDown || click) {
			this.newHandRange.forEach((row: Hand[]) => {
				row.forEach((cell: Hand) => {
					if (cell.hand === hand.hand) {
						// console.log(toJS(cell));
						if (click && cell.isMultiActions && cell.multiActions !== null) {
							cell.isMultiActions = false;
							cell.multiActions.length = 0;
							return;
						}
						if (click && cell.action !== null) {
							cell.action = null;
							return;
						}

						if (this.createMultiAction) {
							cell.isMultiActions = true;
							cell.multiActions = this.getCurrentMultiActions;

							return;
						}

						cell.action = this.selectedAction;
					}
				});
			});
		}
	}

	@computed get getCurrentMultiActions() {
		let _multiActions: any = [];

		for (const _action in this.multiAction) {
			if (this.multiAction[_action]) {
				_multiActions.push({
					action: _action,
					percent: this.multiAction[_action]
				});
			}
		}

		return _multiActions;
	}

	// TODO: Switch-nél kilehet cserélni a function-okat
	@action testFunc(cell) {
		if (this.createMultiAction) {
			cell.isMultiActions = true;
			cell.multiActions = this.getCurrentMultiActions;
			return;
		}
		cell.isMultiActions = false;
		cell.action = this.selectedAction;
	}

	@action selectGroup(group: Groups) {
		this.newHandRange.forEach((row: Hand[]) => {
			row.forEach((cell: Hand) => {
				switch (group) {
					case 'Aces':
						if (cell.hand.includes('A')) {
							this.testFunc(cell);
						}
						break;
					case 'Suited cards':
						if (cell.hand.includes('s')) {
							if (this.createMultiAction) {
								cell.isMultiActions = true;
								cell.multiActions = this.getCurrentMultiActions;
								return;
							}
							cell.isMultiActions = false;
							cell.action = this.selectedAction;
						}
						break;
					case 'Off-suited cards':
						if (cell.hand.includes('o')) {
							if (this.createMultiAction) {
								cell.isMultiActions = true;
								cell.multiActions = this.getCurrentMultiActions;
								return;
							}
							cell.isMultiActions = false;
							cell.action = this.selectedAction;
						}
						break;
					case 'Pocket pairs':
						if (cell.hand.charAt(0) === cell.hand.charAt(1)) {
							if (this.createMultiAction) {
								cell.isMultiActions = true;
								cell.multiActions = this.getCurrentMultiActions;
								return;
							}
							cell.isMultiActions = false;
							cell.action = this.selectedAction;
						}
						break;
					case 'All cards':
						if (this.createMultiAction) {
							cell.isMultiActions = true;
							cell.multiActions = this.getCurrentMultiActions;
							return;
						}
						cell.isMultiActions = false;
						cell.action = this.selectedAction;
						break;
					case 'Reset table':
						cell.isMultiActions = false;
						cell.multiActions = [];
						cell.action = null;

						break;
				}
			});
		});
	}
	@action isMouseDownToggle(e: React.MouseEvent<HTMLElement>) {
		if (e.type === 'mousedown') {
			this.isMouseDown = true;
			return;
		}
		this.isMouseDown = false;
	}

	@action configureHandRangeProperties(key: string, value: any, isVillainAction?: boolean) {
		const _handRangeStrategy = { ...this.handRangeStrategy };

		if (typeof _handRangeStrategy[key] !== 'object' || _handRangeStrategy[key] === null) {
			_handRangeStrategy[key] = value;
		}
		if (key === 'hero' || key === 'villain') {
			if (isVillainAction) {
				_handRangeStrategy[key].action = value;
			} else {
				_handRangeStrategy[key].position = value;
			}
		}

		this.handRangeStrategy = _handRangeStrategy;
	}

	// TODO: Kiszervezni valahogy ezt az iterációt
	// @computed get getTableCells() {
	// 	return this.handRange.forEach((row: Hand[]) => {
	// 		row.map((cell: Hand) => {
	// 			return cell;
	// 		});
	// 	});
	// }
	@action toggleEnabledMultiAction() {
		this.createMultiAction = !this.createMultiAction;

		if (this.createMultiAction) {
			this.selectedAction = null;
		}
		if (!this.createMultiAction) {
			this.multiAction = {};
		}
	}

	@action toggleModal() {
		this.isOpenModal = !this.isOpenModal;
	}
	@action selectAction(action: Actions) {
		if (this.createMultiAction) {
			this.selectedAction = null;
			return;
		}

		this.selectedAction = action;
	}

	// TODO: Nem működik még
	@action selectActionWithKey(e: React.KeyboardEvent<HTMLElement>) {
		console.log(e.key);

		// switch (e.key) {
		// 	case 70: // F
		// 		this.selectedAction = 'fold';
		// 		break;
		// 	case 76: // L
		// 		this.selectedAction = 'limp';
		// 		break;
		// 	case 67: // C
		// 		this.selectedAction = 'call';
		// 		break;
		// 	case 65: // A
		// 		this.selectedAction = 'allin';
		// 		break;
		// 	case 82: // R
		// 		this.selectedAction = 'raise';
		// 		break;
		// 	case 51: // 3
		// 		this.selectedAction = '3-bet';
		// 		break;
		// 	case 52: // 4
		// 		this.selectedAction = '4-bet';
		// 		break;
		// }
	}

	@action togglePositions(player: Players) {
		this.isOpenPositions[player] = !this.isOpenPositions[player];
	}
	@action toggleVillainActions() {
		this.isOpenActions = !this.isOpenActions;
	}

	@action changePositions(position: Positions, player: Players) {
		switch (player) {
			case 'hero':
				this.heroParams.position = position;
				break;
			case 'villain':
				this.villainParams.position = position;
				break;
		}
	}

	@action positionFiltering(pos: Positions, player: Players) {
		if (this.positionFilter[player] === pos) {
			this.positionFilter[player] = null;
			return;
		}
		this.positionFilter[player] = pos;
	}

	saveNewTable = flow(function* (this: MainStore) {
		const fetchOptions = {
			method: 'POST',
			mode: 'cors' as RequestMode,
			body: JSON.stringify(this.newHandRange),
			headers: {
				'Content-Type': 'application/json'
			}
		};

		this.handRangeStrategy.hands = toJS(this.newHandRange);
		console.log('STRATEGY', JSON.stringify(this.handRangeStrategy));

		yield fetch('http://localhost:5000/saveTable', fetchOptions);
	});
}
