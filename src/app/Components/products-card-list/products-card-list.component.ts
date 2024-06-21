import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  category: string;
  description: string;
}

@Component({
  selector: 'app-products-card-list',
  templateUrl: './products-card-list.component.html',
  styleUrls: ['./products-card-list.component.scss'],
})
export class ProductsCardListComponent implements OnInit {
  products: Product[] = [
    {
      name: 'Producto 1',
      category: 'Categoría 1',
      description: 'Descripción del producto 1',
    },
    {
      name: 'Producto 2',
      category: 'Categoría 2',
      description: 'Descripción del producto 2',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
