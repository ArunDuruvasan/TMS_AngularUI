import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Broker } from '../_models/broker';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {
  private baseUrl : string
constructor(private http:HttpClient) {
 this.baseUrl= 'http://localhost:51902/';
 }
  
public getAddress(addressType:number)
{   
  return this.http.get<Broker[]>(this.baseUrl + 'GetAllByType/' + addressType);
}
}
