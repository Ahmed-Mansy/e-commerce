import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { OrdersService } from './services/orders.service';
import { Order } from './models/order.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {

  private readonly authService = inject(AuthService)
  private readonly ordersService = inject(OrdersService)

  userId!: string | null
  allOrders: Order[] = []

  // Pagination properties
  currentPage = 1
  ordersPerPage = 5
  totalPages = 0

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.ordersService.getUserOrders(this.authService.decodeToken()).subscribe({
      next: (res) => {
        this.allOrders = res
        this.totalPages = Math.ceil(this.allOrders.length / this.ordersPerPage)
        console.log(this.allOrders);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  // Get paginated orders for current page
  get paginatedOrders(): Order[] {
    const startIndex = (this.currentPage - 1) * this.ordersPerPage
    const endIndex = startIndex + this.ordersPerPage
    return this.allOrders.slice(startIndex, endIndex)
  }

  // Get indices for display info
  get startIndex(): number {
    return (this.currentPage - 1) * this.ordersPerPage + 1
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.ordersPerPage, this.allOrders.length)
  }

  // Navigation methods
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  goToFirstPage(): void {
    this.goToPage(1)
  }

  goToLastPage(): void {
    this.goToPage(this.totalPages)
  }

  goToPreviousPage(): void {
    this.goToPage(this.currentPage - 1)
  }

  goToNextPage(): void {
    this.goToPage(this.currentPage + 1)
  }

  // Generate page numbers for pagination UI
  getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = []
    const showEllipsis = this.totalPages > 7

    if (!showEllipsis) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1)
    }

    // Always show first page
    pages.push(1)

    if (this.currentPage <= 4) {
      // Show pages 2-5 and ellipsis
      for (let i = 2; i <= Math.min(5, this.totalPages - 1); i++) {
        pages.push(i)
      }
      if (this.totalPages > 6) pages.push('...')
    } else if (this.currentPage >= this.totalPages - 3) {
      // Show ellipsis and last 5 pages
      if (this.totalPages > 6) pages.push('...')
      for (let i = Math.max(this.totalPages - 4, 2); i < this.totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show ellipsis, current page with neighbors, and ellipsis
      pages.push('...')
      for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
    }

    // Always show last page
    if (this.totalPages > 1) {
      pages.push(this.totalPages)
    }

    return pages
  }

  // Helper to check if page number is active
  isPageActive(page: number | string): boolean {
    return page === this.currentPage
  }

  // Helper to check if page is a number (not ellipsis)
  isPageNumber(page: number | string): page is number {
    return typeof page === 'number'
  }

  // Helper to check if navigation should be disabled
  get isFirstPage(): boolean {
    return this.currentPage === 1
  }

  get isLastPage(): boolean {
    return this.currentPage === this.totalPages
  }
}