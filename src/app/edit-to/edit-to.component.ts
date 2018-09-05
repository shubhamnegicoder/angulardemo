import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditToService } from '../Core/edit-to.service';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert2';
import { CommonService } from '../Core/common.service';
import { AuthService } from '../Core/auth.service';

@Component({
  selector: 'app-edit-to',
  templateUrl: './edit-to.component.html',
  styleUrls: ['./edit-to.component.css']
})
export class EditToComponent implements OnInit {
  date = new Date();
  fromLocation: String;
  toLocation: String;
  data: {};
  data1: {};
  from: Array<any>;
  to: Array<any>;
  filteredresult: Array<any>;
  searchvalue;
  searchresult;
  searchresultid;
  show1 = false;
  searchedData;
  nameresponse: Array<any>;
  showselected;
  checkvalue;
  dropdownFrom;
  selectedresponse: Array<any> = [];
  finalresponse: Array<any> = [];
  selectedfinalresponse: Array<any> = [];
  submitfinalresponse: Array<any> = [];
  toData: any = {};
  previousitem: Array<any> = [];
  newresponse: Array<any> = [];
  show2 = false;
  show3 = false;
  expired = false;
  reason: String;
  stock;
  modal = false;
  transferOrderId;
  transferType;
  qty;
  transferOrderDetailId;
  status;
  released = false;
  today;
  username = "";



  constructor(private editToservice: EditToService, private router: Router, private route: ActivatedRoute,
  private commonService:CommonService) { }
  ngOnInit() {

    
    this.commonService.setTitle('IMS-Warehouse-Stock Transfer-Edit Transfer Order');
    this.transferOrderId = this.route.snapshot.params['id'];
    this.getToDetail({
      'requestedId': this.transferOrderId,
      'userId': 1
    });
  }
  toggle1() {
    this.searchvalue = false;
    this.show1 = true;

  }
  toggle2() {
    this.searchvalue = false;
  }
  searchevent(e, from, to, name) {
    this.searchvalue = false;
    this.show1 = true;
    this.searchresult = e.target.innerText;
    this.searchresultid = e.target.id;
    this.searchedData = {
      'itemName': name,
      'fromWHId': from,
      'toWHId': to,
      'selectedItems': ''
    };
    this.editToservice.searchItems(this.searchedData).subscribe(res => {
      console.log(res, 'response');
      this.nameresponse = res.model;
      console.log(this.nameresponse, 'selectedresponse');
      if (this.nameresponse === null) {
        swal({
          'type': 'warning',
          'text': 'No Records Fond!'
        });
      }
      if (this.selectedfinalresponse.length != 0) {
        this.selectedfinalresponse.forEach(element => {
          this.nameresponse = this.nameresponse.filter(item => element.id != item.id);
        });
      }
      if (this.submitfinalresponse.length != 0) {
        this.submitfinalresponse.forEach(element => {
          this.nameresponse = this.nameresponse.filter(item => element.id != item.id);
        });
      }

      console.log(this.nameresponse, 'nameresponse');

      for (let obj of res.model) {
        obj.reason = '';
        obj.expiryDate = '';
        obj.customStock = '';
        obj.showDate = '';
      }
    });
  }
  auto(e) {
    const len = e.target.value.length;
    if (len >= 2) {
      this.editToservice.auto(e.target.value).subscribe(res => {
        this.searchvalue = true;
        this.filteredresult = res.model;
        if (this.selectedfinalresponse.length !== 0) {
          this.selectedfinalresponse.forEach((element) => {
            // alert(element.id+'in outer loop');
            this.filteredresult = this.filteredresult.filter(item => element.id !== item.id);
          });
        }
        else if (this.newresponse.length !== 0) {
          this.newresponse.forEach((element) => {
            // alert(element.id+'in outer loop');
            this.filteredresult = this.filteredresult.filter(item => element.itemId !== item.id);

          });
        }
        else if (this.previousitem.length !== 0) {
          this.previousitem.forEach((element) => {
            this.filteredresult = this.filteredresult.filter(item => element.itemId !== item.id);
          });
        }
        if (this.filteredresult != null && this.filteredresult.length !== 0) {
          this.searchvalue = true;

        } else {
          swal('No record Found');
          this.searchvalue = '';
          this.searchvalue = false;
        }
      });
    }
  }

  toSearchList(from, to, name) {
    this.searchedData = {
      'itemName': name,
      'fromWHId': from,
      'toWHId': to,
      'selectedItems': ''
    };
    if (this.searchedData.itemName === '') {
      this.show1 = false;
      swal({
        type: 'warning',
        text: 'Enter a Name'
      });
    } else {
      this.editToservice.searchItems(this.searchedData).subscribe(res => {
        console.log(res, 'response');
        this.nameresponse = res.model;
        console.log(this.nameresponse, 'selectedresponse');
        if (this.nameresponse === null) {
          swal({
            'type': 'warning',
            'text': 'No Records Fond!'
          });
        }
        if (this.selectedfinalresponse.length != 0) {
          this.selectedfinalresponse.forEach(element => {
            this.nameresponse = this.nameresponse.filter(item => element.id !== item.id);
          });
        }
        if (this.newresponse.length != 0) {
          this.newresponse.forEach(element => {
            this.nameresponse = this.nameresponse.filter(item => element.id != item.id);
          });
        }
        if (this.previousitem.length != 0) {
          this.previousitem.forEach(element => {
            this.nameresponse = this.nameresponse.filter(item => element.id != item.id);
          });
        }

        console.log(this.nameresponse, 'nameresponse');

        for (let obj of res.model) {
          obj.reason = '';
          obj.expiryDate = '';
          obj.customStock = '';
          obj.showDate = '';
        }

      });
    }

  }
  public getToDetail(data) {
    this.editToservice.getToDetail(data).subscribe(res => {
      this.previousitem = res.model.transferOrderDetailViewModels;
      console.log(res, 'edit response', this.previousitem, 'old data');
      this.toData = res.model;
      console.log('this.toData',this.toData);
      if (res.model.status === '1') {
        this.status = 'Open';
      }
      if (res.model.status === '2') {
        this.status = 'Closed';
        this.released = true;
      }
      if (res.model.status === '3') {
        this.status = 'Released';
        this.released = true;
      }
      this.transferOrderDetailId = res.model.transferOrderDetailId;
      switch (res.model.transferType) {
        case '1':
          this.transferType = 'Warehouse To Location';
          break;
        case '2':
          this.transferType = 'Location To Warehouse';
          break;
        case '3':
          this.transferType = 'Warehouse To Warehouse';
          break;
        case '4':
          this.transferType = 'Location To Location';
          break;
      }
      console.log(this.toData, 'received data');
      this.previousitem.forEach((item) => {
        if (item.expiryDate === '0001-01-01T00:00:00') {
          // tslint:disable-next-line:no-unused-expression
          item.expiryDate = 'NA';
        }
      });
    });

  }
  changeReason(e, searchItem) {
    if (e.target.value == 'Good Stock') {
      searchItem.reason = 'Good Stock';
      searchItem.customStock = searchItem.goodStock;
      searchItem.expiryDate = true;
      searchItem.showDate = 'NA';


    } else if (e.target.value == 'Near Expiry') {
      console.log(this.nameresponse, 'nameresponse');
      searchItem.reason = 'Near Expiry';
      searchItem.expiryDate = false;

      searchItem.customStock = searchItem.nearToExpireQty;
    } else if (e.target.value == 'Expired') {
      searchItem.reason = 'Expired';
      searchItem.customStock = searchItem.expiredQty;
      searchItem.expiryDate = true;
      searchItem.showDate = 'NA';


    } else if (e.target.value == 'Damaged') {
      searchItem.customStock = searchItem.damageQty;
      searchItem.reason = 'Damaged';
      searchItem.expiryDate = true;
      searchItem.showDate = 'NA';


    }

  }
  removeitem2(value) {
    this.selectedfinalresponse.forEach((item) => {
      if (item.id === value) {
        const index = this.selectedfinalresponse.indexOf(item);
        this.selectedfinalresponse.splice(index, 1);
      }

    });
  }
  public singlecheck(e, id, qty, reason, stock) {
    if (e.target.checked === true) {
      if (qty == '0' || qty == null) {
        swal({
          type: 'warning',
          text: 'Select an item!!'
        });
        e.target.checked = false;
      } else {
        this.nameresponse.forEach((item) => {
          if (item.id === id) {
            this.selectedresponse.push(item);
          }
        });
      }
    }
    else if (e.target.checked === false) {
      this.nameresponse.forEach((item) => {
        if (item.id === id) {
          const index = this.selectedresponse.indexOf(item);
          this.selectedresponse.splice(index, 1);
        }
      });
      console.log(this.selectedresponse, 'finalarray');
    }

  }
  public checkbox(e) {
    if (e.target.checked === true) {
      this.checkvalue = true;
      this.selectedresponse = this.nameresponse;
    } else if (e.target.checked === false) {
      this.checkvalue = false;
      this.selectedresponse = [];
    }

  }
  goselect(e, qty) {
    if (this.selectedresponse.length != 0) {
      this.nameresponse = [];
      this.showselected = true;
      this.selectedresponse.forEach((item) => {
        this.selectedfinalresponse.push(item);
        console.log(this.selectedfinalresponse, 'araay');
      });
      this.selectedresponse = [];

    } else if (this.selectedresponse.length == 0) {
      swal({
        type: 'warning',
        text: 'Select atleast one item'
      });
    }

  }
  changeQuantity(e, searchItem) {
    console.log(e.target.value, 'qty');
    if (e.target.value == '') {
      swal({
        type: 'warning',
        text: 'Quantity can not be null!!'
      });
      e.target.value = '0';
      if (e.target.value == '0') {
        swal({
          type: 'warning',
          text: 'Select an item!!'
        });
      }
    }
    if (eval(e.target.value) > searchItem.customStock) {
      swal({
        type: 'warning',
        text: 'Quantity can not be more than Stock!!'
      });
      searchItem.quantity = '0';
      this.checkvalue = false;
    }

  }
  close() {
    this.show1 = false;
    this.showselected = false;
    this.selectedfinalresponse = [];
    this.nameresponse = [];
  }
  back() {
    this.router.navigate(['/TransferOrder']);
  }
  cantRemove() {
    swal({
      'type': 'warning',
      'text': 'This item cannot be deleted!'
    });
  }
  removeitem(value) {
    const data = {
      'requestedId': value,
      'userId': 1

    };
    this.editToservice.deleteTO(data).subscribe(res => {
      console.log(res, 'deleted');
      if (!res.didError) {
        swal({
          'type': 'warning',
          'title': 'Do you want to delete it?',
          'showCancelButton': true,
          'confirmButtonText': 'Yes,delete it!',
          'cancelButtonText': 'No, keep it'
        }).then((result) => {
          if (result.value) {
            swal({
              'type': 'success',
              'text': 'Successfully Deleted!'
            });
            this.newresponse.forEach((item) => {
              if (item.transferOrderDetailId === value) {
                const index = this.newresponse.indexOf(item);
                this.newresponse.splice(index, 1);

              }

            });
          } else if (result.dismiss === swal.DismissReason.cancel) {
            swal({
              'type': 'warning',
              'text': 'Item is not deleted!'
            });
          }

        });

      }
    });
  }
  release() {
    let data = {
      'requestedId': this.transferOrderId,
      'userId': 1
    };
    this.editToservice.releaseTO(data).subscribe((res) => {
      console.log(res, 'released response');

      if (!res.didError) {
        if (res.model.statusValue > 0) {
          swal({
            'title': 'Do you want to confirm this order?',
            'showCancelButton': true,
            'confirmButtonText': 'Yes',
            'cancelButtonText': 'No'
          }).then((result) => {
            if (result.value) {
              swal({
                'type': 'success',
                'text': 'Successfully Released!!'
              });
              this.router.navigate(['/TransferOrder']);
              this.released = true;
            }


          });

        }
        if (res.model.statusValue == -1) {
          swal({
            'type': 'warning',
            'text': 'Transfer Order is Already Released!!'
          });
        }
        if (res.model.statusValue == -3) {
          swal({
            'type': 'warning',
            'text': 'Error While Updating!!'
          });
        }
        if (res.model.statusValue == -2) {
          swal({
            'type': 'warning',
            'text': 'Stock is not availabale!!'
          });
        }


      }

    });
  }

  selectbyname(name) {
    this.searchresult = '';
    if (name === '') {
      this.show3 = false;
      swal({
        type: 'warning',
        text: 'Enter a Name'
      });
    }
    else if (this.selectedfinalresponse.length === 0) {
      console.log(this.selectedresponse, 'thisss response');
      swal({
        type: 'warning',
        text: 'Select atleast one item'
      });
    } else {
      this.selectedfinalresponse.forEach(item => {
        const response = {
          'itemId': item.id,
          'sessionId': '',
          'todId': '',
          'quantity': item.quantity,
          'uom': item.uom,
          'conversion': item.conversion,
          'stock': item.stock,
          'fromReason': item.reason,
          'expiryDate': item.showDate,
        };
        this.finalresponse.push(response);
      });
      const dataForEdit = {

        'userId': '1',
        'fromWHId': '',
        'toWHId': '',
        'toId': this.transferOrderId,
        'toiId': '',
        'boxCount': '',
        'remarks': '',
        'tODetailRequestViewModels': this.finalresponse
      };
      console.log(dataForEdit, 'edit datta');
      this.editToservice.insertToItems(dataForEdit).subscribe(res => {
        res.model.transferOrderViewModel.transferOrderDetailViewModels.forEach(item => {

          if (this.previousitem.filter(data => data.itemId === item.itemId).length === 0) {
            this.newresponse.push(item);
            swal({
              'type': 'success',
              'text': 'TO Added Successfully!'
            });
            this.newresponse.forEach(items => {
              if (items.expiryDate === '0001-01-01T00:00:00') {
                items.expiryDate = 'NA';
              }
            });
          } else {
            swal({
              'type': 'warning',
              'text': 'Item already exists'
            });
          }
        });
        // tslint:disable-next-line:no-unused-expression
        err => {
          swal({
            'type': 'warning',
            'text': 'Error While Processing!!,Kindly Try After Sometime '
          });
        };
      });
      // tslint:disable-next-line:no-unused-expression
    }
  }
  submitTO(boxes, remarks) {
    this.finalresponse = [];
    console.log(this.previousitem, 'old', this.newresponse, 'new');
    let count = 0;
    let countNew = 0;
    this.previousitem.forEach(item => {
      if (parseInt(item.quantity) > parseInt(item.availableQuantity)) {
        count++;
        swal({
          'type': 'warning',
          'text': 'Quantity can not be greater than Stock!'
        });
        item.quantity = 0;
      }
    });
    this.newresponse.forEach(item => {
      if (parseInt(item.quantity) > parseInt(item.availableQuantity)) {
        countNew++;
        swal({
          'type': 'warning',
          'text': 'Quantity can not be greater than Stock!'
        });
        item.quantity = 0;
      }
    });
    if (count === 0 && countNew === 0) {
      this.previousitem.forEach(item => {
        const response = {
          'quantity': item.quantity,
          'todId': item.transferOrderDetailId,
          'stock': item.availableQuantity,
          'fromReason': item.reason,
          'expiryDate': item.expiryDate,
          'itemId': '',
          'uom': item.uomId,
          'conversion': item.conversion,
          'sessionId': ''
        };
        this.finalresponse.push(response);
      });
      this.newresponse.forEach(item => {
        const response = {
          'quantity': item.quantity,
          'todId': item.transferOrderDetailId,
          'stock': item.availableQuantity,
          'fromReason': item.reason,
          'expiryDate': item.expiryDate,
          'itemId': '',
          'uom': item.uomId,
          'conversion': item.conversion,
          'sessionId': ''
        };
        this.finalresponse.push(response);
      });
      this.data1 = {
        'userId': '1',
        'fromWHId': '',
        'toWHId': '',
        'boxCount': boxes,
        'remarks': remarks,
        'toId': this.transferOrderId,
        'toiId': '',
        'tODetailRequestViewModels': this.finalresponse
      };
      this.editToservice.updateTO(this.data1).subscribe(res => {
        console.log(res, 'final response', this.data1, 'dataaaa jo service me gya');
        if (!res.didError) {
          swal({
            'type': 'success',
            'text': 'TO is Updated Successfully !!'
          });
          this.router.navigate(['/TransferOrder']);
        } else if (this.newresponse.length === 0) {
          swal({
            'type': 'warning',
            'text': 'Error while processing your request ,try again later'
          });

        }
        // tslint:disable-next-line:no-unused-expression
        err => {
          swal({
            'type': 'warning',
            'text': 'Error While Processing!!,Kindly Try After Sometime '
          });
        };
        this.selectedfinalresponse = [];
        this.show1 = false;
        this.showselected = false;
      });
    }
  }

  Updatevalue(event) {
    let totala = 0;
    // let qty1 ;
    let totalc = 0;
    for (let i = 0; i < this.previousitem.length; i++) {
      let column_qty = (document.getElementById('poc' + i) as HTMLInputElement).value;
      let column_amt = (document.getElementById('pop' + i) as HTMLElement).innerText;
      if (column_qty === '') {
        column_qty = '0';
      }

      if (column_amt === '') {
        column_amt = '';
      }
      totalc = totalc + parseInt(column_qty);
      totala = totala + parseFloat(column_amt);

    }
    for (let i = 0; i < this.newresponse.length; i++) {
      let column_qty = (document.getElementById('poc' + i) as HTMLInputElement).value;
      let column_amt = (document.getElementById('pop' + i) as HTMLElement).innerText;
      if (column_qty === '') {
        column_qty = '0';
      }

      if (column_amt === '') {
        column_amt = '';
      }
      totalc = totalc + parseInt(column_qty);
      totala = totala + parseFloat(column_amt);

    }
    (document.getElementById('TotalQuantity') as HTMLInputElement).value = totalc.toString();
    (document.getElementById('Amount') as HTMLInputElement).value = totala.toString();
  }
  addProduct() {
    this.show1 = false;
    this.showselected = false;
    this.selectedfinalresponse = [];
    this.nameresponse = [];
  }

}
