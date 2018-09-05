import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrnService } from '../Core/grn.service';
import swal1 from 'sweetalert2';
import {  NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../Core/common.service';

@Component({
  selector: 'app-edit-grn',
  templateUrl: './edit-grn.component.html',
  styleUrls: ['./edit-grn.component.css']
})

export class EditGrnComponent implements OnInit {
  data;
  grnId;
  list1 = [];
  listToEdit = {
    "gdnId": "",
    "poId": "",
    "poCode": "",
    "date": "",
    "code": "",
    "warehouseName": "",
    "vendorName": "",
    "status": "",
    "invoiceNo": "",
    "releasedBy": "",
    "releasedOn": "",
    "invoiceDate": "",
    "netAmount": "",
    "gRNDetailViewModels": []
  }
  listToEdit1= [];
  quantity;
  amount1;
  released: boolean = false;
  searchedValue: boolean = false;
  searched: boolean = false;
  listOfSearch;
  searchresult;
  searchResultId;
  enteredQty;
  selectedfinallist: Array<any> = [];
  selectedresponse: Array<any> = [];
  select: boolean = false;
  checkvalue: boolean = false;
  showData: boolean = false;
  // searchClicked: boolean = false;
  // add:  boolean = true;
  abbs: boolean = false;
  search: Array<any> = [];
  id;
  inward_qty;
  releaseDate;
  releaseBy;
  status;
  data2 = {
    name1:''
  };
  minDate;
  constructor(private route: ActivatedRoute, private grnService: GrnService, private router: Router,private commonService:CommonService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.commonService.setTitle('IMS-Warehouse-Inbound-Edit GRN');
    this.grnId = this.route.snapshot.params['grnId'];
    this.getOneGrn(this.grnId);
    let now1 = new Date();
    this.minDate = now1.toISOString().substring(0, 10);
    setTimeout(() => {
      this.spinner.hide();
  }, 5000);
  } 


  // ****************To display a particular grn details to edit  *************************//
  public getOneGrn(data) {
    let dataToEdit = {
      "requestedId": data,
      "userId": 1
    }
    this.spinner.show();
    this.grnService.getOneGrn(dataToEdit).subscribe(res => {
      this.spinner.hide();
      if (res.didError === false) {
        this.listToEdit = res.model;
        this.listToEdit1 = res.model.gRNDetailViewModels;
        if(this.listToEdit1===null){
          swal1({ type: 'warning', text: "No Records Found", showConfirmButton: true })
          .then((result) => {
            this.router.navigate(['/GRN']);
          })
        }
        var netQty = 0;
        var netAmt = 0;
        for (let i = 0; i < this.listToEdit1.length; i++) {
          netQty += this.listToEdit1[i].quantity;
          netAmt += this.listToEdit1[i].netAmount;
          this.quantity = netQty;
          this.amount1 = netAmt;
        }
      } else {
        swal1({ type: 'warning', text: "Error in processing the request", showConfirmButton: true });
      }
    }, err => {
      this.spinner.hide();
      swal1({ type: 'error', text: err.error.errorMessage, showConfirmButton: true });
    });
  }

  // ****************  To call the auto complete service  *************************//
  public searchevent() {
    if (this.data2.name1.length >= 2) {
      this.searched = true;
      this.spinner.show();
      this.grnService.searchedItem(this.data2.name1).subscribe(res => {
        this.spinner.hide();
        if (res.didError == false) {
          this.listOfSearch = res.model;
        } else {
          swal1({ type: 'warning', text: "Error in processing the request", showConfirmButton: true });
        }
      }, err => {
        this.spinner.hide();
        swal1({ type: 'error', text: err.error.errorMessage, showConfirmButton: true });
      });
    }
  }

  // ****************To display the auto complete label  *************************//
  public searchevent1(event) {
    this.searchresult = event.target.innerText;
    this.searched = false;
    this.searchResultId = event.target.id;
    this.searchList( this.searchresult);
  }

  // ****************To display the searched items  *************************//
  public searchList(event) {
    this.searched = false;
    if (event === "" || event.trim() === "") {
      swal1({
        type: 'warning',
        text: "Please select an item",
        showConfirmButton: true
      });
    } else {
      this.data = {
        "itemName": event,
        "grnId": this.grnId,
        "userId": "1"
      };
      this.searchedValue = true;
      this.spinner.show();
      this.grnService.searchdata(this.data).subscribe(res => {
        this.spinner.hide();
        if (res.didError === false) {
          this.search = res.model;
          for (let obj of res.model) {
            obj.itemExpiryDate = '';
          }
          this.searchresult = "";
        } else {
          swal1({
            type: 'warning',
            text: "No records Found",
            showConfirmButton: true
          });
        }
      }, err => {
        this.spinner.hide();
        swal1({
          type: 'warning',
          text: err.error.errorMessage,
          showConfirmButton: true
        });

      });

    }
  }

  // ****************To submit the data after update *************************//
  public submitData(listToEdit) { 
    let nullQuantity: boolean = false;
    let greaterQuantity: boolean = false;
    for (let i = 0; i < listToEdit.gRNDetailViewModels.length; i++) {
      this.id = i;
      if (eval(listToEdit.gRNDetailViewModels[i].quantity) > eval(listToEdit.gRNDetailViewModels[i].poQuantity)) {
        if(eval(listToEdit.gRNDetailViewModels[i].poQuantity)>0){
          greaterQuantity = true;
          break;
        }
        else if(eval(listToEdit.gRNDetailViewModels[i].poQuantity)===0){
          greaterQuantity = false; 
        }
      }
    }

    if (greaterQuantity === true) {
      swal1({ type: 'warning', text: "Inward qty should be less than or equal to PO qty", showConfirmButton: true });
      (document.getElementById('inwrdqty_'+this.id) as HTMLInputElement).value = "";
      document.getElementById('inwrdqty_'+this.id).focus();
    }
    else {
      let ar = [];
      for (let i = 0; i < this.listToEdit1.length; i++) {
        let itemId = this.listToEdit1[i].itemId;
        let quantity = this.listToEdit1[i].quantity;
         let expiryDate1 = this.listToEdit1[i].itemExpiryDate;
         if( this.listToEdit1[i].quantity === null){
           nullQuantity = true;
           break;
         }
        ar.push({ itemId: itemId, quantity: quantity, itemExpiryDate: expiryDate1});
      }
      if(nullQuantity === true){
        swal1({ type: 'warning', text: "Inward qty is required", showConfirmButton: true });
      }else{
      let data = {
        "grnId": this.grnId,
        "poId": listToEdit.poId,
        "userId": "1",
        "invoiceNo": listToEdit.invoiceNo,
        "invoiceDate": listToEdit.invoiceDate,
        "gRNDetailRequests": ar
      };
     console.log("data in edit",data);
      this.spinner.show();
      this.grnService.submitData(data).subscribe(res => {
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
          swal1({
            type: 'warning',
            text: "Error in processing the request",
            showConfirmButton: true
          });
        }
      }, err => {
        this.spinner.hide();
        swal1({
          type: 'error',
          text: err.error.errorMessage,
          showConfirmButton: true
        });
      });
    }
    }
  }

  // ****************To release a GRN*************************//
  public release() {
    swal1({
      title: 'Are you sure?',
      text: 'You would not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, release it!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.grnService.releaseGrn({ requestedId: this.grnId, userId: 1 }).subscribe(res => {
          this.spinner.hide();
          if (res.didError == false) {
            this.released = true;
            this.status = res.model.status;
            this.releaseBy = res.model.releasedBy;
            let releaseDate = res.model.releasedOn;
            this.releaseDate = releaseDate.substring(13);
          }
          else {
            swal1({ type: 'warning', text: "Error in processing the request", showConfirmButton: true });
          }
        }, err => {
          this.spinner.hide();
          swal1({ type: 'error', text: err.error.errorMessage, showConfirmButton: true });
        });
      }
      else if (result.dismiss === swal1.DismissReason.cancel) {
      }
    });
  }

  // ****************To update the values of inward quantity  *************************//
  public updateValues() {
    this.quantity = 0;
    this.amount1 = 0;
    for (let i: number = 0; i < this.listToEdit1.length; i++) {
      let column_qty = (document.getElementById('inwrdqty_' + i) as HTMLInputElement).value;
      if (column_qty === "")
        column_qty = "0";
      let conversion = 1;
      let a: number = (eval(column_qty) * conversion * this.listToEdit1[i].basePrice);
      let temp = Math.round(a * 100) / 100;
      (document.getElementById('amt' + i) as HTMLInputElement).value = temp.toString();
      this.quantity += eval(column_qty);
      this.amount1 += (eval(column_qty) * conversion * this.listToEdit1[i].basePrice);
    }
  }

  // ****************To display a change in key up  *************************//
  public keyUpQty(event, conversion, base) {
    var str = event.target.id;
    var id = str.substring(9);
    let inward_qty = event.target.value;
    var enteredQty = event.target.value;
    this.updateValues();
  }


  // ****************To display a swal for greater quantity *************************// 
  public change(event) {
    var str = event.target.id;
    var id = str.substring(9);
    var temp = document.getElementById('po_qty' + id) as HTMLInputElement;
    var po_qty = temp.value;
    this.enteredQty = event.target.value;
    var Id = 'inwrdqty_' + id;
    if (eval(po_qty) > 0 && eval(po_qty) < this.enteredQty) {
      swal1({ type: 'warning', text: "Inward qty should be less than PO qty", showConfirmButton: true });
    }else{
      this.updateValues();
    }
  }


  // ****************To select a particular item *************************//
  public singlecheck(e, id) {
    if (e.target.checked === true) {
      this.search.forEach((item) => {
        if (item.id === id) {
          this.selectedresponse.push(item);
        }
      });
    }
    else if (e.target.checked === false) {
      this.search.forEach((item) => {
        if (item.id === id) {
          const index = this.selectedresponse.indexOf(item);
          this.selectedresponse.splice(index, 1);
        }
      });
    }
  }


  // ****************To select all checked items *************************//
  public goselect() {
    let isExpDate: boolean = false;
    for(let i=0;i<this.selectedresponse.length;i++){
      if(this.selectedresponse[i].itemExpiryDate === ""){
        isExpDate = true;
      }
    }
    if(isExpDate === true){
      swal1({type:'warning',text:'Expiry date is mandatory',showConfirmButton:true});
    }
    else{
    this.select = true;
    this.showData = true;
    this.abbs = false;
    this.checkvalue = false;
    if (this.selectedresponse.length != 0) {
      this.selectedresponse.forEach((item) => {
        if (this.selectedfinallist.filter(data => data.id == item.id).length == 0) {
          this.selectedfinallist.push(item);
          let index = this.selectedresponse.indexOf(item);
          this.search.splice(index, 1);
        }
        this.selectedresponse = [];
      })

    }
    else {
      swal1({
        type: 'warning',
        text: "Please select atleast one item ",
        showConfirmButton: true
      });
    }
    this.searchresult = "";
  }
  }


  // ****************To select all items from one checkbox*************************//
  public checkbox(e) {
    this.abbs = true;
    if (e.target.checked === true) {
      this.checkvalue = true;
      this.search.forEach(item => {
        this.selectedresponse.push(item);
      })
    } else if (e.target.checked === false) {
      this.checkvalue = false;
      this.selectedresponse = [];
    }
  }

  // ****************To remove item from selected list*************************//
  public delete(value) {
    this.selectedfinallist.forEach((item) => {
      if (item.id == value) {
        let index = this.selectedfinallist.indexOf(item);
        this.selectedfinallist.splice(index, 1);
      }
    })
  }


  // ****************To add item of selected list to database*************************//
  public addItem(data) {
    let ar = [];
    data.forEach((itemdata) => {
      var itemId = itemdata.id;
      var quant = itemdata.quantity;
      var expDate = itemdata.itemExpiryDate;
      ar.push({ 'itemId': itemId, 'quantity': quant,'itemExpiryDate': expDate});
    });
    if (ar.length === 0) {
      swal1({ type: 'warning', text: "Please select an item to add", showConfirmButton: true });
    } else {
      let data1 = {
        "grnId": this.grnId,
        "userId": "1",
        "gRNDetailRequests": ar
      }
      swal1({
        title: 'Are you sure?',
        text: 'You would not be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!'
      }).then((result) => {
        if (result.value) {
          this.spinner.show();
          this.grnService.addItemToList(data1).subscribe(res => {
            this.spinner.hide();
            if (res.didError === false) {
              this.list1 = res.model.gRNDetailViewModels;
              this.listToEdit1 = [];
              this.listToEdit1 = this.list1;
              swal1({
                type: 'success',
                text: 'Item added successfully',
                showConfirmButton: true
              }
              );
              this.search = [];
            this.selectedresponse = [];
            this.selectedfinallist = [];
            this.searchedValue = false;
            
            } else {
              swal1({
                type: 'warning',
                text: 'Error in processing the request',
                showConfirmButton: true
              });
            }
          }, err => {
            this.spinner.hide();
            swal1({
              type: 'error',
              text: err.error.errorMessage,
              showConfirmButton: true
            }
            );
          });
        } else if (result.dismiss === swal1.DismissReason.cancel) {
        }
      })
    }
  }

  // ****************To cancel the modal*************************//
 public cancelButton(){
  this.search = [];
  this.selectedresponse = [];
  this.selectedfinallist = [];
  this.searchedValue = false;

 }
  
}