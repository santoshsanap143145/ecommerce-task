import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iproduct } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  productId!: string;
  prodSub!: Subscription;
  product!: Iproduct;
  loadingSpinner: boolean = true;
  selectedImg!: string;
  stars: Array<number> = [0, 1, 2, 3, 4];
  rating!: number;
  count: number = 1;
  constructor(
    private _actRoute: ActivatedRoute,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = this._actRoute.snapshot.params['prodid'];
    this.prodSub = this._productService
      .getProduct(this.productId)
      .subscribe((res) => {
        this.product = res;
        this.loadingSpinner = false;
        this.selectedImg = this.product.images[0];
        this.rating = this.product.rating;
      });
  }

  getStarFill(index: number) {
    const wholeNum = Math.floor(this.rating);
    const decimalNum = this.rating - wholeNum;

    if (index < wholeNum) {
      return '100%';
    } else if (index === wholeNum) {
      return `${decimalNum * 100}%`;
    } else {
      return '0%';
    }
  }

  updateCount(act: string) {
    if(act === 'minus' && this.count > 1){
      this.count--
    }else if(act === 'plus'){
      this.count++
    }
  }

  

  ngOnDestroy(): void {
    this.prodSub.unsubscribe();
  }
}
