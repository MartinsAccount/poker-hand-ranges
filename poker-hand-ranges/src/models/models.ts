export type Cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

export type Positions = 'bb' | 'sb' | 'btn' | 'co' | 'hj' | 'lj' | 'utg2' | 'utg1' | 'utg';
export type Actions = 'fold' | 'limp' | 'allin' | 'raise' | 'call' | '3-bet' | '4-bet';
export type Strategies = 'PFI' | 'Defense' | 'Push-Fold';
export type Stacks = 10 | 12 | 15 | 20 | 25 | 30 | 40 | 60;
export type Stages = 'preflop' | 'flop' | 'turn' | 'river';
export type Players = 'hero' | 'villain';
export type Groups = 'Aces' | 'Suited cards' | 'Off-suited cards' | 'Pocket pairs';
type BetSizes = 2 | 2.2 | 2.5 | 3;

export interface Player {
	position: Positions;
	action: Actions;
}
export interface MultiAction {
	action: Actions;
	percent: number;
}
export interface Hand {
	hand: string;
	action: Actions;
	isMultiActions: boolean;
	multiActions: MultiAction[];
	combos: 4 | 12 | 6;
	// combos: number;
}

export class HandRange {
	id: number = 0;
	title: string = '';
	description: string = '';
	stage: Stages = 'preflop';
	strategy: Strategies = null;
	hero: Player = { position: null, action: null };
	villain: Player = { position: null, action: null };
	stack: Stacks = null;
	hands: Array<Hand[]> = [];
}
export type HandRangeList = HandRange[];
