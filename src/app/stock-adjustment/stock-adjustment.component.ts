import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../Core/warehouse.service';
import { PageService } from '../Core/page.service';
import { PurchasedOrderService } from '../Core/purchased-order.service';
import { StockAdjustmentServiceService } from '../Core/stock-adjustment-service.service';
import { CommonService } from '../Core/common.service';

@Component({
  selector: 'app-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  styleUrls: ['./stock-adjustment.component.css']
})
export class StockAdjustmentComponent implements OnInit {

  pager: any = {};
  pageSize: number=10;
  pageNo: number;
  totalRecords: number=0;
  listDetail: Array<any>;
  searchDetail: Array<any>;
searchWarehouses : Array<any>;
  show: boolean = false;
  data = {
    "status": "",
    "code": "",
    "date": "",
    "warehouseId": "",
    "sortName": "date",
    "sortType": "desc",
    "pageSize": 10,
    "pageNo": 1
  }

  constructor(private stockAdjustmentServiceObj:StockAdjustmentServiceService,private commonService:CommonService,
    private pageService:PageService,private pos:PurchasedOrderService) { }

 

  toggle() {
    this.show = !this.show;
  }


  public optionpage(data) {
    this.pageSize = data.target.value;
    this.data.pageNo=1
    this.data.pageSize = data.target.value;
    //this.getpurchasedList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, 1, this.pageSize);
  }

  ngOnInit() {
    this.commonService.setTitle('IMS-Warehouse-Stock Transfer-Stock Adjustment');

     this.getSearchDataSelector();
   this.getFilteredData(this.data);
  }

  public filteroption(Name,wId, status,date) {
    console.log(Name,wId, status,date,"datatatata");
    this.data.warehouseId = wId;
    this.data.status = status;
    this.data.date = date;
    this.data.code = Name;
    this.setPage(1);
   console.log("filter option input data:-> "+this.data.warehouseId,this.data.code);
    this.getFilteredData(this.data);
  }

  getFilteredData(data){
    console.log(data,"daa")
    this.stockAdjustmentServiceObj.getStockAdjustmentList(data).subscribe(res => {
      
       this.listDetail = res.model;
       this.totalRecords = res.totalRecord;

       console.log("filtered method called:-> "+this.listDetail.length);
       if (data.pageNo == 1)
         this.firstPage(1);
     });
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



  
 
    public getSearchDataSelector() {
      this.pos.getSearchData().subscribe(res => {
      this.searchDetail = res.model;
      this.searchWarehouses = res.model.warehouses;
     // console.log("searchdata")

    });

    }
 
}
