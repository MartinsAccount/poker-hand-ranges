import { action, computed, flow, observable, toJS } from 'mobx';
import { CARDS, POSITIONS } from '../models/constants';
import { Actions, Hand, HandRange, Player, Players, Positions } from '../models/models';

export class MainStore {
	@observable handRange: Array<Hand[]> = [];
	@observable isMouseDown: boolean = false;
	@observable isOpenModal: boolean = false;
	@observable selectedAction: Actions = 'fold';
	@observable heroParams: Player = { position: null, action: null };
	@observable villainParams: Player = { position: null, action: null };
	@observable isOpenPositions: { hero: boolean; villain: boolean } = { hero: false, villain: false };
	@observable positionFilter: { hero: Positions; villain: Positions } = { hero: 'bb', villain: 'sb' };
	@observable tableTitle: string = '';
	@observable tableDescription: string = '';

	@action createRange() {
		// card schema : "QJo" || "32s" || "KK"
		// soronként hozza létre a range-t
		// Egy számláló hogy hányszor megy végig a tömbön (13 szor kell összesen) pl.: round = 0
		// index < round: "card + cards[round] + o"  => "AKo"
		// index > round: "cards[round] + card + s"  => "AKs"
		// index === round: "card + card"  => "QQ"
		let _handRange: Array<Hand[]> = [];

		for (let i = 0; i < CARDS.length; i++) {
			let round: number = i;
			let handRangeRow: Hand[] = [];

			CARDS.forEach((card: string, index: number) => {
				// equal
				if (index === round) {
					return handRangeRow.push({
						hand: `${card}${card}`,
						action: null
					});
				}
				// offsuit
				if (index < round) {
					return handRangeRow.push({
						hand: `${card}${CARDS[round]}o`,
						action: null
					});
				}
				// suit
				if (index > round) {
					return handRangeRow.push({
						hand: `${CARDS[round]}${card}s`,
						action: null
					});
				}
			});
			// setTimeout(() => {
			// 	this.handRange.push(handRangeRow);
			// }, i * 30);
			_handRange.push(handRangeRow);
		}
		this.handRange = _handRange;
		console.log(this.handRange);
	}

	@action toggleModal() {
		this.isOpenModal = !this.isOpenModal;
	}

	@action changeHandRange(hand: Hand, click?: boolean) {
		// console.log(hand);
		if (this.isMouseDown || click) {
			this.handRange.forEach((row: Hand[]) => {
				row.forEach((cell: Hand) => {
					if (cell.hand === hand.hand) {
						// console.log(toJS(cell));
						cell.action = this.selectedAction;
					}
				});
			});
		}
	}
	@action selectGroup(group: string) {
		this.handRange.forEach((row: Hand[]) => {
			row.forEach((cell: Hand) => {
				switch (group) {
					case 'Aces':
						if (cell.hand.includes('A')) {
							cell.action = this.selectedAction;
						}
						break;
					case 'Suited cards':
						if (cell.hand.includes('s')) {
							cell.action = this.selectedAction;
						}
						break;
					case 'Offsuited cards':
						if (cell.hand.includes('o')) {
							cell.action = this.selectedAction;
						}
						break;
					case 'Pocket pairs':
						if (cell.hand.charAt(0) === cell.hand.charAt(1)) {
							cell.action = this.selectedAction;
						}
						break;
				}
			});
		});
	}

	// TODO: Kiszervezni valahogy ezt az iterációt
	@computed get getTableCells() {
		return this.handRange.forEach((row: Hand[]) => {
			row.map((cell: Hand) => {
				return cell;
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

	@action selectAction(action: Actions) {
		this.selectedAction = action;
	}
	@action togglePositions(player: Players) {
		this.isOpenPositions[player] = !this.isOpenPositions[player];
	}

	@action changeTableTitle(title: string) {
		this.tableTitle = title;
	}
	@action changeTableDescription(description: string) {
		this.tableDescription = description;
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
		this.positionFilter[player] = pos;
	}

	saveNewTable = flow(function* (this: MainStore) {
		const fetchOptions = {
			method: 'POST',
			mode: 'cors' as RequestMode,
			body: JSON.stringify(this.handRange),
			headers: {
				'Content-Type': 'application/json'
			}
		};

		yield fetch('http://localhost:5000/saveTable', fetchOptions);
	});
}
