import { action, observable, toJS } from 'mobx';
import { CARDS } from '../models/constants';
import { Actions, Hand } from '../models/models';

export class MainStore {
	@observable handRange: Array<Hand[]> = [];
	@observable selectedAction: Actions = 'fold';
	@observable mouseState: string = 'up';

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

	@action changeHandRange(hand: Hand, e?) {
		// console.log(hand);
		if (this.mouseState === 'down') {
			this.handRange.forEach((row) => {
				row.forEach((cell) => {
					if (cell.hand === hand.hand) {
						// console.log(toJS(cell));
						cell.action = this.selectedAction;
					}
				});
			});
		}
	}

	@action changeMouseType(type: string) {
		if (type === 'down') {
			this.mouseState = 'down';
			return;
		}

		this.mouseState = 'up';
	}

	@action selectAction(action: Actions) {
		this.selectedAction = action;
	}
}
