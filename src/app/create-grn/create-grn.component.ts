import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '../../../node_modules/@angular/forms';
import { GrnService } from '../Core/grn.service';
import swal1 from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../Core/common.service';
// import {EventEmitter} from '@angular/common/src/facade/async';

// @Directive({ selector: '[myFocus]' })
@Component({
  selector: 'app-create-grn',
  templateUrl: './create-grn.component.html',
  styleUrls: ['./create-grn.component.css']
})

export class CreateGrnComponent implements OnInit {
  // @Input('myFocus') isFocused: boolean;
  createForm: FormGroup;
  warehouseList = [];
  vendorList = [];
  whId;
  poList = [];
  poSelected: boolean = false;
  today;
  idData;
  list = [];
  id;
  qty: number = 0;
  qty1;
  data;
  amount;
  amountSelected: boolean = false;
  totalAmount = 0;
  invoiceData;
  invoiceNo = 0;
  inward_qty;
  searched: boolean = false;
  listOfSearch;
  searchresult;
  searchResultId;
  searchResultName;
  searchedValue: boolean = false;
  text;
  id1;
  enteredQty;
  temp_totalQty_holder;
  data1 = {
    warehouse1: '',
    vendor1: '',
    po1: '',
    invoiceNo1: '',
    invoiceDate1: ''
  };
  maxDate;
  constructor(private grnService: GrnService,private commonService:CommonService,
     private formbuilder: FormBuilder, private router: Router, private spinner: NgxSpinnerService) { }
  // public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();
  ngOnInit() {
    this.commonService.setTitle('IMS-Warehouse-Inbound-Create GRN');
    let now = new Date();
    this.maxDate = now.toISOString().substring(0, 10);
    this.getWarehouseByPendingPo();
    this.today = new Date();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000); 
  }

  // ****************To get all warehouse in the dropdown *************************//
  getWarehouseByPendingPo() {
    this.grnService.getWarehouseForCreateGrn().subscribe(res => {
      if (res.didError === false) {
        this.warehouseList = res.model;
      }
      else {
        swal1({ type: 'warning', text: "Error in processing the request", showConfirmButton: true });
      }
    }, errRes => {
      swal1({ type: 'error', text: errRes.error.errorMessage, showConfirmButton: true });
    }
    );
  }

  // ****************To get all vendors in the dropdown *************************//
  selectWarehouse(data) {
    this.whId = data.target.value;
    this.grnService.getVendorForCreateGrn(this.whId).subscribe(res => {
      if (res.didError === false) {
        this.vendorList = res.model;
      }
      else {
        swal1({ type: 'warning', text: "Error in processing the request", showConfirmButton: true });

      }
    }, errRes => {
      swal1({ type: 'error', text: errRes.error.errorMessage, showConfirmButton: true });
    }
    );

  }

  // ****************To get all opened po in the dropdown*************************//
  getOpenPo() {
    if (this.data1.vendor1 == '') {
      swal1({ type: 'warning', text: "Please select a vendor first", showConfirmButton: true });
    }
    if (this.data1.warehouse1 == '') {
      swal1({ type: 'warning', text: "Please select a warehouse first", showConfirmButton: true });
    }
    if (this.data1.warehouse1 != '' && this.data1.vendor1 != '') {
      this.grnService.getOpenPo({ "userId": 1, "whId": this.data1.warehouse1, "vId": this.data1.vendor1 }).subscribe(res => {

        if (res.didError == false) {
          this.poList = res.model;
        }
        else {
          swal1({ type: 'warning', text: "Error in processing the request", showConfirmButton: true });
        }
      }, errRes => {
        swal1({ type: 'error', text: errRes.error.errorMessage, showConfirmButton: true });
      }
      );
    }
  }

  // ****************To get all the data in create form*************************//
  getDivOpen() {
    this.poSelected = true;
    this.idData = this.data1.po1;
    this.spinner.show();
    this.grnService.getDataForListInCreateGrn({ "requestedId": this.idData, "userId": 1 }).subscribe(res => {
      this.spinner.hide();
      if (res.didError == false) {
        this.list = res.model.purchaseOrderDetailViewModels;
      }
      else {
        swal1({ type: 'warning', text: "Error in processing the request", showConfirmButton: true });
      }
    }, errRes => {
      this.spinner.hide();
      swal1({ type: 'error', text: errRes.error.errorMessage, showConfirmButton: true });
    }
    );
  }

  // ****************To display a change in key up  *************************//
  keyUpQty(event, conversion, base) {
    var str = event.target.id;
    var id = str.substring(9);
    let inward_qty = event.target.value;
    let po_qty = (document.getElementById('po_qty' + id) as HTMLInputElement).value;

    var enteredQty = event.target.value;
    if (event.key === "Backspace") {
      this.temp_totalQty_holder = (document.getElementById('total_qty') as HTMLInputElement).value;
    } else {
      // this.qty += eval(enteredQty);
    }

    this.updateValues();
  }

  // ****************To update the values of inward quantity  *************************//
  updateValues() {
    this.qty = 0;
    this.totalAmount = 0;
    for (let i: number = 0; i < this.list.length; i++) {
      let column_qty = (document.getElementById('inwrdqty_' + i) as HTMLInputElement).value;
      if (column_qty === "")
        column_qty = "0";
      let a: number = (eval(column_qty) * this.list[i].conversion * this.list[i].basePrice);
      let temp = Math.round(a * 100) / 100;
      (document.getElementById('amt' + i) as HTMLInputElement).value = temp.toString();
      this.qty += eval(column_qty);
      this.totalAmount += (eval(column_qty) * this.list[i].conversion * this.list[i].basePrice);
    }

  }

  // ****************To display a change in key down  *************************//
  keyDownQty(event, amt) {
    var str = event.target.id;
    var id = str.substring(9);
    this.id = id;
  }

  // ****************To submit data to create a grn  *************************//
  submitData() {
    let keepGoing: boolean = true;
    if (this.data1.invoiceNo1 === "" || this.data1.invoiceNo1.trim() === "" || this.data1.invoiceDate1 === "" || this.data1.invoiceDate1.trim() === "") {
      swal1({
        type: 'warning',
        text: 'Please fill all the required fields',
        showConfirmButton: true
      });
      keepGoing = false;
    }
    if (keepGoing === true) {
      let isInwardqtyIsLess: boolean = false;
      let isPOQtyAvail: boolean = false;
      var ar = [];
      var tbl_rows = (document.getElementById("myTable") as HTMLTableElement).rows.length;
      for (let i = 0; i < tbl_rows - 1; i++) {
        this.id1 = i;
        var po_qty = (document.getElementById("po_qty" + i) as HTMLInputElement).value;
        var itemId1 = (document.getElementById("itemId_" + i) as HTMLInputElement).value;
        var quant1 = (document.getElementById('inwrdqty_' + i) as HTMLInputElement).value;
        var expiryDate1 = (document.getElementById('expiryDate' + i) as HTMLInputElement).value;
        if (quant1 === '' && quant1.trim() === '') {
          isInwardqtyIsLess = true;
          break;
        }
        if (po_qty < quant1) {
          isPOQtyAvail = true;
          break;
        }
        ar.push({ 'itemId': itemId1, 'quantity': quant1, 'itemExpiryDate': expiryDate1 });
      }
      if (isInwardqtyIsLess) {
        swal1({ type: 'warning', text: 'Inward QTY is required', showConfirmButton: true });
      } else {
        this.data = {
          "grnId": "0",
          "poId": this.data1.po1,
          "userId": "1",
          "invoiceNo": this.data1.invoiceNo1,
          "invoiceDate": this.data1.invoiceDate1,
          "gRNDetailRequests": ar 
        };

        if (isPOQtyAvail) {
          swal1({ type: 'warning', text: "Inward qty should be less than or equal to PO qty", showConfirmButton: true }).then((result) => {
            if (result.value) {
              console.log("this.id", this.id1);
              (document.getElementById('inwrdqty_' + this.id1) as HTMLInputElement).value = "";
              document.getElementById('inwrdqty_' + this.id1).focus();

            }
          });
        } else {
          this.spinner.show();
          this.grnService.submitData(this.data).subscribe(res => {
            this.spinner.hide();
            if (res.didError === false) {
              swal1({
                type: 'success',
                text: res.message,
                showConfirmButton: true
              }).then(result => {
                this.router.navigate(['/GRN']);
              });
            }
            else {
              swal1({ type: 'warning', text: "Error in processing the request", showConfirmButton: true });

            }
          }, errRes => {
            this.spinner.hide();
            swal1({ type: 'error', text: errRes.error.errorMessage, showConfirmButton: true });

          }
          );
        }

      }
    }

  }


  invoChange(data) {
    let invoiceData1 = data.target.value;
    this.invoiceData = invoiceData1;
  }

  // ****************To display a swal for greater quantity *************************// 
  change(event) {
    var str = event.target.id;
    var id = str.substring(9);
    var temp = document.getElementById('po_qty' + id) as HTMLInputElement;
    var po_qty = temp.value;
    this.enteredQty = event.target.value;
    if (eval(po_qty) < this.enteredQty) {
      swal1({ type: 'error', text: "Inward qty should be less than or equal to PO qty", showConfirmButton: true });

    } else {
      this.updateValues();
    }

    // if(event.key === 'Backspace'){
    //   if(this.qty > 0){
    //     console.log("backspace found but qty > 0, subtract previous added value");
    //     this.qty -= eval(this.inward_qty);
    //   } 

    // }else{
    //   this.qty += eval(enteredQty);
    // }
  }



  // searchevent(event){
  //   if(event.target.value.length >= 2){
  //     this.searched = true;
  //     this.grnService.searchedItem( event.target.value).subscribe(res=>{
  //       console.log("res in searchevent",res);
  //       this.listOfSearch = res.model;
  //       console.log("res.model in listOfSearch",this.listOfSearch);
  //     });
  //   }
  // }

  // searchevent1(event){
  //  // alert(event);

  //   this.searchresult = event.target.innerText;
  //   this.searched = false;
  //   this.searchResultId = event.target.id;
  //   //console.log(e, "inner");

  // }

  // searchList(event){
  //  // alert(event);
  // let data = {
  //   "itemName" : event,
  //   "userId" : "1"
  // };
  // this.searchedValue = true;
  // console.log("data in submit data of search list",data);
  // // this.grnService.searchdata(data).subscribe(res=>{
  // //   console.log("res in searchevent",res);
  // //   this.listOfSearch = res.model;
  // //   console.log("res.model in listOfSearch",this.listOfSearch);
  // // });


  // }

  // AddProduct(event){
  //   let grdId =  event.target.value;
  //   console.log("grdId",grdId);
  // }



}
