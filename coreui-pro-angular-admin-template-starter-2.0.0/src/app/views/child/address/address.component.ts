// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-address',
//   templateUrl: './address.component.html',
//   styleUrls: ['./address.component.scss']
// })
// export class AddressComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../../_models/address';
import { AddressService } from '../../../_services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  billtoCustomerName:string="Select";
  customer: Address[];
  addressTobind:Address=new Address();

  @Input() billToaddressType: number;  
  @Input() addressKeyTobind: string;
  @Output() CustomerSelectedOutput = new EventEmitter<string>();

  selectedCustomer: Address =new Address();
  constructor(private service:AddressService) {    
   }

  ngOnInit() {  
    console.log(this.addressKeyTobind);
    this.service.getAddress(this.billToaddressType).subscribe(data => this.customer = data,  
      error => console.log(error),  
      () => console.log('Get customer complete')); 

      if(this.addressKeyTobind!= undefined)
      {
        this.addressTobind =this.customer.find(x=>x.AddrKey===this.addressKeyTobind);
        console.log(this.addressTobind);
        this.onSelect( this.addressTobind);
      }      
    }

    ngOnChanges()
    {
      if(this.addressKeyTobind!= undefined)
      { 
        this.service.getAddress(this.billToaddressType).subscribe((data:any) => {this.customer = data;
          if(this.addressKeyTobind)
          {
            this.selectedCustomer =this.customer.find(x=>x.AddrKey===this.addressKeyTobind)
          }},  
        error => console.log(error),  
        () => console.log('Get customer complete')); 
      } 

    }

  onSelect(CustomerSelected: Address): void {    
    this.CustomerSelectedOutput.emit(CustomerSelected.AddrKey);    
    this.selectedCustomer = CustomerSelected;
    this.billtoCustomerName= this.selectedCustomer.Name;
    console.log(this.selectedCustomer )
  }

}
