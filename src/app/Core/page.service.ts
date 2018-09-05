import { Injectable } from '@angular/core';


export class PageService {

  pageSize = 5 ;
  constructor() { }
  public getPager(totalItems: number, currentPage: number = 1, pageSize?: number) {
   // console.log('pagesasdfgh' + totalItems, 'lliuuihh', currentPage);
    if (pageSize === undefined) {
      pageSize = this.pageSize;
    }
    //console.log(pageSize,'pagesixe');
    // calculate total pages
    // tslint:disable-next-line:prefer-const
    let totalPages = Math.ceil(totalItems / pageSize);
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // calculate start and end item indexes


    // create an array of pages to ng-repeat in the pager control
    // tslint:disable-next-line:prefer-const
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    console.log(pages);
    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  }
}
