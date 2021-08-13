import { Actions, Cards, Groups, Positions, Stacks, Strategies } from './models';

export const CARDS: Cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

export const POSITIONS: Positions[] = ['bb', 'sb', 'btn', 'co', 'hj', 'lj', 'utg2', 'utg1', 'utg'];

export const STACKS: Stacks[] = [10, 12, 15, 20, 25, 30, 40, 60];

export const ACTIONS: Actions[] = ['fold', 'limp', 'allin', 'raise', 'call', '3-bet', '4-bet'];

export const STRATEGIES: Strategies[] = ['PFI', 'Defense', 'Push-Fold'];

export const GROUPS_SELECT: Groups[] = ['Aces', 'Suited cards', 'Off-suited cards', 'Pocket pairs'];
