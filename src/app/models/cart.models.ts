import { Item } from './item.models';

export interface Cart {
    item: Item;
    totalQuantity: number;
    subtotal: number;
    tax: number;
    tips: number;
    total: number;
    id : number
  }