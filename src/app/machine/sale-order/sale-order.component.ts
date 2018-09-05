import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageService } from '../../Core/page.service';
import { SalesOrderService } from '../../Core/sales-order.service';
 import {  NgxSpinnerService } from 'ngx-spinner';
import { LogUtils } from '../../log-utils';
import swal from 'sweetalert2';
import { CommonService } from '../../Core/common.service';
@Component({
  selector: 'app-sale-order',
  templateUrl: './sale-order.component.html',
  styleUrls: ['./sale-order.component.css']
})
export class SaleOrderComponent implements OnInit {

  pager: any = {};
  pageSize: number = 10;
  pageNo: number;
  totalRecords: number = 0;
  listDetail: Array<any>;
  warehouseList:Array<any>;
  editList: any;
  show: boolean = false;
  type_val: any = "";

  
  data = {
    "status": "",
    "code": "",
    "date": "",
    "customer": "",
    "userId": "1",
    "warehouseId": "",
    "sortName": "date",
    "sortType": "desc",
    "pageSize": 10,
    "pageNo": 1
  }


  @ViewChild('date') date: ElementRef;
  @ViewChild('customerName') customerName: ElementRef;
  @ViewChild('warehouse') warehouse: ElementRef;
  @ViewChild('status') status: ElementRef;
  @ViewChild('SONumber') SONumber: ElementRef;
  constructor(private pageService: PageService,private salesOrderService:SalesOrderService,
    private spinner: NgxSpinnerService,private commonService:CommonService) { }

  ngOnInit() {
    this.commonService.setTitle('IMS-Machine-Sales Order');

    this.getWarehouseData();
    this.getSalesOrderList(this.data);
  }

  toggle() {
    this.show = !this.show;
  }


  public optionpage(data) {
    this.pageSize = data.target.value;
    this.data.pageNo = 1
    this.data.pageSize = data.target.value;
    this.getSalesOrderList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, 1, this.pageSize);
  }

  public resetfunction()
  {
    this.data.code=this.SONumber.nativeElement.value=""
    this.data.warehouseId=this.warehouse.nativeElement.value=""
    this.data.customer=this.customerName.nativeElement.value=""
    this.data.date=this.date.nativeElement.value=""
    this.data.status=this.status.nativeElement.value=""
    this.getSalesOrderList(this.data);
  }

  public filteroption(warehouseId,soNumber,customerName,date,status) {
    console.log(status, name, "datatatata");
    this.data.status = status;
    this.data.warehouseId = warehouseId;
    this.data.code = soNumber;
    this.data.customer = customerName;
    this.data.date = date;

    this.setPage(1);
    console.log("filter data :-> " + JSON.stringify(this.data));
    this.getSalesOrderList(this.data);

  }

  setPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.getSalesOrderList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);

  }

  firstPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);
  }


  // method to fetch the sales order list
  public getSalesOrderList(data) {
    console.log(JSON.stringify(data) + '  in brand');
  
    this.spinner.show();
    this.salesOrderService.getSalesOrderList(data).subscribe(res => {
       this.spinner.hide();
      console.log('sales order list data received:-> ');
      this.listDetail = res.model;
      this.totalRecords = res.totalRecord;
      // console.log('brandlist data received:-> '+this.listDetail.length);
      if (data.pageNo == 1)
        this.firstPage(1);
    },err=>{
      this.spinner.hide();
      swal({
        title: 'Result',
        text: err.errorMessage,
        type: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    });

  }


  // method to fetch warehouse list for filter 

  public getWarehouseData(){
    let dataToSend={
      "userId":"1"
    }
    this.salesOrderService.getWareHouseList(dataToSend).subscribe(res=>{
        if(!res.didError){
          this.warehouseList = res.model;
        }
    },error=>{
      LogUtils.showLog("error in fetching warehouse list");
    })
  }
}
