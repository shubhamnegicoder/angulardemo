import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateToService } from '../../Core/create-to.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { CommonService } from '../../Core/common.service';

@Component({
  selector: 'app-create-to',
  templateUrl: './create-to.component.html',
  styleUrls: ['./create-to.component.css']
})
export class CreateToComponent implements OnInit {

  date = new Date();
  fromLocation: String;
  toLocation: String;
  data: {};
  response: {};
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
  show2 = false;
  show3 = false;
  expired = true;
  notExpired = false;
  reason: String;
  stock;
  modal = false;
  expreason;
  today = new Date().toJSON().split('T')[0];
  constructor(private toservice: CreateToService, private router: Router,private commonService:CommonService) { }
  formdata = {
    'fromlocation': '',
    'tolocation': '',
    'expdate': '',
    'boxes': '',
    'remarks': ''
  };

  ngOnInit() {
    this.commonService.setTitle('IMS-Warehouse-Stock Transfer-Create Transfer Order');

    this.Updatevalue(null);
  }


  toggle1(e) {
    this.searchvalue = false;
    this.show1 = true;

  }
  toggle2() {
    this.searchvalue = false;
  }
  fromDropdownLocation(e) {
    this.dropdownFrom = e.target.value;
    console.log(this.dropdownFrom, 'from value');
  }
  toDropdownLocation(e) {
    console.log(this.dropdownFrom, 'from in to');
    const dropdownFrom = this.dropdownFrom;
    const dropdownTo = e.target.value;
    if (dropdownFrom === dropdownTo) {
      swal('Select Differrent Location');
    }
  }
  changeQuantity(e, searchItem) {
    console.log(e.target.value, 'qty');
    if (eval(e.target.value) > searchItem.customStock) {
      swal({
        type: 'warning',
        text: 'Quantity can not be more than Stock!!'
      });
      searchItem.quantity = 0;
    }

  }
  Updatevalue(event) {
    let totala = 0;
    // let qty1 ;
    let totalc = 0;
    for (let i = 0; i < this.submitfinalresponse.length; i++) {
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
    if (event == null) {
      this.selectedfinalresponse.forEach(item => {
        totalc += parseInt(item.quantity);
        totala += parseFloat(item.amount);

      });
    }
    (document.getElementById('TotalQuantity') as HTMLInputElement).value = totalc.toString();
    (document.getElementById('Amount') as HTMLInputElement).value = totala.toString();
  }

  addProduct(remarks, boxes, from, to) {

    if (!boxes || !remarks || !from || !to) {
      this.modal = false;
      swal({
        type: 'warning',
        text: 'Please fill the required fields!!'

      });
    } else {
      this.selectedfinalresponse = [];
      this.show1 = false;
      this.modal = true;
      this.showselected = false;
    }

  }
  close() {
    this.show1 = false;
    this.showselected = false;
    this.selectedfinalresponse = [];
    this.nameresponse = [];
  }

  transfertype(value) {
    if (value === '1') {
      this.fromLocation = 'Select Warehouse';
      this.toLocation = 'Select Location';
    }
    if (value === '2') {
      this.fromLocation = 'Select Location';
      this.toLocation = 'Select Warehouse';
    }
    if (value === '3') {
      this.fromLocation = 'Select Warehouse';
      this.toLocation = 'Select Warehouse';
    }
    if (value === '4') {
      this.fromLocation = 'Select Location';
      this.toLocation = 'Select Location';
    }

    this.data = {
      'transferType': value,
      'userId': 1
    };
    this.toservice.getToLocations(this.data).subscribe(res => {
      console.log(res, 'response from getToLocations');

      this.from = res.model.fromLocations;
      this.to = res.model.toLocations;
      console.log(this.from, 'fromlocations');
    });
  }

  auto(e) {
    const len = e.target.value.length;
    if (len >= 2) {
      this.toservice.auto(e.target.value).subscribe(res => {
        this.searchvalue = true;
        this.filteredresult = res.model;
        if (this.selectedfinalresponse.length !== 0) {
          console.log(this.filteredresult, 'selectedresponse');
          this.selectedfinalresponse.forEach((element) => {
            // alert(element.id+'in outer loop');
            this.filteredresult = this.filteredresult.filter(item => element.id !== item.id);

          });
        }
        if (this.submitfinalresponse.length !== 0) {
          console.log(this.filteredresult, 'selectedresponse');
          this.submitfinalresponse.forEach((element) => {
            // alert(element.id+'in outer loop');
            this.filteredresult = this.filteredresult.filter(item => element.id !== item.id);

          });
        }
        if (this.filteredresult != null && this.filteredresult.length !== 0) {
          this.searchvalue = true;

        } else {
          this.searchvalue = '';
          this.searchvalue = false;
        }
      });
    }
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
      this.toservice.searchItems(this.searchedData).subscribe(res => {
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
      this.toservice.searchItems(this.searchedData).subscribe(res => {
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

  }
  changeReason(e, searchItem) {
    if (e.target.value === 'Good Stock') {
      searchItem.reason = 'Good Stock';
      searchItem.customStock = searchItem.goodStock;
      searchItem.expiryDate = true;
      searchItem.showDate = 'NA';

      this.expired = true;
    } else if (e.target.value === 'Near Expiry') {
      console.log(this.nameresponse, 'nameresponse');
      searchItem.reason = 'Near Expiry';
      searchItem.expiryDate = false;
      searchItem.customStock = searchItem.nearToExpireQty;

    } else if (e.target.value === 'Expired') {
      searchItem.reason = 'Expired';
      searchItem.customStock = searchItem.expiredQty;
      searchItem.expiryDate = true;
      this.expired = true;
      searchItem.showDate = 'NA';


    } else if (e.target.value === 'Damaged') {
      searchItem.customStock = searchItem.damageQty;
      searchItem.reason = 'Damaged';
      searchItem.expiryDate = true;
      searchItem.showDate = 'NA';

    }

  }

  goselect(e) {
    if (this.selectedresponse.length !== 0) {
      this.nameresponse = [];
      this.showselected = true;
      this.selectedresponse.forEach((item) => {
        this.selectedfinalresponse.push(item);
        console.log(this.selectedfinalresponse, 'araay');
      });
      this.selectedresponse = [];

    } else if (this.selectedresponse.length === 0) {
      swal({
        type: 'warning',
        text: 'Select atleast one item'
      });
      // } else if (this.selectedfinalresponse.length !== 0) {
      //   this.selectedresponse.forEach((item) => {
      //     this.submitfinalresponse = this.submitfinalresponse.filter(element => element.id !== item.id);
      //     {
      //       this.submitfinalresponse.push(item);
      //     }

      //   });
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
  public singlecheck(e, id, qty) {

    if (e.target.checked === true) {
      if (qty == 0 || qty == null) {
        swal({
          'type': 'warning',
          'text': 'Quantity cannot be Null!!'
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
  selectbyname(name, date) {
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
    }
    else {
      this.selectedfinalresponse.forEach((item) => {
        this.submitfinalresponse.push(item);

        console.log(this.submitfinalresponse);
      });
      this.selectedresponse = [];
      this.show1 = false;
      this.showselected = false;
      this.selectedfinalresponse = [];
      this.nameresponse = [];
      this.searchresult = '';
      this.show3 = true;
      this.Updatevalue(null);
    }

  }
  removeitem(value) {
    this.submitfinalresponse.forEach((item) => {
      if (item.id === value) {
        const index = this.submitfinalresponse.indexOf(item);
        this.submitfinalresponse.splice(index, 1);
      }

    });
  }
  removeitem2(value) {
    this.selectedfinalresponse.forEach((item) => {
      if (item.id === value) {
        const index = this.selectedfinalresponse.indexOf(item);
        this.selectedfinalresponse.splice(index, 1);
      }

    });
  }
  back() {
    this.router.navigate(['/TransferOrder']);
  }

  submitTO(from, to, boxes, remarks) {
    let count = this.submitfinalresponse.length;

    this.submitfinalresponse.forEach(item => {
      if (item.quantity == 0) {
        count--;
        swal({
          'type': 'warning',
          'text': 'Quantity can not be null!'
        });
      } else if (parseInt(item.quantity) > parseInt(item.customStock)) {
        count--;
        swal({
          'type': 'warning',
          'text': 'Quantity can not be greater than Stock!'
        });
        item.quantity = 0;
      }
    });
    if (count === this.submitfinalresponse.length) {
      this.submitfinalresponse.forEach(item => {
        this.response = {
          'stock': item.customStock,
          'fromReason': item.reason,
          'expiryDate': item.showDate,
          'itemId': item.id,
          'uom': item.uom,
          'conversion': item.conversion,
          'quantity': item.quantity,
          'sessionId': ''
        };
        this.finalresponse.push(this.response);
        this.data1 = {
          'userId': 1,
          'fromWHId': from,
          'toWHId': to,
          'boxCount': boxes,
          'remarks': remarks,
          'tODetailRequestViewModels': this.finalresponse
        };
      });
    }

    this.toservice.createTO(this.data1).subscribe(res => {
      console.log(res, 'final response');
      if (!res.didError) {
        swal({
          'type': 'success',
          'text': 'Successfully Created TO !!'
        });
        this.router.navigate(['/TransferOrder']);
      }
      else if (this.submitfinalresponse.length === 0) {
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

    });
    this.selectedfinalresponse = [];
    this.show1 = false;
    this.showselected = false;

  }

}
