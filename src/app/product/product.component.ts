import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../Core/product.service';
import { Product, Category, brand } from '../Core/interface';
import { PageService } from '../Core/page.service';
import swal from 'sweetalert2';
import { ImportService } from '../Core/import.service';
import { DownloadService } from '../Core/download.service';
import { LogUtils } from '../log-utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { BrandService } from '../Core/brand.service';
import { CategoryService } from '../Core/category.service';
import { CommonService } from '../Core/common.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  show: boolean = false;
  pager: any = {};
  pageSize = 10;
  pageNo: number;
  totalRecords = 0;
  productList: Array<Product> = [];
  categoryName: Array<Category> = [];
  brandName: Array<brand> = [];
  productId;
  filePath;
  data = {
    'hsnCode': '',
    'name': '',
    'isActive': '',
    'categoryId': '',
    'brandId': '',
    'uomId': '',
    'sortName': 'name',
    'sortType': 'desc',
    'pageSize': 10,
    'pageNo': 1
  };
  fileToUpload: any;

  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('category') category: ElementRef;
  @ViewChild('brand') brand: ElementRef;
  @ViewChild('status') status: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('hsn') hsn: ElementRef;


  private closeModal2(): void {
    this.fileInput.nativeElement.value = '';
    this.closeBtn2.nativeElement.click();
  }
  constructor(private importExcelService: ImportService,
    private downloadService: DownloadService,private commonService:CommonService,
    private productService: ProductService,private brandService:BrandService,private categoryService:CategoryService, private pageService: PageService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.commonService.setTitle('IMS-Catalogue-Product');
    this.getAllProduct();
    this.selectCategory();
    this.selectBrand();
  }

  public resetfunction()
  {
       this.data.brandId=this.brand.nativeElement.value=""
       this.data.name=this.name.nativeElement.value=""
       this.data.categoryId=this.category.nativeElement.value=""
       this.data.hsnCode=this.hsn.nativeElement.value=""
       this.data.isActive=this.status.nativeElement.value=""
       this.getAllProduct();
  }
  public optionpage(data) {
    this.pageSize = data.target.value;
    this.data.pageNo = 1;
    this.data.pageSize = data.target.value;
    this.getAllProduct();
    this.pager = this.pageService.getPager(this.totalRecords, 1, this.pageSize);
  }
  setPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.getAllProduct();
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);

  }

  firstPage(page: number) {

    this.pageNo = page;
    this.data.pageNo = page;

    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);



  }
  toggle() {
    this.show = !this.show;
  }
  getAllProduct() {
    this.productService.getProductList(this.data).subscribe(response => {
      if (!response.didError) {
        this.productList = response.model;
        this.totalRecords = response.totalRecord;
        if (this.data.pageNo === 1) {
          this.firstPage(1);
        }
        if(this.productList === null){
          swal({
            'type': 'warning',
            'text': response.message,
            'showConfirmButton': true
          });
        }
      } else {
        swal({
          'type': 'warning',
          'text': response.message,
          'showConfirmButton': true
        });
      }
    }, error => {
      swal({
        'type': 'error',
        'text': error.error.errorMessage,
        'showConfirmButton': true
      });
    }
    );

  }



  changeStatus(id) {

    let currentStatus;
    this.productList.filter(item => {
      if (item.id == id)
        currentStatus = item.isActive;
    })
    // alert("row status clicked:-> "+id);

    let msg = "You want to Activate this Product?"
    let statusToShow = "Successfully Activated Product..!!"
    if (currentStatus === 1) {
      msg = "You want to Deactivate this Product?"
      statusToShow = "Successfully Deactivated Product..!!"
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

        this.productService.changeStatus(objToDel).subscribe(res => {

          console.log("response received change status service:-> " + res.didError);

          if (!res.didError) {
            // alert("changed successfully");
            this.getAllProduct();
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
          alert("error in service");
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
      this.importExcelService.uploadBrand(this.fileToUpload, 1, 'api/Item/Import').subscribe(res => {

        if (res) {
          this.fileToUpload = "";
          // show swal showing total number of records uploaded
          // and download file from url
          if (!res.didError) {

            this.closeModal2();
            let msgToDisplay = res.model.successCount + '  out of ' + res.model.totalCount + ' total Records imported successfully.';

            swal({
              title: 'Result',
              text: msgToDisplay,
              type: "success",
              showCancelButton: false,
              confirmButtonText: 'OK',
              footer: '<a href="http://103.12.132.77:6002/' + res.model.filePath + '" >click here to download details</a>'
            }).then((result) => {
              if (res.model.filePath !== null && res.model.filePath) {
                this.getAllProduct();
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
        swal({
          title: '',
          text: err.error.errorMessage,
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK'
        });
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

  public selectCategory() {
    let data = {
      'userId': 1
    };
    this.categoryService.getAllCategory(data).subscribe(res => {
      if (res.didError === false) {
        this.categoryName = res.model;
      } else {
        swal({
          text: 'Error in processing the request',
          type: 'warning',
          showConfirmButton: true
        });
      }
    }, err => {
      swal({
        text: err.error.errorMessage,
        type: 'error',
        showConfirmButton: true
      });
    }
    );
  }

  public selectBrand() {
    let data = {
      'userId': 1
    };
    this.brandService.getAllBrand(data).subscribe(res => {
      if (res.didError === false) {
        this.brandName = res.model;
      } else {
        swal({
          text: 'Error in processing the request', 
          type: 'warning',
          showConfirmButton: true
        });
      }
    }, err => {
      swal({
        text: err.error.errorMessage,
        type: 'error',
        showConfirmButton: true
      });
    }
    );
  }

  public searchDetails(category, brand1, name, status, hsn) {
    this.data.hsnCode = hsn;
    this.data.name = name;
    this.data.isActive = status;
    this.data.categoryId = category;
    this.data.brandId = brand1;
    this.getAllProduct();
  }


  // public downloadSample() {
  //   let data = {
  //     'requestedId': this.productId,
  //     userId: 1
  //   };
  //   this.spinner.show();
  //   this.productService.uploadProductMargin(data).subscribe(res => {
  //     this.spinner.hide();
  //     if (!res.didError) {
  //       console.log('res', res);
  //       this.filePath = res.model.filePath;
  //     } else {
  //       swal({type: 'warning', text: 'Error in processing the request', showConfirmButton: true});
  //     }
  //   }, err => {
  //     swal({type: 'error', text: err.error.errorMessage, showConfirmButton: true});
  //   });
  // }

 public accessId(proId) {
    this.productId = proId;
  }
}


