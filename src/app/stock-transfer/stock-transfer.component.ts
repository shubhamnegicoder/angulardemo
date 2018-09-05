import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StockAdjustmentServiceService } from '../Core/stock-adjustment-service.service';
import { StockService } from '../Core/stock.service';
import { PageService } from '../Core/page.service';
import { PurchasedOrderService } from '../Core/purchased-order.service';
import swal from 'sweetalert2';
import { LogUtils } from '../log-utils';
import { CommonService } from '../Core/common.service';
@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.css'] 
})
export class StockTransferComponent implements OnInit {

  pager: any = {};
  pageSize: number=10;
  pageNo: number;
  totalRecords: number=0;
  listDetail: Array<any>;
  searchDetail: Array<any>;
searchWarehouses : Array<any>;
  show: boolean = false;
  countryList: Array<any> = [];
  stateList: Array<any> = [];
  cityList: Array<any> = [];
  warehouseList: Array<any> = [];
  showList = false;
  data = {
    "warehouseId": "",
    "itemCode": "",
    "sortName": "quantity",
    "sortType": "desc",
    "pageSize": 10,
    "pageNo": 1
  }

  constructor(private stockServiceObj:StockService,private commonService:CommonService,
    private pageService:PageService,private pos:PurchasedOrderService) { }

  @ViewChild("warehouse") warehouse:ElementRef;
  @ViewChild("invoiceNo") invoice:ElementRef;
  @ViewChild("country") country:ElementRef;
  @ViewChild("state") state:ElementRef;
  @ViewChild("city") city:ElementRef;
 

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
    this.commonService.setTitle('IMS-Warehouse-Stock Transfer-Stock');

     this.getSearchDataSelector();
 
  }

  public filteroption(wId, itemName) {
    console.log(wId, itemName,"datatatata");
    this.data.warehouseId = wId;
    this.data.itemCode = itemName;
   
    this.setPage(1);
   console.log("filter option input data  "+this.data.warehouseId,this.data.itemCode);
    this.getFilteredData(this.data);
  }

  public resetfunction()
  {
     this.data.itemCode=this.invoice.nativeElement.value="";
     this.data.warehouseId=this.warehouse.nativeElement.value="";
     this.country.nativeElement.value="";
     this.state.nativeElement.value="";
     this.city.nativeElement.value="";
     this.getFilteredData(this.data);
  }
  getFilteredData(data){
    this.stockServiceObj.getStockMaintainList(data).subscribe(res => {
      
      if(!res.didError){

          LogUtils.showLog("filtered data  "+JSON.stringify(this.listDetail));
        this.listDetail = res.model;
        this.totalRecords = res.totalRecord;
 
      //  console.log("filtered method called  "+this.listDetail.length);
        if (data.pageNo == 1)
          this.firstPage(1);

          if(this.listDetail.length > 0)
                  this.showList = true;
          else{
            this.showList = false;

            swal({
              title: '',
              text: res.message,
              type: 'error',
              showCancelButton: false,
              confirmButtonText: 'OK'
            });
          }
              
      }else{
        this.listDetail = res.model;
        swal({
          title: '',
          text: res.message,
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK'
        });


      }
      
     },err=>{

      swal({
        title: '',
        text: err.error.errorMessage,
        type: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
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
        this.countryList = res.model.countries;
        this.stateList = res.model.regions;
        this.cityList = res.model.cities;
        this.warehouseList = res.model.warehouses;
     // console.log("searchdata")

    });

    }



    public selectCountry(data){
      let countryId = data.target.value;
      let userId = 1;
      this.pos.getRegionList(countryId,userId).subscribe(res=>{
          if(!res.didError){
            this.stateList = res.model;
          }else{
            this.stateList = [];
            this.cityList = [];
            this.warehouseList = [];
          }
      },err=>{
        this.stateList = [];
            this.cityList = [];
            this.warehouseList = [];
      });
    }

     public selectState(data) {
      let stateId = data.target.value;
       this.pos.getSearchCities(stateId).subscribe(res => {
       //console.log(res, 'statedata');
       this.cityList = res.model;
      })

  }

  public selectCity(data) {
    let cityId = data.target.value;
    let userId = 1;
    this.stockServiceObj.getWarehouseList(userId,cityId).subscribe(res => {
      if(!res.didError){
        this.warehouseList = res.model;
      }else{
        this.warehouseList = [];
        swal({
          title: '',
          text: res.Message,
          type: "error",
          showCancelButton: false,
          confirmButtonText: 'OK',
        });
      }
    },err=>{
      this.warehouseList = [];
      swal({
        title: '',
        text: err.error.erroMessage,
        type: "error",
        showCancelButton: false,
        confirmButtonText: 'OK',
      });
    })

  }

  resetCalled(){
    this.listDetail = [];
    this.showList = false;  
  }
}
