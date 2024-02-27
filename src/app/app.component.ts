import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRowSelectionEventArgs, ISimpleComboSelectionChangingEventArgs } from '@infragistics/igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { OrderDto } from './models/ig-nw/order-dto';
import { CustomerDto } from './models/ig-nw/customer-dto';
import { OrderDetailDto } from './models/ig-nw/order-detail-dto';
import { IGNWService } from './services/ignw.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public iGNWCustomerDto: CustomerDto[] = [];
  public inputVisible: boolean = false;
  public iGNWOrderDto: OrderDto[] = [];
  public iGNWOrderDetailDto: OrderDetailDto[] = [];

  constructor(
    protected iGNWService: IGNWService,
  ) {}

  ngOnInit() {
    this.iGNWService.getCustomerDtoList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.iGNWCustomerDto = data,
      error: (_err: any) => this.iGNWCustomerDto = []
    });
    this.iGNWService.selectedCustomer.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.iGNWService.getOrderDtoList(this.iGNWService.selectedCustomer.value?.customerId as any).pipe(take(1)).subscribe({
        next: (data) => this.iGNWOrderDto = data,
        error: (_err: any) => this.iGNWOrderDto = []
    })});
    this.iGNWService.selectedOrder.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.iGNWService.getOrderDetailDtoList(this.iGNWService.selectedOrder.value?.orderId as any).pipe(take(1)).subscribe({
        next: (data) => this.iGNWOrderDetailDto = data,
        error: (_err: any) => this.iGNWOrderDetailDto = []
    })});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public singleSelectComboSelectionChanging(event: ISimpleComboSelectionChangingEventArgs) {
    this.iGNWService.selectedCustomer.next(event.newValue as CustomerDto);
  }

  public gridRowSelectionChanging(event: IRowSelectionEventArgs) {
    this.iGNWService.selectedOrder.next(event.newSelection[0] as OrderDto);
  }
}
