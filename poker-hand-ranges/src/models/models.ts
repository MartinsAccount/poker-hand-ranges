type Positions =
  | "utg"
  | "utg1"
  | "utg2"
  | "mp"
  | "lj"
  | "co"
  | "bn"
  | "sb"
  | "bb";

type Actions = "fold" | "limp" | "allin" | "raise" | "call" | "3-bet" | "4-bet";

export interface Categories {
  stack: number;
  position: Positions;
}

export interface Hand {
  hand: any;
  action: Actions;
}

export interface HandRange {
  categories: Categories;
  hands: Hand[];
}
