import { Component, Input, numberAttribute, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { ProductDto } from '../models/ig-nw/product-dto';
import { SupplierDto } from '../models/ig-nw/supplier-dto';
import { IGNWService } from '../services/ignw.service';

@Component({
  selector: 'app-child-view',
  templateUrl: './child-view.component.html',
  styleUrls: ['./child-view.component.scss']
})
export class ChildViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public initProductsBasedOnSupplier: ProductDto[] = [];
  public initProductsBasedOnSupplier$: Subject<void> = new Subject<void>();


  private _productID?: number = 55;
  @Input({ transform: numberAttribute })
  public get productID(): number | undefined {
    return isNaN(this._productID as any) ? 55 : this._productID;
  }
  public set productID(value: number | undefined) {
    this._productID = value;
    this.initSupplierBasedOnProductID$.next();
  }

  private _initSupplierBasedOnProductID?: SupplierDto;
  public get initSupplierBasedOnProductID(): SupplierDto | undefined {
    return this._initSupplierBasedOnProductID;
  }
  public set initSupplierBasedOnProductID(value: SupplierDto | undefined) {
    this._initSupplierBasedOnProductID = value;
    this.initProductsBasedOnSupplier$.next();
  }
  public initSupplierBasedOnProductID$: Subject<void> = new Subject<void>();


  constructor(
    private iGNWService: IGNWService,
  ) {}

  ngOnInit() {
    this.iGNWService.getProductDtoList(this.initSupplierBasedOnProductID?.supplierId as any).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.initProductsBasedOnSupplier = data,
      error: (_err: any) => this.initProductsBasedOnSupplier = []
    });
    this.initProductsBasedOnSupplier$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.iGNWService.getProductDtoList(this.initSupplierBasedOnProductID?.supplierId as any).pipe(take(1)).subscribe({
        next: (data) => this.initProductsBasedOnSupplier = data,
        error: (_err: any) => this.initProductsBasedOnSupplier = []
    })});
    this.iGNWService.getSupplierDto(this.productID as any).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.initSupplierBasedOnProductID = data,
      error: (_err: any) => this.initSupplierBasedOnProductID = undefined
    });
    this.initSupplierBasedOnProductID$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.iGNWService.getSupplierDto(this.productID as any).pipe(take(1)).subscribe({
        next: (data) => this.initSupplierBasedOnProductID = data,
        error: (_err: any) => this.initSupplierBasedOnProductID = undefined
    })});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.initProductsBasedOnSupplier$.complete();
    this.initSupplierBasedOnProductID$.complete();
    this.destroy$.complete();
  }
}
