import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private goals = new BehaviorSubject<any>(['the initial goal','Another silly life goal buddy']);

  goal = this.goals.asObservable();

  constructor() { }

  changeGoal(goal)
  {
    this.goals.next(goal);
  }
}
