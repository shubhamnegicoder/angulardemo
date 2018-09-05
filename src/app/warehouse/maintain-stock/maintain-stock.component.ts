import { Component, OnInit } from '@angular/core';
import { StockService } from '../../Core/stock.service';
import { PageService } from '../../Core/page.service';
import { LogUtils } from '../../log-utils';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { timeout } from 'q';
@Component({
  selector: 'app-maintain-stock',
  templateUrl: './maintain-stock.component.html',
  styleUrls: ['./maintain-stock.component.css']
})

export class MaintainStockComponent implements OnInit {
  pager: any = {};
  pageSize: number = 10;
  pageNo: number;
  totalRecords: number = 0;
  listDetail: Array<any>;
  warehouse_Id: any;
  data = {
    "warehouseId": "",
    "itemCode": "",
    "sortName": "quantity",
    "sortType": "desc",
    "pageSize": 10,
    "pageNo": 1
  }


  constructor(private stockServiceObj: StockService, private pageService: PageService,
    private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.warehouse_Id = this.route.snapshot.params['id'];
    this.getStockData(this.warehouse_Id);

  }

  setPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    //  this.getpurchasedList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);

  }

  firstPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);
  }

  public optionpage(data) {
    this.pageSize = data.target.value;
    this.data.pageNo = 1
    this.data.pageSize = data.target.value;
    //this.getpurchasedList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, 1, this.pageSize);
  }

      
  getStockData(warehouse_Id) {
    this.data.warehouseId = warehouse_Id;
    this.spinner.show();
    this.stockServiceObj.getStockMaintainList(this.data).subscribe(res => {
      this.spinner.hide();
      if (!res.didError) {

        LogUtils.showLog("filtered data:-> " + JSON.stringify(this.listDetail));
        this.listDetail = res.model;
        this.totalRecords = res.totalRecord;

        //  console.log("filtered method called:-> "+this.listDetail.length);
        if (this.data.pageNo == 1)
          this.firstPage(1);

        if (this.listDetail.length > 0) {

        }
        else {
          swal({
            title: '',
            text: res.message,
            type: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then(result => {

            this.router.navigate(['/Warehouse']);
          });
        }

      } else {


        swal({
          title: '',
          text: res.message,
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(result => {

          this.router.navigate(['/Warehouse']);
        });


      }

    }, err => {
      this.spinner.hide();
      swal({
        title: '',
        text: err.error.errorMessage,
        type: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    });
  }

}
