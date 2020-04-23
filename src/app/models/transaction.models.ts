import { Cart } from './cart.models';

export interface Transaction {
    id: string;
    //customEntries: string;
    entry : Cart[],
    date: string;
    total : string;
    custom : {}
  }