import { Component, OnInit } from '@angular/core';
import { Address } from '../../../../_models/address';
import { AddressService } from '../../../../_services/address.service';

@Component({
  selector: 'app-shippingport',
  templateUrl: './shippingport.component.html',
  styleUrls: ['./shippingport.component.scss']
})
export class ShippingportComponent implements OnInit {
  Shippingports: Address[];
  constructor(private service:AddressService) { }

  ngOnInit() {
    this.service.getAddress(3).subscribe(data => this.Shippingports = data,  
      error => console.log(error),  
      () => console.log('Get Shipping ports complete')); 
  }
  selectedShippingport: Address;

  onSelect(ShippingportSelected: Address): void {
    console.log(ShippingportSelected)
  this.selectedShippingport = ShippingportSelected;
  console.log(this.selectedShippingport )
}
}
