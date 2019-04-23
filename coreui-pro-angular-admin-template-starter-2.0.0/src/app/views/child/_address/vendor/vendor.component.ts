import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../../_services/address.service';
import { Address } from '../../../../_models/address';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  vendors: Address[];
  VendorName:string="Select Bill To";
  constructor(private service:AddressService) { }

  ngOnInit() {
    this.service.getAddress(2).subscribe(data => this.vendors = data,  
      error => console.log(error),  
      () => console.log('Get vendors complete')); 
  }
  selectedVendor: Address;
  
  onSelect(vendorSelected: Address): void {
      this.selectedVendor = vendorSelected;
  this.VendorName = vendorSelected.Name;
  console.log(this.selectedVendor )
}
}
