import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from "../../shared/components/card/card.component";
import { Product } from '../home/models/product.interface';
import { ProductsService } from '../home/services/products.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  productList: Product[] = [];
  pageSize!: number;
  p: number = 1; // default
  total!: number;

  ngOnInit(): void {
    // read page number from query param (if exists)
    this.route.queryParams.subscribe(params => {
      if (params['page']) {
      this.p = +params['page'];
    } else {
      // لو مفيش → خليها 1 وحدث الرابط
      this.p = 1;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.p },
        queryParamsHandling: 'merge'
      });
    }

      this.getAllProductsData(this.p);
    });
  }

  getAllProductsData(pageNum: number = 1): void {
    this.productsService.getAllProducts(pageNum).subscribe({
      next: (res) => {
        this.productList = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err) => console.log(err)
    });
  }

  onPageChange(page: number) {
    // update products
    this.getAllProductsData(page);

    // update query param in URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}
