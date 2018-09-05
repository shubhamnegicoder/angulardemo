import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageService } from '../../Core/page.service';
import { SubCategoryService } from '../../Core/sub-category.service';
import swal from 'sweetalert2';
import { ImportService } from '../../Core/import.service';
import { LogUtils } from '../../log-utils';
import { CommonService } from '../../Core/common.service';
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  pager: any = {};
  pageSize: number = 10;
  pageNo: number;
  totalRecords: number = 0;
  listDetail: Array<any>;
  categoryList: Array<any>;
  editList = {
    "categoryName": "",
    "categoryId": "",
    "id": "",
    "name": "",
    "isActive": ""
  }

  show: boolean = false;

  data = {
    "status": "",
    "name": "",
    "parentId": "",
    "sortName": "name",
    "sortType": "desc",
    "pageSize": 10,
    "pageNo": 1
  }

  type_val: any = "";


  dataForSubCategoryCreation = {
    "parentId": "",
    "id": "",
    "name": "",
    "status": "",
    "userId": "1",
    "isList": "0"
  }
  fileToUpload: any;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  @ViewChild('subBrandNamee') subBrandNamee: ElementRef;
  @ViewChild('brandd') brandd: ElementRef;

  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('category') category: ElementRef;
  @ViewChild('status') status: ElementRef;
  //call this wherever you want to close modal
  private closeModal(): void {
    this.subBrandNamee.nativeElement.value = '';
    this.brandd.nativeElement.value = '-1';
    this.closeBtn.nativeElement.click();
  }

  private closeModal1(): void {
    this.closeBtn1.nativeElement.click();
  }
  private closeModal2(): void {
    this.fileInput.nativeElement.value = '';
    this.closeBtn2.nativeElement.click();
  }

  constructor(private pageService: PageService,private commonService:CommonService,
     private subCategoryServiceObj: SubCategoryService, private importExcelService: ImportService) { }

    public resetfunction()
    {
      this.data.name=this.name.nativeElement.value="";
      this.data.status=this.status.nativeElement.value="";
      this.data.parentId=this.category.nativeElement.value="";
      this.getSubCategoryList(this.data);
    }

  toggle() {
    this.show = !this.show;
  }


  public optionpage(data) {
    this.pageSize = data.target.value;
    this.data.pageNo = 1
    this.data.pageSize = data.target.value;
    this.getSubCategoryList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, 1, this.pageSize);
  }

  ngOnInit() {
    this.commonService.setTitle('IMS-Catalogue-SubCategory');
    this.getSearchDataSelector();
    this.getSubCategoryList(this.data);
  }

  public filteroption(status, name, categoryId) {
    console.log(status, name, "datatatata");
    this.data.status = status;
    this.data.name = name;
    this.data.parentId = categoryId;
    this.setPage(1);
    console.log("data:-> " + this.data.status, this.data.name, this.data.sortName);
    this.getSubCategoryList(this.data);

  }

  setPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.getSubCategoryList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);

  }

  firstPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);
  }



  public getSubCategoryList(data) {
    console.log(JSON.stringify(data) + '  in brand');
    this.subCategoryServiceObj.getSubCategoryList(data).subscribe(res => {
      console.log('brandlist data received:-> ');
      this.listDetail = res.model;
      this.totalRecords = res.totalRecord;
      // console.log('brandlist data received:-> '+this.listDetail.length);
      if (data.pageNo == 1)
        this.firstPage(1);
    });

  }


  public getSearchDataSelector() {
    const param = {
      "userId": "1"
    }
    this.subCategoryServiceObj.getAllCategoryList(param).subscribe(res => {
      this.categoryList = res.model;

    });

  }


  createSubCategory(subBrandName, brand_id) {
    console.log("sub brand to be created:->" + subBrandName, brand_id);
    this.dataForSubCategoryCreation.name = subBrandName;
    this.dataForSubCategoryCreation.parentId = brand_id
    let msg = this.inputValidation();
    if (msg != "") {

      swal({
        title: '',
        text: msg,
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    } else {
      console.log("data name:-> " + this.dataForSubCategoryCreation.name, this.dataForSubCategoryCreation.parentId);

      this.subCategoryServiceObj.createSubCategory(this.dataForSubCategoryCreation).subscribe(response => {

        console.log("response received:-> " + response.model);
        if (response.didError === false)
          this.type_val = 'success';
        else
          this.type_val = 'warning';


        if (!response.didError) {
          // success case

          this.closeModal();


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
              this.getSubCategoryList(this.data);
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
    this.listDetail.map((item, key) => {
      if (item.id === id) {
        this.editList = item;
      }
    });
  }

  editSubCategory(subBrandName, brand_id) {
    console.log("sub brand to be edited:->" + subBrandName, brand_id);

    this.dataForSubCategoryCreation.name = subBrandName;
    this.dataForSubCategoryCreation.id = this.editList.id;
    this.dataForSubCategoryCreation.parentId = brand_id;
    this.dataForSubCategoryCreation.status = this.editList.isActive;

    console.log("data to update:-> " + this.dataForSubCategoryCreation.name, this.dataForSubCategoryCreation.id, this.dataForSubCategoryCreation.status);
    let msg = this.inputValidation();
    if (msg != "") {

      swal({
        title: '',
        text: msg,
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    } else {
      this.subCategoryServiceObj.updateSubCategory(this.dataForSubCategoryCreation).subscribe(response => {

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
              this.getSubCategoryList(this.data);
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


  inputValidation(): string {

    let msg = "";
    if (this.dataForSubCategoryCreation.name === "") {
      msg = "Name is Mandatory"
    } else if (this.dataForSubCategoryCreation.parentId === "" || this.dataForSubCategoryCreation.parentId === "-1") {
      msg = "Category is Mandatory"
    }

    return msg;
  }

  hideModal() {
    this.closeModal();
  }


  selectedValue(): number {

    console.log("selected item brand name:->" + name);
    console.log("editlist brandname :-> " + this.editList.categoryName);

    this.categoryList.forEach(item => {
      if (item.name === this.editList.categoryName)
        return item.id;

    });
    return -1;
  }


  changeStatus(id) {

    let currentStatus;
    this.listDetail.filter(item => {
      if (item.id == id)
        currentStatus = item.isActive;
    })

    let msg = "You want to Activate this Sub Category?"
    let statusToShow = "Successfully Activated Sub Category..!!"
    if (currentStatus === 1) {
      msg = "You want to Deactivate this Sub Category?"
      statusToShow = "Successfully Deactivated Sub Category..!!"
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

        this.subCategoryServiceObj.changeStatus(objToDel).subscribe(res => {

          console.log("response received change status service:-> " + res.didError);

          if (!res.didError) {
            // alert("changed successfully");
            this.getSubCategoryList(this.data);
            swal(
              'Info',
              statusToShow,
              'success'
            )
          } else {
            //alert("issue in changing status");

            swal(
              'Info',
              res.errorMessage,
              'warning'
            )
          }
        }, err => {
          swal(
            'Info',
            err.error.errorMessage,
            'error'
          )
        });
      }
    })

  }

  importAsXLSX() {

    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      this.fileToUpload = fi.files[0];
    }

    if (this.fileToUpload) {
      this.importExcelService.uploadBrand(this.fileToUpload, 1, 'api/SubCategory/Import').subscribe(res => {

        if (res) {
          this.fileToUpload = "";
          // show swal showing total number of records uploaded
          // and download file from url
          if (!res.didError && res.model.successCount > 0) {

            this.closeModal2();
            let msgToDisplay = res.model.successCount + '  out of ' + res.model.totalCount + '  Records imported successfully.';

            swal({
              title: '',
              text: msgToDisplay,
              type: "success",
              showCancelButton: false,
              confirmButtonText: 'OK',
              footer: '<a href="http://103.12.132.77:6002/' + res.model.filePath + '" download="test.xls">click here to download details</a>'
            }).then((result) => {
              if (res.model.filePath !== null && res.model.filePath) {
                this.getSubCategoryList(this.data);
                // this.downloadService.downloadFile(res.model.filePath).subscribe(res1 => {
                //   console.log("response:-> " + res1);
                //   LogUtils.saveAsExcelFile(res1, 'ImportBrandResult.xlsx');

                // }, err => {
                //   console.log("error in downloading file content");
                // })
              }
            })


          } else {
            // handle here the error condition

            swal({
              title: '',
              text: res.message,
              type: "warning",
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

}
