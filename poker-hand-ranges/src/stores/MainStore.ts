import { action, observable, toJS } from 'mobx';
import { CARDS, POSITIONS } from '../models/constants';
import { Actions, Hand, HandRange, Player, Positions } from '../models/models';

export class MainStore {
	@observable handRange: Array<Hand[]> = [];
	@observable isMouseDown: boolean = false;
	@observable selectedAction: Actions = 'fold';
	@observable heroParams: Player = { position: null, action: null };
	@observable villainParams: Player = { position: null, action: null };
	@observable isOpenPositions: { hero: boolean; villain: boolean } = { hero: false, villain: false };
	@observable positionFilter: { hero: Positions; villain: Positions } = { hero: 'bb', villain: 'bb' };

	@action createRange() {
		// card schema : "QJo" || "32s" || "KK"
		// soronként hozza létre a range-t
		// Egy számláló hogy hányszor megy végig a tömbön (13 szor kell összesen) pl.: round = 0
		// index < round: "card + cards[round] + o"  => "AKo"
		// index > round: "cards[round] + card + s"  => "AKs"
		// index === round: "card + card"  => "QQ"

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

			this.handRange.push(handRangeRow);
		}
		console.log(this.handRange);
	}

	@action changeHandRange(hand: Hand) {
		// console.log(hand);
		if (this.isMouseDown) {
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
	@action togglePositions(player: 'hero' | 'villain') {
		this.isOpenPositions[player] = !this.isOpenPositions[player];
	}

	@action changePositions(position: Positions, player: 'hero' | 'villain') {
		switch (player) {
			case 'hero':
				this.heroParams.position = position;
				break;
			case 'villain':
				this.villainParams.position = position;
				break;
		}
	}

	@action positionFiltering(pos: Positions, player: 'hero' | 'villain') {
		this.positionFilter[player] = pos;
	}
}
