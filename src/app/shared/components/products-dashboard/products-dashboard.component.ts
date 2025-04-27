import { Component, OnDestroy, OnInit } from '@angular/core';
import { Iproduct } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss']
})
export class ProductsDashboardComponent implements OnInit, OnDestroy {
  products : Array<Iproduct> = []
  productsSubs!: Subscription
  hoverProdId : string | null = null
  loadingSpinner : boolean = true
  markedfevorite: boolean = false
  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
   this.productsSubs = this._productService.fetchAllProducts()
    .subscribe(res => {
      this.products = res.reverse()
      console.log(this.products);
      this.loadingSpinner = false
      
    })
  }

  onClick(){
    this.markedfevorite = !this.markedfevorite
  }


  ngOnDestroy(): void {
    this.productsSubs.unsubscribe()
  }
}
