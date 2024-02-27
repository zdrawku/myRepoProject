import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CustomerDto } from '../models/ig-nw/customer-dto';
import { OrderDetailDto } from '../models/ig-nw/order-detail-dto';
import { OrderDto } from '../models/ig-nw/order-dto';
import { ProductDto } from '../models/ig-nw/product-dto';
import { SupplierDto } from '../models/ig-nw/supplier-dto';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

@Injectable({
  providedIn: 'root'
})
export class IGNWService {
  constructor(
    private http: HttpClient
  ) { }

  public selectedOrder: BehaviorSubject<OrderDto | undefined> = new BehaviorSubject<OrderDto | undefined>(undefined);

  private _selectedCustomer$!: BehaviorSubject<CustomerDto | undefined>;

  public get selectedCustomer(): BehaviorSubject<CustomerDto | undefined> {
    if (!this._selectedCustomer$) {
      this._selectedCustomer$ = new BehaviorSubject<CustomerDto | undefined>(undefined);
      this._selectedCustomer$.subscribe(() => this.selectedOrder.next(undefined));
    }
    return this._selectedCustomer$;
  }

  public getCustomerDtoList(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${API_ENDPOINT}/Customers`);
  }

  public getOrderDtoList(id: string): Observable<OrderDto[]> {
    if (!id) {
      return of([]);
    }
    return this.http.get<OrderDto[]>(`${API_ENDPOINT}/Customers/${id}/Orders`);
  }

  public getOrderDetailDtoList(id: number): Observable<OrderDetailDto[]> {
    if (!id) {
      return of([]);
    }
    return this.http.get<OrderDetailDto[]>(`${API_ENDPOINT}/Orders/${id}/Details`);
  }

  public getProductDtoList(id: number): Observable<ProductDto[]> {
    if (!id) {
      return of([]);
    }
    return this.http.get<ProductDto[]>(`${API_ENDPOINT}/Suppliers/${id}/Products`);
  }

  public getSupplierDto(id: number): Observable<SupplierDto | undefined> {
    if (!id) {
      return of(undefined);
    }
    return this.http.get<SupplierDto | undefined>(`${API_ENDPOINT}/Products/${id}/Supplier`);
  }
}
