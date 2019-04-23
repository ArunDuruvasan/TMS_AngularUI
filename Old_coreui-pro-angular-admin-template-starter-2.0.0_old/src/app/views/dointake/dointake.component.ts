import { Component, OnInit, Input } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeliveryOrderHeader } from '../../_models/DeliveryOrderHeader';
import { Order_type } from '../../_models/order_type.enum';
import { NgForm } from '@angular/forms';
import { Broker } from '../../_models/broker';
import { DeliveryOrderService } from '../../_services/deliveryOrder.service';
import { Params, Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { MatAutocompleteOrigin } from '@angular/material';
import { v } from '@angular/core/src/render3';
import { switchMap } from 'rxjs/operators';
import { Order_details } from './../../_models/order_details';
@Component({
  selector: 'app-dointake',
  templateUrl: './dointake.component.html',
  styleUrls: ['./dointake.component.scss',
]
})
export class DOIntakeComponent implements OnInit {  
  broker: Broker[];
  brokerName:string="Select Broker";
  public doHeader:DeliveryOrderHeader; 
  orderNo:string;
  errorMessage:string;
  orderKey:string;
  selectedBillToKey="";
   
  constructor(private service:DeliveryOrderService,  private router: Router,private route: ActivatedRoute) { }
  
  onSelectedBilltoAddress(addressKey:string)
  {
    this.doHeader.BillToAddress=addressKey;
  }
  onSelectedPickupAddress(addressKey:string)
  {
    this.doHeader.SourceAddress=addressKey;
  }
  onSelectedConsigneeAddress(addressKey:string)
  {
    this.doHeader.DestinationAddress=addressKey;
  }
  onSelectedReturnAddress(addressKey:string)
  {
    this.doHeader.ReturnAddress=addressKey;
  }
  onSelectedBroker(brokerkey:string)
  {
    this.doHeader.Brokerkey=brokerkey;
  }
  
  onSelectedContainerDetails(Order_details:any[])
   {
     this.doHeader.orderdetails = Order_details;
   }

  ngOnInit(): void {
    this.doHeader=new DeliveryOrderHeader();
    this.orderNo = this.route.snapshot.paramMap.get("order");   

    if (this.orderNo != undefined)
    {
       this.service.GetbyKey(this.orderNo).subscribe(data => this.doHeader = data,  
        error => console.log(error),  
        () => console.log('Get Order Detail BillToAddress',this.doHeader.BillToAddress));
        this.selectedBillToKey=this.doHeader.BillToAddress;
    }    
    else{
        
    }
    this.doHeader.OrderKey = "";
    this.doHeader.CustKey="";
    this.doHeader.OrderDate="";
    this.doHeader.OrderNo="Order0023";
    //this.doHeader.OrderType="2";
    // this.doHeader =  [{ "OrderKey":"hsdkhsk", 
    // "OrderNo": "Maersk Line", 
    // "CustKey": "ML0023",
    // "OrderDate":"",
    // "BillToAddress":"",
    // "SourceAddress":"",
    // "DestinationAddress":"",
    // "ReturnAddress":"",
    // "Source":"",
    // "OrderType":"Import",
    // "HoldReason":"",
    // "HoldDate":"",    
    // "BrokerName":"",
    // "BrokerId":"",
    // "Brokerkey":"",
    // "BrokerRefNo":"",
    // "PortofOriginKey":"",
    // "CarrierKey":"",
    // "BillofLading":"",
    // "CutOffDate":"",
    // "IsHazardous":"",
    // "CreatedBy":"",
    // "CreatedDate":"" }];
  
 
    this.broker = [{ "BrokerName": "Maersk Line",
    "BrokerId": "ML0023",
    "BrokerKey":"ae24e3ba-5aad-11e9-94fc-332aa5298740",
    "Status":"1"}];
  }
  
  submit(value: DeliveryOrderHeader)
  {       
   this.service.saveDOHeader(value).subscribe(
    result => this.orderKey = result,
    error => this.errorMessage = error);
  
  //applying orderkey to order details 
  for (let order of this.doHeader.orderdetails) {
    order.orderkey = this.orderKey;   
    }  
    
    this.service.saveOrderDetails(this.doHeader.orderdetails).subscribe(
      results =>  results,
      error => this.errorMessage = error
      ); 
      this.doHeader = null;      
  }
  
}
