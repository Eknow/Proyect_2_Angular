import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root',
})
export class DetailSaleService {
  private products: Product[] = [
    {
      _id: 1,
      name: 'Product A',
      code: 'P001',
      category: 'Category 1',
      description: 'Description for Product A',
      price: 100,
      amount: 0,
    },
    {
      _id: 2,
      name: 'Product B',
      code: 'P002',
      category: 'Category 2',
      description: 'Description for Product B',
      price: 150,
      amount: 0,
    },
    {
      _id: 3,
      name: 'Product C',
      code: 'P003',
      category: 'Category 1',
      description: 'Description for Product C',
      price: 200,
      amount: 0,
    },
    {
      _id: 4,
      name: 'Product D',
      code: 'P004',
      category: 'Category 2',
      description: 'Description for Product D',
      price: 120,
      amount: 0,
    },
  ];

  private cart: Product[] = [];
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >(this.products);

  constructor() {}

  getProductSales() {
    return this.productsSubject.asObservable();
  }

  addProductToCart(productId: number) {
    const productToAdd = this.products.find((p) => p._id === productId);
    if (productToAdd) {
      const existingProduct = this.cart.find((p) => p._id === productId);
      if (existingProduct) {
        existingProduct.amount += 1;
      } else {
        this.cart.push({ ...productToAdd, amount: 1 });
      }
      this.updateProductsList();
      console.log('Cart updated:', this.cart); // Imprime el estado actualizado del carrito
    }
  }

  removeProductFromCart(productId: number) {
    const productIndex = this.cart.findIndex((p) => p._id === productId);
    if (productIndex !== -1) {
      if (this.cart[productIndex].amount > 1) {
        this.cart[productIndex].amount -= 1;
      } else {
        this.cart.splice(productIndex, 1);
      }
      this.updateProductsList();
      console.log('Cart updated:', this.cart);
    }
  }

  private updateProductsList() {
    const updatedProducts = this.products.map((p) => {
      const cartProduct = this.cart.find((cp) => cp._id === p._id);
      if (cartProduct) {
        return { ...p, amount: cartProduct.amount };
      } else {
        return { ...p, amount: 0 };
      }
    });
    this.productsSubject.next(updatedProducts);
  }
}
