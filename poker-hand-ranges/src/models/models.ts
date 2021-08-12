export type Cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

export type Positions = 'bb' | 'sb' | 'btn' | 'co' | 'hj' | 'lj' | 'utg2' | 'utg1' | 'utg';
export type Actions = 'fold' | 'limp' | 'allin' | 'raise' | 'call' | '3-bet' | '4-bet';
export type Strategies = 'PFI' | 'Defense' | 'Push-Fold';
export type Stacks = 10 | 12 | 15 | 20 | 25 | 30 | 40 | 60;
export type Stages = 'preflop' | 'flop' | 'turn' | 'river';
export type Players = 'hero' | 'villain';
type BetSizes = 2 | 2.2 | 2.5 | 3;

export interface Hand {
	hand: string;
	action: Actions; //TODO: felosztani több action-t egy hand-re
	// combos: number;
}
export interface Player {
	position: Positions;
	action: Actions;
}

export interface HandRange {
	id: number;
	title: string;
	description: string;
	stage: Stages;
	strategy: Strategies;
	hero: Player;
	villain: Player;
	stack: Stacks;
	hands: Hand[];
}
export type HandRangeList = HandRange[];
