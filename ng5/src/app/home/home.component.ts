import { Component, OnInit } from '@angular/core';
import {trigger,style,transition,animate,keyframes, query, stagger} from '@angular/animations';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { AppState } from 'src/app.state';
import { Store } from '@ngrx/store';
import * as ProductActions from './../actions/product.action'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('goals',[
      transition('*=>*',[
        query(':enter',style({opacity:0}),{optional:true}),
        query(':enter',stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity:0,transform:'translateY(-75%)',offset:0}),
            style({opacity:.5,transform:'translateY(35px)',offset:.3}),
            style({opacity:1,transform:'translateY(0)',offset:1}),
          ]))]),{optional:true}),

          query(':leave',stagger('300ms',[
            animate('.6s ease-in',keyframes([
              style({opacity:1,transform:'translateY(0)',offset:0}),
              style({opacity:.5,transform:'translateY(35px)',offset:.3}),
              style({opacity:0,transform:'translateY(-75%)',offset:1}),
            ]))]),{optional:true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount:number;
  btnString: string='Add Item';
  goalText:string = 'My first life Goal';
  goals =[];

  constructor(private _data:DataService, private store: Store<AppState>){
    this.products= store.select('product')
  }
    addProduct(){
     let product1={
        "id":2,
        "name":"Samsung M10",
        "type":"mobile",
        "subType":"gadgets",
        "quantity":250,
        "price":10999
      }
      this.store.dispatch(new ProductActions.AddProduct(product1))
    }

    updateProduct(){
      let product1={
         "id":2,
         "name":"Iphone 6s",
         "type":"mobile",
         "subType":"gadgets",
         "quantity":250,
         "price":10999
       }
       this.store.dispatch(new ProductActions.UpdateProduct(product1))
     }
  deleteProduct(i){
this.store.dispatch(new ProductActions.RemoveProduct(i))
  }


  ngOnInit() {
    
    this._data.goal.subscribe(res => this.goals =res);
    this.itemCount =this.goals.length;
    this._data.changeGoal(this.goals);

  }

  addItem()
  {
    this.goals.push(this.goalText);
    this.goalText='';
    this.itemCount=this.goals.length;
  }
  removeItem(i)
  {
    this.goals.splice(i,1);
    this.itemCount=this.goals.length;
  }


  products:Observable<Product[]>;

  

}
