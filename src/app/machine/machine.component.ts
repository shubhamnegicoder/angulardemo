import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { APP_SETTINGS } from '../Core/interface';
import { CommonService } from '../Core/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { DownloadService } from '../Core/download.service';
import { LogUtils } from '../log-utils';
import { GrnService } from '../Core/grn.service';
import { PageService } from '../Core/page.service';
import { DatePipe } from '@angular/common';
import { MachineService } from '../Core/machine.service';
import { ImportService } from '../Core/import.service';
@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  searchList: Array<any> = [];
  searchDetail: Array<any> = [];
  warehouseList: Array<any> = [];
  vendorList: Array<any> = [];
  countryList: Array<any> = [];
  stateList: Array<any> = [];
  pager: any = {};
  pageSize: number = 10;
  pageNo: number;
  totalRecords: number = 0;
  trigger: boolean = false;
  listDetails: Array<any> = [];
  cityList: Array<any> = [];
  //editId;
  callComponent: boolean = false;
  data = {
    "name": "",
    "isActive": "",
    "regionId": "",
    "cityId": "",
    "warehouseId": "",
    "countryId": "",
    "sortName": "name",
    "sortType": "desc",
    "pageSize": 10,
    "pageNo": 1
  };

  fileToUpload: any;

  
   @ViewChild('closeBtn') closeBtn: ElementRef;
   @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('country') country: ElementRef;
  @ViewChild('state') state: ElementRef;
  @ViewChild('city') city: ElementRef;
  @ViewChild('warehouse') warehouse: ElementRef;
  @ViewChild('status') status: ElementRef;
  @ViewChild('name') name: ElementRef;



  
  //call this wherever you want to close modal
 

  private closeModal(): void {
    this.fileInput.nativeElement.value = '';
    this.closeBtn.nativeElement.click();
  }


  constructor(private machineService: MachineService, private pageService: PageService,
    private downloadService:DownloadService,private spinner: NgxSpinnerService,
    private commonService:CommonService,private importExcelService:ImportService) { }

  ngOnInit() {
    this.commonService.setTitle('IMS-Machine');
    this.getSearchDataSelector();
    this.getMachineList(this.data);
  }

 public resetfunction()
 {
    this.data.name=this.name.nativeElement.value=""
    this.data.regionId=this.state.nativeElement.value=""
    this.data.countryId=this.country.nativeElement.value=""
    this.data.isActive=this.status.nativeElement.value=""
    this.data.warehouseId=this.warehouse.nativeElement.value=""
    this.data.cityId=this.city.nativeElement.value=""
    this.getMachineList(this.data);
 }


  /****************************  Function To List All The GRN Data  ******************************/
  public getMachineList(data) {
     this.machineService.getMachineList(data).subscribe(
      res => {
        if(res.didError==false){
        this.listDetails = res.model;
        this.totalRecords = res.totalRecord;
        if (data.pageNo == 1)
          this.firstPage(1);
      }
      else{
        swal(res.errorMessage);
      }
      },err=>{
        swal(err.error.errorMessage);
      });
  }
  /******************Function to chnage the page size by priyanka */


  public optionpage(data) {
    this.pageSize = data.target.value;
    this.data.pageNo = 1
    this.data.pageSize = data.target.value;
    this.getMachineList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, 1, this.pageSize);
  }

  /****************************  Function To Select Data in Filter To Search For First Time  ******************************/
  public getSearchDataSelector() {
    let dataToSend={
      "userId":1
    }
    this.machineService.getFilterOptionsData(dataToSend).subscribe(res => {
      if (res.didError == false) {
        this.countryList = res.model.countries;
        this.stateList = res.model.regions;
        this.cityList = res.model.cities;
        this.warehouseList = res.model.warehouses;
      }
      else {
        //swal("Something Went Wrong");
      }
    }, err => {
      //swal("err.error.errorMessage");
    });

  }



  /****************************  Function To Trigger The Filter Form  ******************************/
  public filterTrigger() {
    this.trigger = !this.trigger;
  }


  /****************************  Function To Set The Page  ******************************/
  setPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.getMachineList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);

  }


  /****************************  Function To Set The First Page  ******************************/
  firstPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);
  }



  selectedCountry(data){
    let countryId = data.target.value;
    let userId  = 1;
    this.commonService.getRegionListFromCountryId(countryId,userId).subscribe(res => {
      if (res.didError == false) {
        this.stateList = res.model;
      } else {
       //
       this.stateList = [];
      }
    }, err => {
      this.stateList = [];
      //LogUtils.showLog(err.error.errorMessage);
    });
  }

  /****************************  Function To Get City By State  ******************************/
  selectCity(data) {
    let cityId = data.target.value;
    let userId = 1;
    this.machineService.getSubWareHouse(cityId,userId).subscribe(res => {
      if (res.didError == false) {
        this.warehouseList = res.model;
      } else {
        this.warehouseList = [];
        swal(res.errorMessage);
      }
    }, err => {
      this.warehouseList = [];
      swal(err.error.errorMessage);
    });
  }

  /****************************  Function To Get State In Filter ******************************/
  selectState(data) {
    let stateId = data.target.value;
    this.commonService.getCitiesFromStateId(stateId).subscribe(res => {
      alert("response received");
      LogUtils.showLog("res:-> "+JSON.stringify(res));
      if (res.didError == false) {
        this.cityList = res.model;
      } else {
        this.cityList = [];
        //LogUtils.showLog(res.message);
        swal({
          title: '',
          text: res.Message,
          type: "error",
          showCancelButton: false,
          confirmButtonText: 'OK',
        });
      }
    }, err => {
      this.cityList = [];
      swal({
        title: '',
        text: err.error.errorMessage,
        type: "error",
        showCancelButton: false,
        confirmButtonText: 'OK',
      });
      //LogUtils.showLog(err.error.errorMessage);
    });
   
  }


  /****************************  Function To Search  ******************************/
  searchDetails(country,state, city, warehouse, status, name) {
   
    this.data.cityId = city;
    this.data.countryId = country;
    this.data.regionId = state;
    this.data.warehouseId = warehouse;
    this.data.isActive = status;
    this.data.name = name;

    this.getMachineList(this.data);
  }




    /****************************  Function To Change Status  ******************************/

    
  changeStatus(id){
    
    let currentStatus ;
     this.listDetails.filter(item=>{
      if(item.id == id)
        currentStatus = item.isActive;
    })

    let msg = "You want to Activate this State?"
    if(currentStatus === 1){
      msg = "You want to Deactivate this State?"
    }

    swal({
      title: 'Are you sure?',
      text: msg,
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if(result.value){
        // call service here
        let objToDel = {
          "requestedId": id,
          "userId": 1,
          "status": currentStatus
        }
        this.spinner.show();
        this.machineService.changeStatus(objToDel).subscribe(res=>{

          console.log("response received change status service:-> "+JSON.stringify(res));
          this.spinner.hide();
          if(!res.didError){
             // alert("changed successfully");
              this.getMachineList(this.data);
              swal(
                'Info',
                'Status changed successfully..!!',
                'success'
              )
          }else{
            //alert("issue in changing status");

            swal(
              'Info',
              res.message,
              'warning'
            )
          }
        },err=>{
          this.spinner.hide();
          swal(
            'Info',
            "error in processing your request. Please try again.",
            'warning'
          )
         
        });
      }
    })
   
  }


    /****************************  Import excel function  ******************************/

  importAsXLSX() {

    alert("import function called");
    const fi = this.fileInput.nativeElement;

    if (fi.files && fi.files[0]) {
      this.fileToUpload = fi.files[0];
    }
    this.spinner.show();
    this.importExcelService.uploadBrand(this.fileToUpload, 1,'api/Customer/Import').subscribe(res => {

      this.spinner.hide();
      if (res) {
        // show swal showing total number of records uploaded
        // and download file from url
        if (!res.didError && (res.model.successCount > 0)) {

          this.closeModal();
          let  msgToDisplay = res.model.successCount + '  out of '+res.model.totalCount+' total Records imported successfully.';
          let pathToDownloadFile = "";

          if (res.model.filePath !== null && res.model.filePath) {
            pathToDownloadFile = APP_SETTINGS.base_url + res.model.filePath
          }
          swal({
            title: 'Result',
            text: msgToDisplay,
            type: "success",
            showCancelButton: false,
            confirmButtonText: 'OK',
            footer: '<a href="http://103.12.132.77:6002/'+res.model.filePath+'" download="test.xls">click here to download details</a>'
          }).then((result) => {
            if (res.model.filePath !== null && res.model.filePath) {
               this.getMachineList(this.data);
            
            }
          })


        } else {
          // handle here the error condition

          swal({
            title: 'Result',
            text: res.errorMessage  ,
            type: "error",
            showCancelButton: false,
            confirmButtonText: 'OK'
          })

        }


      }
    }, (err: any) => {

      this.spinner.hide();
     LogUtils.showLog("upload error response:-> " + err.error);

      swal({
        title: 'Result',
        text: err.message,
        type: "error",
        showCancelButton: false,
        confirmButtonText: 'OK'
      })
    });
  }

}
