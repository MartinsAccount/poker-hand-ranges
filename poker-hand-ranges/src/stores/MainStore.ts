import { action, observable } from "mobx";

export class MainStore {
  @observable handRange: any = [];
  @observable cards: any = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];

  @action createRange() {
    // card schema : "QJo" || "32s" || "KK"
    // soronként hozza létre a range-t
    // Egy számláló hogy hányszor megy végig a tömbön (13 szor kell összesen) pl.: round = 0
    // index < round: "card + cards[round] + o"  => "AKo"
    // index > round: "cards[round] + card + s"  => "AKs"
    // index === round: "card + card"  => "QQ"

    for (let i = 0; i < this.cards.length; i++) {
      let round = i;
      let handRangeRow: any = [];

      this.cards.forEach((card, index) => {
        // equal
        if (index === round) {
          return handRangeRow.push({ card: `${card}${card}` });
        }
        // offsuit
        if (index < round) {
          return handRangeRow.push({
            card: `${card}${this.cards[round]}o`,
          });
        }
        // suit
        if (index > round) {
          return handRangeRow.push({
            card: `${this.cards[round]}${card}s`,
          });
        }
      });

      this.handRange.push(handRangeRow);
    }
    console.log(this.handRange);
  }

  @action changeHandRange(card: any) {
    // console.log(card);
    const cardObj = this.handRange
      .flat()
      .find((item: any) => item.card === card);

    console.log(cardObj);
  }
}
