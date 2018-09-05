import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PurchasedOrderService } from '../../Core/purchased-order.service';
import { PageService } from '../../Core/page.service';
import { ProductTypeService } from '../../Core/product-type.service';
import { BrandService } from '../../Core/brand.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ImportService } from '../../Core/import.service';


import { LogUtils } from '../../log-utils';
import { DownloadService } from '../../Core/download.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';
import { CommonService } from '../../Core/common.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {


  pager: any = {};
  pageSize: number = 10;
  pageNo: number;
  totalRecords: number = 0;
  listDetail: Array<any>;
  searchDetail: Array<any>;
  searchCities: Array<any>;
  searchVendors: Array<any>;
  searchWarehouses: Array<any>;
  editList = {
    "id": "",
    "name": "",
    "isActive": ""
  };
  show: boolean = false;
  type_val: any = "";


  data = {
    "status": "",
    "name": "",
    "parentId": "",
    "sortName": "name",
    "sortType": "desc",
    "pageSize": 10,
    "pageNo": 1
  }


  dataForBrandCreation = {
    "id": "",
    "name": "",
    "status": "",
    "userId": "1",
    "isList": "0"
  }


  // dataForUpdateBrand = {
  //   "id": "",
  //   "name": "",
  //   "status": "",
  //   "userId": "1",
  //   "isList": "0"
  // }
  fileToUpload: any;
  brandName1: string = '';
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

 @ViewChild('name') name: ElementRef;
 @ViewChild('status') status: ElementRef;

 public resetfunction()
 {
  this.data.name=this.name.nativeElement.value=""
  this.data.status=this.status.nativeElement.value=""
  this.getBrandList(this.data);
 }
  //call this wherever you want to close modal
  private closeModal(): void {
    //this.brand.nativeElement.value = '';
    this.brandName1 = '';

    this.closeBtn.nativeElement.click();
  }

  private closeModal1(): void {
    this.closeBtn1.nativeElement.click();
  }

  private closeModal2(): void {
    this.fileInput.nativeElement.value = '';
    this.closeBtn2.nativeElement.click();
  }

  constructor(private importExcelService: ImportService,
    private downloadService: DownloadService,
    private pageService: PageService, private brandServiceObj: BrandService,
     private router: Router,private spinner:NgxSpinnerService,private commonService:CommonService) { }



    

  toggle() {
    this.show = !this.show;
  }


  public optionpage(data) {
    this.pageSize = data.target.value;
    this.data.pageNo = 1
    this.data.pageSize = data.target.value;
    this.getBrandList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, 1, this.pageSize);
  }

  ngOnInit() {
    this.getBrandList(this.data);
    console.log("brand page called");
   // LogUtils.showLog("brand page called printed via logutils clss");
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);

    this.commonService.setTitle('IMS-Catalogue-Brand');
  }

  public filteroption(status, name) {
    console.log(status, name, "datatatata");
    this.data.status = status;
    this.data.name = name;

    this.setPage(1);
    console.log("data:-> " + this.data.status, this.data.name, this.data.sortName);
    this.getBrandList(this.data);

  }

  setPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.getBrandList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);

  }

  firstPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);
  }



  public getBrandList(data) {
    console.log(JSON.stringify(data) + '  in brand');

    this.brandServiceObj.getBrandList(data).subscribe(res => {
      // this.spinner.hide();
      console.log('brandlist data received:-> ');
      this.listDetail = res.model;
      this.totalRecords = res.totalRecord;
      // console.log('brandlist data received:-> '+this.listDetail.length);
      if (data.pageNo == 1)
        this.firstPage(1);
    }, err => {
    });

  }


  createBrand(brandName) {
    console.log("brand to be created:-> " + brandName);
    //need to call the service from here to create brand.
    if (brandName === "") {
      swal({
        title: '',
        text: 'Brand Name is Mandatory',
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    } else {
      this.dataForBrandCreation.name = brandName;
      console.log("data name:-> " + this.dataForBrandCreation.name);
      this.spinner.show();
      this.brandServiceObj.createBrands(this.dataForBrandCreation).subscribe(response => {

          this.spinner.hide();
        console.log("response received:-> " + response.model);
        if (response.didError === false)
          this.type_val = 'success';
        else
          this.type_val = 'warning';


        if (!response.didError) {
          // success case

          this.closeModal();



          swal({
            title: '',
            text: response.model.statusMessage,
            type: this.type_val,
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then((result) => {
            console.log("result value:->" + result.value);
            if (response.didError === true && result.value === true) {
              // this.removeModal();
              //alert("ok pressed & if executed")
            } else {
              // alert("ok pressed & else executed")
              this.getBrandList(this.data);
              brandName = "";
            }
          })



        } else {
          swal({
            title: '',
            text: response.message,
            type: this.type_val,
            showCancelButton: false,
            confirmButtonText: 'OK'
          });
        }

      }, error => {
        this.spinner.hide();
        swal({
          title: '',
          text: "error in processing your request. Please try again later.",
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK'
        });
      });
    }
  }


  hideModal() {
    this.closeModal();
  }

  editBrand(brandName) {
    console.log("brand to be edited:-> " + brandName);
    //need to call the service from here to create brand.
    if (brandName === "") {
      swal({
        title: '',
        text: 'Brand Name is Mandatory',
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    } else {
      this.dataForBrandCreation.name = brandName;
      this.dataForBrandCreation.id = this.editList.id;
      this.dataForBrandCreation.status = this.editList.isActive;

      console.log("data to update:-> " + this.dataForBrandCreation.name, this.dataForBrandCreation.id, this.dataForBrandCreation.status);

      this.brandServiceObj.updateBrand(this.dataForBrandCreation).subscribe(response => {

        console.log("response received:-> " + response.model);
        if (response.didError === false)
          this.type_val = 'success';
        else
          this.type_val = 'warning';


        if (!response.didError) {
          // success case

          this.closeModal1();


          swal({
            title: 'Result',
            text: response.model.statusMessage,
            type: this.type_val,
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then((result) => {
            console.log("result value:->" + result.value);
            if (response.didError === true && result.value === true) {
              // this.removeModal();
              //alert("ok pressed & if executed")
            } else {
              // alert("ok pressed & else executed")
              this.getBrandList(this.data);
              brandName = "";
            }
          })



        } else {
          swal({
            title: 'Result',
            text: response.message,
            type: this.type_val,
            showCancelButton: false,
            confirmButtonText: 'OK'
          });
        }

      }, error => {
        swal({
          title: 'Result',
          text: "error in processing your request. Please try again later.",
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK'
        });
      });
    }
  }




  editClicked(id) {
    console.log("selected row id:-> " + id);
    this.listDetail.map((item, key) => {
      // //console.log(item, 'item');

      if (item.id === id) {
        this.editList = item;
        //   //console.log(this.callOneList, 'ooooooooooooooo');


      }


    });
  }

  importAsXLSX() {

    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      this.fileToUpload = fi.files[0];
    }
    if (this.fileToUpload) {
      
      this.importExcelService.uploadBrand(this.fileToUpload, 1, 'api/Brand/Import').subscribe(res => {

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
                this.getBrandList(this.data);

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

  changeStatus(id) {

    let currentStatus;
    this.listDetail.filter(item => {
      if (item.id == id)
        currentStatus = item.isActive;
    })
    //  alert("row status clicked:-> "+currentStatus);

    let msg = "You want to Activate this Brand?"
    let statusToShow = "Successfully Activated Brand..!!"
    if (currentStatus === 1) {
      msg = "You want to Deactivate this Brand?"
      statusToShow = "Successfully Deactivated Brand..!!"
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

        this.brandServiceObj.changeStatus(objToDel).subscribe(res => {

          console.log('response received change status service:-> ' + res.didError);

          if (!res.didError) {
            // alert("changed successfully");
            this.getBrandList(this.data);
            swal(
              'Info',
              statusToShow,
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
          alert('error in service');
        });
      }
    })

  }
  // public exportAsExcelFile(json: any[], excelFileName: string): void {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }
  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: 'application/ms-excel' });
  //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }
}
