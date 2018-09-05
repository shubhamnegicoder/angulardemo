import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartService } from '../Core/chart.service';
import { ChartData } from '../Core/interface';
import { PageService } from '../Core/page.service';
import { PurchasedOrderService } from '../Core/purchased-order.service';
import { WarehouseService } from '../Core/warehouse.service';
import swal from 'sweetalert2';
import { LogUtils } from '../log-utils';
import { ImportService } from '../Core/import.service';
import { CommonService } from '../Core/common.service';
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
 
  pager: any = {};
  pageSize: number=10;
  pageNo: number;
  totalRecords: number=0;
  listDetail: Array<any>;
  searchDetail: Array<any>;
  searchCities: Array<any>;
  show: boolean = false;
  data = {
    "name": "",
    "isActive": "",
    "regionId": "",
    "cityId": "",
    "sortName": "name",
    "sortType": "desc",
    "pageSize": 10,
    "pageNo": 1
  }
  fileToUpload: any;

  constructor(private warehouseServiceObj:WarehouseService,private commonService:CommonService,
    private pageService:PageService,private pos:PurchasedOrderService,private importExcelService: ImportService) { }
  
   @ViewChild("state") state:ElementRef;
    @ViewChild("city") city:ElementRef;
    @ViewChild("status") status:ElementRef;
    @ViewChild("Name") name:ElementRef;
   @ViewChild('fileInput') fileInput: ElementRef;
   @ViewChild('closeBtn2') closeBtn2: ElementRef;

  
  toggle() {
    this.show = !this.show;
  }


  public optionpage(data) {
    this.pageSize = data.target.value;
    this.data.pageNo=1
    this.data.pageSize = data.target.value;
    this.getFilteredData(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, 1, this.pageSize);
  }

  ngOnInit() {
    this.commonService.setTitle('IMS-Warehouse');
    //this.getWareHouseList();
     this.getSearchDataSelector();
   // this.getpurchasedList(this.data);    
   this.getFilteredData(this.data);
  }
public resetfunction()
{
  this.data.cityId=this.city.nativeElement.value=""
  this.data.regionId=this.state.nativeElement.value=""
  this.data.isActive=this.status.nativeElement.value=""
  this.data.name=this.name.nativeElement.value=""
  this.getFilteredData(this.data);
}
  public filteroption(Name,state, city, status) {
    console.log(Name,state, city, status,"datatatata");
    this.data.regionId = state;
    this.data.cityId = city;
    this.data.isActive = status;
    this.data.name = Name;
    this.setPage(1);
   console.log("filter option input data:-> "+this.data.regionId,this.data.name);
    this.getFilteredData(this.data);
  }

  getFilteredData(data){
    this.warehouseServiceObj.getFilteredData(data).subscribe(res => {
      
       this.listDetail = res.model;
       this.totalRecords = res.totalRecord;

       console.log("filtered method called:-> "+this.listDetail);
       if (data.pageNo == 1)
         this.firstPage(1);
     });
  }
  private closeModal2(): void {
    this.fileInput.nativeElement.value = '';
    this.closeBtn2.nativeElement.click();
  }
  importAsXLSX() {

    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      this.fileToUpload = fi.files[0];
    }
    if (this.fileToUpload) {
       
      this.importExcelService.uploadBrand(this.fileToUpload, 1, 'api/Warehouse/Import').subscribe(res => {

        if (res) {
          this.fileToUpload = "";
          // show swal showing total number of records uploaded
          // and download file from url
          if (!res.didError) {

            this.closeModal2();
            let msgToDisplay = res.model.successCount + '  out of ' + res.model.totalCount + '  Records imported successfully.';


            swal({
              title: 'Result',
              text: msgToDisplay,
              type: "success",
              showCancelButton: false,
              confirmButtonText: 'OK',
              footer: '<a href="http://103.12.132.77:6002/' + res.model.filePath + '" download="test.xls">click here to download details</a>'
            }).then((result) => {
              if (res.model.filePath !== null && res.model.filePath) {
                this.getFilteredData(this.data);

              }
            })


          } else {
            // handle here the error condition

            swal({
              title: 'Result',
              text: res.message,
              type: "error",
              showCancelButton: false,
              confirmButtonText: 'OK'
            })

          }


        }
      }, (err: any) => {
        //console.log(err.error.errorMessage);

        LogUtils.showLog("upload error response:-> " + err.error);
        //alert("error:-> "+err.error);

        swal({
          title: 'Result',
          text: err.error.errorMessage,
          type: "error",
          showCancelButton: false,
          confirmButtonText: 'OK'
        })
      });
    } else {
      swal({
        title: '',
        text: 'Please select a file..!!',
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    }
  }

  setPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.getFilteredData(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);

  }

  
  firstPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);
  }



  public getWareHouseList() {
    this.warehouseServiceObj.getWareHouseList().subscribe(res => {
     // console.log(res, 'listdata');
      this.listDetail = res.model;
      this.totalRecords = res.totalRecord;
      // if (data.pageNo == 1)
      //   this.firstPage(1);
    });
   
  }
 
    public getSearchDataSelector() {
      this.pos.getSearchData().subscribe(res => {
      this.searchDetail = res.model;
      this.searchCities = res.model.cities;

     // console.log("searchdata")

    });

    }
  public selectdata(data) {
    let stateId = data.target.value;
    this.pos.getSearchCities(stateId).subscribe(res => {
      //console.log(res, 'statedata');
      this.searchCities = res.model;
    })

   }



   changeStatus(id) {

   // alert(id);
    let currentStatus;
    this.listDetail.filter(item => {
      if (item.id == id)
        currentStatus = item.isActive;
    })
    //  alert("row status clicked:-> "+currentStatus);

    //alert("current status:-> "+currentStatus);
    let msg = "You want to Activate this warehouse?"
    if (currentStatus === 1) {
      msg = "You want to Deactivate this warehouse?"
    }

    swal({
      title: 'Are you sure?',
      text: msg,
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        // call service here
        let objToDel = {
          "requestedId": id,
          "userId": 1,
          "status": currentStatus
        }

        this.warehouseServiceObj.changeStatus(objToDel).subscribe(res => {

          LogUtils.showLog('response received change status service:-> ' + res);

          if (!res.didError) {
            // alert("changed successfully");
            this.getFilteredData(this.data);
            swal(
              'Info',
              'Status changed successfully..!!',
              'success'
            );
          } else {
            //alert("issue in changing status");

            swal(
              'Info',
              res.errorMessage,
              'warning'
            );
          }
        }, err => {
          swal(
            '',
            'Error in processing your request.',
            'error'
          );
        });
      }
    })

  }
 

}
