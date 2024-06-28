import { Component, OnInit } from '@angular/core';
import { DetailSaleService } from '../../../services/detail-sale/detail-sale.service';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-sales-window',
  templateUrl: './sales-window.component.html',
  styleUrls: ['./sales-window.component.scss'],
})
export class SalesWindowComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];

  constructor(private detailSaleService: DetailSaleService) {}

  ngOnInit() {
    this.detailSaleService
      .getProductSales()
      .subscribe((products: Product[]) => {
        this.products = products;
        this.updateCart();
      });
  }

  onAddToCart(productId: number) {
    this.detailSaleService.addProductToCart(productId);
  }

  onRemoveFromCart(productId: number) {
    this.detailSaleService.removeProductFromCart(productId);
  }

  updateCart() {
    this.cart = this.products.filter((p) => p.amount > 0);
  }

  getTotalPrice(): number {
    return this.cart.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
  }
}
