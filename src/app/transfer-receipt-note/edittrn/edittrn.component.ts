import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferReceiptNoteService } from '../../Core/transfer-receipt-note.service';
import { CreatePoService } from '../../Core/create-po.service';
import swal from 'sweetalert';
import { CommonService } from '../../Core/common.service';

@Component({
  selector: 'app-edittrn',
  templateUrl: './edittrn.component.html',
  styleUrls: ['./edittrn.component.css']
})
export class EdittrnComponent implements OnInit {
  tRNDetailRequestViewModels: any;
  count: number;
  trnUpdateDetails: any;
  trnDetailsArray: any[];
  addeditem: Array<any> = [];
  selectedfinallist: Array<any> = [];
  showselected: boolean;
  checkvalue: boolean;
  abbs: boolean;
  trnId: any;
  responseModel: any;
  trnItems: Array<any> = [];
  modal: Boolean = true;
  trnTotalAmount: number = 0;
  trnTotalQuantity: number = 0;
  autoCompleteResultArray: Array<any> = [];
  searchValue: Boolean = false;
  modalSelectedArray: Array<any> = [];
  selectedresponse: Array<any> = [];
  searchResult: string = '';
  showSelectedItem: Boolean = false;
  data = {
    'trnId': '',
    'userId': '',
    'tRNDetailRequestViewModels': this.trnUpdateDetails
  };
  data2 = {
    'trnId': '',
    'userId': '',
    'tRNDetailRequestViewModels': []

  };
  released: boolean=false;
  status: any;
  releaseBy: any;
  releaseDate: any;
  constructor(private route: ActivatedRoute, private router: Router,private commonService:CommonService,
    private trnService: TransferReceiptNoteService, private poService: CreatePoService) { }

  ngOnInit() {
    this.commonService.setTitle('IMS-Warehouse-Stock Transfer-Edit Transfer Receipt Note');
    this.trnId = this.route.snapshot.params['trnId'];
    this.getTRNById(this.trnId);
  }

  getTRNById(trniD: number) {
    const data = {
      'requestedId': trniD,
      'userId': 0
    };
    this.trnService.getTRNById(data).subscribe(response => {
      if (!response.didError) {
        this.responseModel = response.model;
        this.trnItems = this.responseModel.transferReceiptNoteDetailViewModels;
        console.log(this.responseModel,"kya dikkat h beta");
        if(this.responseModel.status==3){
          this.released=true;
          this.releaseBy = this.responseModel.releasedByName;
          this.releaseDate = this.responseModel.releasedOn;
        }
        this.changeTRNItemQuantity(null);
      } else {
      
      }
    }, errors => { 
      swal(errors.error.errorMessage); });
  }

  
  changeTRNItemQuantity(event) {
    let totalQuantity = 0;
    let totalAmount = 0;
    for (let item of this.trnItems) {
      totalQuantity += parseInt(item.quantity);
      totalAmount += parseFloat(item.mrp) * parseFloat(item.quantity);

    }

    this.trnTotalAmount = totalAmount;
    this.trnTotalQuantity = totalQuantity;
  }

  modalAutoComplete(event) {
    let searchKey = event.target.value;
    if (searchKey.length >= 2) {

      this.poService.auto(searchKey).subscribe(response => {
        this.autoCompleteResultArray = response.model;

        if (this.trnItems.length !== 0) {
         
        this.autoCompleteResultArray = this.autoCompleteResultArray.filter(data=>!this.trnItems.includes(data.id));
         console.log(this.autoCompleteResultArray,"ppppppppppppppp");

        } else if (this.modalSelectedArray.length !== 0) {
          this.modalSelectedArray.forEach(item => {
            this.autoCompleteResultArray = this.autoCompleteResultArray.filter(data => data.id !== item.id);
          });

        }
        if (this.autoCompleteResultArray != null && this.autoCompleteResultArray.length !== 0) {
          this.searchValue = true;
        } else {
          swal('no record found');
          this.searchValue = false;
        }
      }, error => {
        this.searchValue = false;
        swal(error.errorMessage);
      });
    }

  }

  // ****************for select item event*************************
  searchevent(e) {
    this.searchResult = e.target.innerText;
    this.searchValue = false;
    this.searchItem(); 
  }


  searchItem() {
    let dataToBeSearched = {
      'itemName': this.searchResult,
      'trnId': this.trnId
    };
    this.trnService.searchTRNItems(dataToBeSearched).subscribe(response => {
      this.modalSelectedArray = response.model;
      this.showSelectedItem = true;
    }, error => {
      swal(error.errorMessage);
    });
  }

  changeReason(e, searchItem) {
    if (e.target.value == 'OK') {
      searchItem.customStock = searchItem.goodStock;
      
    } else if (e.target.value == 'Near Expiry') {


      searchItem.customStock = searchItem.nearToExpireQty;
        

    } else if (e.target.value == 'Expired') {

      searchItem.customStock = searchItem.expiredQty;
      
    } else if (e.target.value == 'Damaged') {
      searchItem.customStock = searchItem.damageQty;
     
    }

  }

  public checkbox(e) {
    this.abbs = true;
     if (e.target.checked === true) {
     // alert("first");
      this.modalSelectedArray.forEach((item) => {
            if(parseInt(item.quantity)== null || parseInt(item.quantity) > parseInt(item.customStock)){
              swal({
                title: 'Error!',
                text: 'please select stock type and at least 1 or less than stock qty',
                icon: 'warning',
              });
              e.target.checked = false;
              this.abbs = false;
            } else {
              this.checkvalue = true;
              this.selectedresponse = this.modalSelectedArray;
            }
      });
    } else if (e.target.checked === false) {
      this.checkvalue = false;
      this.selectedresponse = [];
    }
    // this.nameresponse=[];
  }

public singlecheck(e, value, val, stype, stock) {
    if (e.target.checked === true) {
      this.modalSelectedArray.forEach((item) => {
        if (item.id === value) {
            if (stype === '' || parseInt(val) === 0 || parseInt(val) > parseInt(stock)) {
              swal({
                title: 'Error!',
                text: 'please select stock type and at least 1 or less than stock qty',
                icon: 'warning',
              });
              e.target.checked = false;
            } else {
          this.selectedresponse.push(item);
            }
        }
      });
    } else if (e.target.checked === false) {
      this.modalSelectedArray.forEach((item) => {
        if (item.id === value) {
          let index = this.selectedresponse.indexOf(item.id);
          this.selectedresponse.splice(index, 1);
        }
    });
  }
  }

public goselect() {
    this.abbs = false;
    let count=0;
    this.checkvalue = false;
    if (this.selectedresponse.length !== 0) 
    {
        this.selectedresponse.forEach((item) =>
         {
          if (item.quantity == null) {
            count++;
            swal({
              title: "Error!",
              text: "please select valid quantity ",
              icon: "warning",
              // showCancelButton: false,
              // confirmButtonText: 'OK'
            })
          }
          else if (count == 0) {
            this.showselected = true;
            this.selectedresponse.forEach((item) => {
               if (this.selectedfinallist.filter(data => data.id === item.id).length === 0) {
                    this.selectedfinallist.push(item);
                  }
                  this.selectedresponse = [];
                  this.autoCompleteResultArray = [];
    });
  
        }
    else {
     swal({
      title: 'Error!',
      text: 'first select the atleast one item for PO',
      icon: 'warning',
    });
   }
  })
  } 
}

  changeQuantity(e, value) {
    // alert((e.target.value)+ "   " +value);
     if (parseInt(e.target.value) > parseInt(value) ) {
       e.target.value = 0;
       swal({
        title: 'Error!',
        text: "Quantity can't be greater than stock Quantity",
        icon: 'warning',
      });
     }
    }


public selectbyname(e) {
  console.log(this.selectedfinallist, 'final array for name submit');
      if (this.selectedfinallist.length !== 0) {
      //  this.toggle1();
      this.selectedfinallist.forEach((item) => {
        if (this.trnItems.filter(data => data.itemId === item.id).length === 0) {
          if(parseInt(item.quantity) > parseInt(item.customStock) || parseInt(item.quantity)==null) {
            swal({
              title: 'Error!',
              text:"Quantity can't be greater than stock Quantity and less than 1",
              icon: 'warning',
            });
          }
          else{
          this.addeditem.push(item);
          this.createDataForTRNinsert();
            this.data2.trnId = this.trnId;
            this.data2.userId = '1';
            this.data2.tRNDetailRequestViewModels = this.trnDetailsArray;
            this.trnService.addTRNitem(this.data2).subscribe(res => {
              console.log(res, 'after addddddddddddd itemmmmmmmmmm');
              res.model.transferReceiptNoteViewModel.transferReceiptNoteDetailViewModels
              .forEach(element => {
                 if (this.trnItems.filter(data => data.itemId === element.itemId).length==0 ) {
                   alert('push');
                  this.trnItems.push(element);
                  this.changeTRNItemQuantity(null);
                }
              });
        this.addeditem = [];
      });
      // this.ismodal=false;
      // this.show3=false;
      this.showselected = false;
      this.selectedfinallist = [];
          }
          }
      });

      }
      else {
        // this.ismodal=true;
      swal({
        title: 'Error!',
        text: 'selected item empty!! select atleast one item',
        icon: 'warning',
      });
      }
}


public createDataForTRNinsert() {
        this.trnDetailsArray = [];
        this.addeditem.forEach(item => {
          let createtrn = {
            'trnDetailId': '',
            'quantity': item.quantity,
            'reason': item.reason,
            'expiryDate': item.expiryDate,
            'itemId': item.id,
            'stock': item.customStock,
            'sessionId': ''
          };
          this.trnDetailsArray.push(createtrn);
        });
 }

 public submitTRN() {
        this.updateDataForTRNCreation();
         if (this.count === 0) {
          this.data.trnId = this.trnId;
          this.data.userId = '1';
          this.data.tRNDetailRequestViewModels = this.tRNDetailRequestViewModels;

          this.trnService.UpdateTRN(this.data).subscribe(res => {
            if (!res.didError) {
            swal({
              title: 'Success!',
              text: 'TRN update successfully',
              icon: 'success',
            });
            this.router.navigate(['/TransferReceiptNote']);
            } else {
               swal({
              title: 'Error!',
              text: 'Error while processing your request ,try again later',
              icon: 'warning',
            });
          }
          }), err => {
              alert('error in processing');
            }
        }
  }
  back(){
    this.router.navigate(['/TransferReceiptNote']);
  }

public updateDataForTRNCreation() {
        this.count = 0;
       this.tRNDetailRequestViewModels = [];
       for (let element of this.trnItems) {
         this.trnItems.forEach(item => {
         if(parseInt(item.quantity)>parseInt(item.availableQuantity) || parseInt(item.quantity)==null){
             swal({
               title: "Error!",
               text:"Quantity can't be greater than stock Quantity and less than 1",
               icon: "warning",
             });
            this.count++
           }
         });
         if (this.count === 0) {
         let updatetrn = {
          'trnDetailId': element.trnDetailId,
          'quantity': element.quantity,
          'reason': element.reason,
          'expiryDate': element.expiryDate,
          'itemId': element.itemId,
          'stock': '',
          'sessionId': ''
         };
         this.tRNDetailRequestViewModels.push(updatetrn);
         // this.noexecute=true;
       }
       }
     }

 public release() {
  this.released = true;
  this.trnService.releaseTrn({ requestedId: this.trnId, userId: 1 }).subscribe(res => { console.log("res in release", res);
  if(res.didError==false){
  this.status = res.model.status;
  this.releaseBy = res.model.transferReceiptNoteViewModel.releasedByName;
  this.releaseDate = res.model.transferReceiptNoteViewModel.releasedOn;
  // this.releaseDate = releaseDate.substring(13);
  }else{
    swal("Something Went Wrong");
  }
},err=>{
  swal(err.error.errorMessage);
}
);
}

}
