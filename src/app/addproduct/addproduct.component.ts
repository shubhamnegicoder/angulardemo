import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { brand, Category, UOM, Tax, Department, Company, ProductType, Product } from '../Core/interface';
import { ProductService } from '../Core/product.service';
import { BrandService } from '../Core/brand.service';
import { SubBrandService } from '../Core/sub-brand.service';
import swal from 'sweetalert2';

import { CategoryService } from '../Core/category.service';
import { SubCategoryService } from '../Core/sub-category.service';
import { DepartmentService } from '../Core/department.service';
import { CompanyService } from '../Core/company.service';
import { TaxService } from '../Core/tax.service';
import { ProductTypeService } from '../Core/product-type.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  prod = {
    'itemId': '0',
    'name': '',
    'isActive': '',
    'brandId': '',
    'uomId': '1',
    'categoryId': '',
    'taxId': '',
    'userId': '1',
    'price': '',
    'subBrandId': '',
    'subCategoryId': '',
    'barCode': '',
    'hsnCode': '',
    'departmentId': '',
    'itemTypeId': '',
    'companyId': ''
  };
  brandList: Array<brand> = [];
  categoryList: Array<Category> = [];
  uomList: Array<UOM> = [];
  taxList: Array<Tax> = [];
  departmentList: Array<Department> = [];
  companyList: Array<Company> = [];
  productTypeList: Array<ProductType> = [];
  subBrandList: Array<any> = [];
  subCategoryList: Array<any> = [];
  brandId;
  selectedBrandName = '';
  selectedCategoryName = '';
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;
  @ViewChild('closeBtn4') closeBtn4: ElementRef;
  @ViewChild('closeBtn5') closeBtn5: ElementRef;
  @ViewChild('closeBtn6') closeBtn6: ElementRef;
  @ViewChild('closeBtn7') closeBtn7: ElementRef;
  @ViewChild('brand') brand: ElementRef;
  @ViewChild('subBrandName') subBrandName: ElementRef;
  @ViewChild('categoryName') categoryName: ElementRef;
  @ViewChild('subCatName') subCatName: ElementRef;
  @ViewChild('depName') depName: ElementRef;
  @ViewChild('compName') compName: ElementRef;
  @ViewChild('taxName') taxName: ElementRef;

  @ViewChild('tax') tax: ElementRef;
  @ViewChild('cess') cess: ElementRef;
  @ViewChild('prodTypeNamee') prodTypeNamee: ElementRef;
  




  
  type_val: any = '';
  dataForBrandCreation = {
    "id": "",
    "name": "",
    "status": "",
    "userId": "1",
    "isList": "1"
  };
  dataForSubBrandCreation = {
    "parentId": "",
    "id": "",
    "name": "",
    "status": "",
    "userId": "1",
    "isList": "1"
  };
  dataForCatCreation = {
    "id": "",
    "name": "",
    "status": "",
    "userId": "1",
    "isList": "1"
  };
  dataForSubCategoryCreation = {
    "parentId": "",
    "id": "",
    "name": "",
    "status": "",
    "userId": "1",
    "isList": "1"
  };
  dataForDeptCreation = {
    "id": "",
    "name": "",
    "status": "",
    "userId": "1",
    "isList": "1"
  };
  dataForCompCreation = {
    "id": "",
    "name": "",
    "status": "",
    "userId": "1",
    "isList": "1"
  };
  dataForProdTypeCreation = {
    "id": "",
    "name": "",
    "status": "",
    "userId": "1",
    "isList": "1"
  };
  constructor(private productService: ProductService, private brandServiceObj: BrandService, private subBrandService: SubBrandService
    , private categoryService: CategoryService, private subCategoryService: SubCategoryService,
    private departmentService: DepartmentService, private companyService: CompanyService, private taxService: TaxService,
    private prodTypeService: ProductTypeService, private route: Router) { }

  ngOnInit() {

    this.loadBasicData();
  }
  loadBasicData() {
    this.productService.getAllProductMaster().subscribe(response => {
      console.log(response);
      if (!response.didError) {
        this.brandList = response.model.brandViewModels;
        this.categoryList = response.model.categoryViewModels;
        this.companyList = response.model.companyViewModels;
        this.departmentList = response.model.departmentViewModels;
        this.taxList = response.model.taxViewModels;
        this.uomList = response.model.uOMViewModels;
        this.productTypeList = response.model.productTypeViewModels;


      }

    }, error => { });
  }
  selectBrand(event) {
    const data = event.target.value;
    // alert(data);
    this.prod.brandId = data;
    this.brandId = parseInt(data);
    this.selectedBrandName = this.brandList.filter(b => b.id == this.brandId).pop().name;
    this.productService.getAllSubBrand(data).subscribe(response => {
      console.log(response);
      if (!response.didError) {
        this.subBrandList = response.model;

      } else {
        console.log('error occured :' + response);
        alert(response.errorMessage);
      }
    }, err => { alert('error occured'); });
  }
  selectCategory(event) {
    const data = event.target.value;
    
    this.productService.getAllSubCategory(data).subscribe(response => {
      console.log(response);
      if (!response.didError) {
        this.subCategoryList = response.model;

      } else {
        console.log('error occured :' + response);
        alert(response.errorMessage);
      }
    }, err => { alert('error occured'); });
  }
  onSubmit() {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.prod));

    this.productService.addProduct(this.prod).subscribe(response => {
      if (!response.didError) {
        swal({ type: 'success', text: 'Product added successfully' });
         this.route.navigate(['/Product']);;
      } else {
        alert('in else' + response.errorMessage);
      }
    }, error => {
      console.log(error.error.errorMessage);
    });
  }

  createBrand(brandName) {
    console.log('brand to be created:-> ' + brandName);
    //need to call the service from here to create brand.
    this.dataForBrandCreation.name = brandName;
    console.log('data name:-> ' + this.dataForBrandCreation.name);
    this.brandServiceObj.createBrands(this.dataForBrandCreation).subscribe(response => {

      console.log('response received:-> ' + response.model);
      if (!response.didError) {
        this.type_val = 'success';
        this.brandList = response.model.brandViewModels;
        this.prod.brandId = response.model.id;
        this.selectedBrandName = brandName;
      }
      else
        this.type_val = 'warning';


      if (!response.didError) {
        // success case

        if (response.model.statusMessage === 'Success') {
          // here handle success case
          this.closeModal();


        } else {
          //here handle already exist case
          // alert(response.model.statusMessage);
        }

        swal({
          title: 'Result',
          text: response.model.statusMessage,
          type: this.type_val,
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          console.log("result value:->" + result.value);
          if (response.model.statusMessage !== 'Success' && result.value === true) {
            // this.removeModal();
            //alert("ok pressed & if executed")
          } else {
            // alert("ok pressed & else executed")
            //this.getBrandList(this.data);

            brandName = '';
          }
        });



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
      swal('Error in processing your request 400.');
    });
  }
  createSubBrand(subBrandName) {
    console.log("sub brand to be created:->" + subBrandName);
    this.dataForSubBrandCreation.name = subBrandName;
    this.dataForSubBrandCreation.parentId = this.prod.brandId;
    console.log('data name:-> ' + this.dataForSubBrandCreation.name, this.dataForSubBrandCreation.parentId);
    this.subBrandService.createSubBrand(this.dataForSubBrandCreation).subscribe(response => {

      console.log('response received:-> ' + response.model);
      if (response.didError === false) {

        this.type_val = 'success';
        this.subBrandList = response.model.subBrandViewModels;
        this.prod.subBrandId = response.model.id;
      } else {
        this.type_val = 'warning';
      }


      if (!response.didError) {
        // success case

        // here handle success case
        this.closeModal1();


        swal({
          title: 'Result',
          text: response.message,
          type: this.type_val,
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          console.log('result value:->' + result.value);
          // call list method here to get the list
        });

      } else {
        swal("Error in processing your request.");
      }

    }, error => {
      swal("Error in processing your request 400.");
    });
  }

  createCategory(categoryName) {

    this.dataForCatCreation.name = categoryName;
    console.log("data name:-> " + this.dataForCatCreation.name);
    this.categoryService.createCategory(this.dataForCatCreation).subscribe(response => {

      console.log('response received:-> ' + response.model);
      if (!response.didError) {
        this.type_val = 'success';
        this.prod.categoryId = response.model.id;
        this.categoryList = response.model.categoryViewModels;
        this.selectedCategoryName = categoryName;
      } else {
        this.type_val = 'warning';
      }


      if (!response.didError) {
        // success case

        if (response.model.statusMessage === 'Success') {
          // here handle success case
          this.closeModal2();


        } else {
          //here handle already exist case
          // alert(response.model.statusMessage);
        }

        swal({
          title: 'Result',
          text: response.model.statusMessage,
          type: this.type_val,
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          console.log('result value:->' + result.value);
          if (response.model.statusMessage !== 'Success' && result.value === true) {
            // this.removeModal();
            //alert("ok pressed & if executed")
          } else {
            // alert("ok pressed & else executed")


            categoryName = '';
          }
        });



      } else {
        swal('Error in processing your request.');
      }

    }, error => {
      swal('Error in processing your request 400.');
    });
  }
  //call this wherever you want to close modal
  private closeModal(): void {
    this.brand.nativeElement.value = '';
    this.closeBtn.nativeElement.click();
  }
 
  private closeModal1(): void {
     this.subBrandName.nativeElement.value = '';
    this.closeBtn1.nativeElement.click();
  }

  private closeModal2(): void {
     this.categoryName.nativeElement.value = '';
    this.closeBtn2.nativeElement.click();
  }

  private closeModal3(): void {
     this.subCatName.nativeElement.value = '';
    this.closeBtn3.nativeElement.click();
  }

  private closeModal4(): void {
     this.depName.nativeElement.value = '';
    this.closeBtn4.nativeElement.click();
  }


  private closeModal5(): void {
     this.compName.nativeElement.value = '';
    this.closeBtn5.nativeElement.click();
  }

  private closeModal6(): void {
     this.taxName.nativeElement.value = '';
     this.tax.nativeElement.value = '';
     this.cess.nativeElement.value = '';
    this.closeBtn6.nativeElement.click();
  }

  private closeModal7(): void {
    this.prodTypeNamee.nativeElement.value = '';
        this.closeBtn7.nativeElement.click();
  }

  createSubCategory(subCatName) {
    //console.log("sub brand to be created:->" + subBrandName, brand_id);
    this.dataForSubCategoryCreation.name = subCatName;
    this.dataForSubCategoryCreation.parentId = this.prod.categoryId;
    console.log("data name:-> " + this.dataForSubCategoryCreation.name, this.dataForSubCategoryCreation.parentId);
    this.subCategoryService.createSubCategory(this.dataForSubCategoryCreation).subscribe(response => {

      console.log("response received:-> " + response.model);
      if (response.model.statusMessage === 'Success') {
        this.type_val = 'success';
        this.subCategoryList = response.model.subCategoryViewModels;
        this.prod.subCategoryId = response.model.id;
      }
      else
        this.type_val = 'warning';


      if (!response.didError) {
        // success case

        if (response.model.statusMessage === 'Success') {
          // here handle success case
          this.closeModal3();


        } else {
          //here handle already exist case
          // alert(response.model.statusMessage);
        }

        swal({
          title: 'Result',
          text: response.model.statusMessage,
          type: this.type_val,
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          console.log("result value:->" + result.value);
          if (response.model.statusMessage !== 'Success' && result.value === true) {
            // this.removeModal();
            //alert("ok pressed & if executed")
          } else {
            // alert("ok pressed & else executed")

          }
        });

      } else {
        swal("Error in processing your request.");
      }

    }, error => {
      swal("Error in processing your request 400.");
    });
  }


  createDepartment(depName) {
    console.log('department to be created:-> ' + depName);

    this.dataForDeptCreation.name = depName;
    console.log('data name:-> ' + this.dataForDeptCreation.name);
    this.departmentService.createDepartment(this.dataForDeptCreation).subscribe(response => {

      console.log("response received:-> " + response.model);
      if (response.model.statusMessage === 'Success') {
        this.type_val = 'success';
        this.departmentList = response.model.departmentViewModels;
        this.prod.departmentId = response.model.id;
      }
      else
        this.type_val = 'warning';


      if (!response.didError) {
        // success case

        if (response.model.statusMessage === 'Success') {
          // here handle success case
          this.closeModal4();


        } else {
          //here handle already exist case
          // alert(response.model.statusMessage);
        }

        swal({
          title: 'Result',
          text: response.model.statusMessage,
          type: this.type_val,
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          console.log("result value:->" + result.value);
          if (response.model.statusMessage !== 'Success' && result.value === true) {
            // this.removeModal();
            //alert("ok pressed & if executed")
          } else {
            // alert("ok pressed & else executed")

          }
        });



      } else {
        swal("Error in processing your request.");
      }

    }, error => {
      swal("Error in processing your request 400.");
    });
  }

  createCompany(compName) {
    console.log("company to be created:-> " + compName);
    //need to call the service from here to create brand.
    if (compName === "") {
      swal({
        title: '',
        text: 'Company Name is Mandatory',
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    } else {
      this.dataForCompCreation.name = compName;
      console.log("data name:-> " + this.dataForCompCreation.name);
      this.companyService.createCompany(this.dataForCompCreation).subscribe(response => {

        console.log("response received:-> " + response.model);
        if (response.didError === false) {
          this.type_val = 'success';
          this.prod.companyId = response.model.id;
          this.companyList = response.model.companyViewModels;
        }
        else
          this.type_val = 'warning';


        if (!response.didError) {
          // success case


          this.closeModal5();

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

              compName = "";
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
  createProductType(typeName) {
    console.log("typename :->" + typeName);

    if (typeName === "") {

      swal({
        title: '',
        text: 'Name is Mandatory',
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    } else {
      this.dataForProdTypeCreation.name = typeName;
      console.log("data name:-> " + this.dataForProdTypeCreation.name);
      this.prodTypeService.createProductType(this.dataForProdTypeCreation).subscribe(response => {

        console.log("response received:-> " + JSON.stringify(response));
        if (response.didError === false) {
          this.type_val = 'success';
          this.prod.itemTypeId = response.model.id;
          this.productTypeList = response.model.productTypeViewModels;
        }
        else
          this.type_val = 'warning';


        if (!response.didError) {
          // success case


          // here handle success case
          this.closeModal7();
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

            }
          });



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
}
