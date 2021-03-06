import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { AppSettings } from './../_constants/appsettings';
import { DeliveryOrderHeader } from '../_models/DeliveryOrderHeader';
import { Order_details } from './../_models/order_details';

@Injectable({
  providedIn: 'root'
})
export class DeliveryOrderService {
  
constructor(private http:HttpClient) {}
  
public saveDOHeader(OrderHeader:DeliveryOrderHeader)
{
  // AppSettings._BaseURL
//const config = new HttpHeaders({ 'Content-Type': 'application/json' });
  // const config = new HttpHeaders().set('Content-Type', 'application/json')
  //                               .set('Accept', 'application/json')
  OrderHeader.OrderKey = "";
  OrderHeader.CustKey="";
  OrderHeader.OrderDate="2019-04-10T06:11:35.481";
  OrderHeader.OrderNo="test";
  OrderHeader.Source ="2";
  return this.http.post<any>( AppSettings._BaseURL + 'DeliveryOrderHeader/',OrderHeader);
}

public saveOrderDetails(Orderdetails:Order_details[])
{
  return this.http.post<Order_details[]>( AppSettings._BaseURL + 'DeliveryOrderDetails/',Orderdetails);
}

/**
 * name
 */
public getOrderlist() {
  return this.http.get<DeliveryOrderHeader[]>(AppSettings._BaseURL + 'GetOrders');  
}

public GetbyKey(OrderKey:any) {
 return this.http.get<DeliveryOrderHeader>(AppSettings._BaseURL + 'GetbyKey/'+OrderKey);   
 //return this.http.get<DeliveryOrderHeader>( 'http://localhost:51902/GetbyKey?OrderKey='+ OrderKey); 
}

}
