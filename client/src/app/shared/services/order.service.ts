import { Injectable } from '@angular/core';
import { Position, OrderPosition } from '../interfaces';

@Injectable()
export class OrderService {

  public list: OrderPosition[] = [];
  public price = 0;

  add(position: Position) {
    const orderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id,
    });

    const existingPosition = this.list.find(p => p._id === position._id);

    if (existingPosition) {
      existingPosition.quantity += orderPosition.quantity;
    } else {
      this.list.push(orderPosition);
    }

    this.computePrice();
  }

  remove(orderPosition: OrderPosition) {
    const positionForDelete = this.list.findIndex(p => p._id === orderPosition._id);

    this.list.splice(positionForDelete, 1);
    this.computePrice();
  }

  clear() {
    this.list = [];
    this.price = 0;
  }

  private computePrice() {
    this.price = this.list.reduce((total, item) => total += item.quantity * item.cost, 0);
  }

}