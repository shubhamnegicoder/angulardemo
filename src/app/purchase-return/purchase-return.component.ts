import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PurchasedOrderService } from '../Core/purchased-order.service';
import { PurchasedReturnService } from '../Core/purchased-return.service';
import { PageService } from '../Core/page.service';
import { APP_SETTINGS } from '../Core/interface';
import { CommonService } from '../Core/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { DownloadService } from '../Core/download.service';
import { LogUtils } from '../log-utils';
@Component({
  selector: 'app-purchase-return',
  templateUrl: './purchase-return.component.html',
  styleUrls: ['./purchase-return.component.css']
})
export class PurchaseReturnComponent implements OnInit {

  pager: any = {};
  pageSize: number = 10;
  pageNo: number;
  totalRecords: number = 0;
  listDetail: Array<any>;
  searchDetail: Array<any>;
  searchCities: Array<any>;
  searchVendors: Array<any>;
  searchWarehouses: Array<any>;
  show: boolean = false;
  data = {
    "status": " ",
    "code": " ",
    "date": " ",
    "vendorId": " ",
    "warehouseId": " ",
    "regionId": " ",
    "cityId": " ",
    "sortName": "date",
    "sortType": "desc",
    "pageSize": 10,
    "pageNo": 1
  }

  constructor(private pos: PurchasedOrderService, private por: PurchasedReturnService, 
    private pageService: PageService,private downloadService:DownloadService,
    private spinner: NgxSpinnerService,private commonService:CommonService) { }
    @ViewChild("state") state:ElementRef;
    @ViewChild("city") city:ElementRef;
    @ViewChild("vendor") vendor:ElementRef;
    @ViewChild("warehouse") warehouse:ElementRef;
    @ViewChild("status") status:ElementRef;
    @ViewChild("PRO") pro:ElementRef;
    @ViewChild("date") filterdate:ElementRef;

  toggle() {
    this.show = !this.show;
  }


  public optionpage(data) {
    this.pageSize = data.target.value;
    this.data.pageNo = 1
    this.data.pageSize = data.target.value;
    this.getpurchasedReturnList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, 1, this.pageSize);
  }

  ngOnInit() {
    this.commonService.setTitle('IMS-Warehouse-Outbound-Purchase Return');
    this.getSearchDataSelector();
    this.getpurchasedReturnList(this.data);
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  public filteroption(state, city, vendor, warehouse, status, PO, date) {
    // console.log(state, city, vendor, warehouse, status, PO, date, "datatatata");
    this.data.regionId = state;
    this.data.cityId = city;
    this.data.vendorId = vendor;
    this.data.warehouseId = warehouse;
    this.data.status = status;
    this.data.code = PO;
    this.data.date = date;
    this.setPage(1);
    this.getpurchasedReturnList(this.data);

  }

  setPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.getpurchasedReturnList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);

  }

  firstPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);
  }


  public resetfunction()
  {
    this.data.cityId=this.city.nativeElement.value=""
    this.data.regionId=this.state.nativeElement.value=""
    this.data.date=this.filterdate.nativeElement.value=""
    this.data.status=this.status.nativeElement.value=""
    this.data.vendorId=this.vendor.nativeElement.value=""
    this.data.code=this.pro.nativeElement.value=""
    this.data.warehouseId=this.warehouse.nativeElement.value="";
    this.getpurchasedReturnList(this.data);
  }

  public getpurchasedReturnList(data) {
    this.por.getListData(data).subscribe(res => {
      //  console.log(res, 'returnlistdata');
      this.listDetail = res.model;
      // console.log(this.listDetail,"lllllllllllllllllllllllllllllllllllpppppppppppp");
      this.totalRecords = res.totalRecord;
      if (data.pageNo == 1)
        this.firstPage(1);
    });

  }
  public getSearchDataSelector() {
    this.pos.getSearchData().subscribe(res => {
      // console.log(res, 'data');
      this.searchDetail = res.model;
      // this.searchRegion = res.model.regions;
      this.searchCities = res.model.cities;
      this.searchVendors = res.model.vendors;
      this.searchWarehouses = res.model.warehouses;
    });

  }
  public selectdata(data) {
    let stateId = data.target.value;
    this.pos.getSearchCities(stateId).subscribe(res => {
      //console.log(res, 'statedata');
      this.searchCities = res.model;
    })

  }

  public selectdata2(data) {
    let cityId = data.target.value;
    this.pos.getSearchVendors(cityId).subscribe(res => {
      // console.log(res, 'citydata');
      //this.searchCities = res.model;
      this.searchVendors = res.model.vendors;
      this.searchWarehouses = res.model.warehouses;
    })
  }


   /****************************  Function To PrintPdf  ******************************/

  printPurchaseReturnPdf(prnId){
    let dataToSend = {
      "requestedId": prnId,
      "userId": 1
    }
    this.spinner.show();
    this.commonService.printPDF(dataToSend,'api/Outbound/PrintPRO').subscribe(res=>{
          if(!res.didError){
            
            if(res.model.filePath != null && res.model.filePath != ""){

              let fileName = APP_SETTINGS.printBase_url+ res.model.filePath;
            
              
              let arr=fileName.split("/");
              let downloadedFileName=arr[arr.length-1];
              this.downloadService.downloadFile(fileName).subscribe(res=>{
                  if(res){
                    LogUtils.saveAsFile(res,downloadedFileName);
                    this.spinner.hide();
                  }
              });

            }else{
              this.spinner.hide();
            }
          }else{
            this.spinner.hide();
            swal({
              title: 'Result',
              text: res.message,
              type: 'error',
              showCancelButton: false,
              confirmButtonText: 'OK'
            });
          }
    },error=>{
      this.spinner.hide();
      swal({
        title: 'Result',
        text: error.error.errorMessage,
        type: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    });
  }
}
