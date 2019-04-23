import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Order_details } from '../../../_models/order_details';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  
  private ContainerDetails: Array<Order_details> = [];
  private newAttribute: any = {};
  @Output() ContainerDetailsOutput = new EventEmitter<any>();

   selectedcontainer:Order_details;
  constructor() { }

  ngOnInit() {

    
 }

  addFieldValue() {
    this.ContainerDetails.push(this.newAttribute)
    this.newAttribute = {};
    this.ContainerDetailsOutput.emit(this.ContainerDetails);    
}

deleteFieldValue(index) {
    this.ContainerDetails.splice(index, 1);
}

}
