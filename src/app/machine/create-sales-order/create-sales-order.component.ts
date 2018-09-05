import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SalesOrderService } from '../../Core/sales-order.service';
import { identifierModuleUrl } from '@angular/compiler';
import swal from 'sweetalert2';
import { PurchasedOrderService } from '../../Core/purchased-order.service';
import { CreatePoService } from '../../Core/create-po.service';
import { Router } from '@angular/router';
import { CommonService } from '../../Core/common.service';
@Component({
  selector: 'app-create-sales-order',
  templateUrl: './create-sales-order.component.html',
  styleUrls: ['./create-sales-order.component.css']
})
export class CreateSalesOrderComponent implements OnInit {
  today = new Date();
  locationList: Array<any> = [];
  customerList: Array<any> = [];
  salesOrderObj = {
    "userId": "1",
    "whId": "",
    "customerId": "",
    "soId": "",
    "sODetailRequestViewModels": [

    ]
  };
  totalQty = 0;
  totalAmt = 0;
  showModal = false;
  showSelectedItems = false;
  searchValue = false;
  searchResult = "";
  autoFillOptions: Array<any> = [];
  salesOrderItemList: Array<any> = [];
  searchedItemList: Array<any> = [];
  selectedItemList: Array<any> = [];
  finalSelectionList: Array<any> = [];
  selectAll = false;
  selectedDivShow = false;
  checkValue = false;
  @ViewChild('searchName') searchName: ElementRef;
  constructor(private salesOrderService: SalesOrderService, private commonService:CommonService,
     private poService: CreatePoService, private router: Router) { }

  ngOnInit() {

    this.commonService.setTitle('IMS-Machine-Sales Order-Create Sales Order');
    this.loadLocation();

  }
  loadLocation() {
    this.salesOrderService.getWareHouseList({ "userId": 1 }).subscribe(
      response => {
        this.locationList = response.model;
      }, error => { }
    );
  }
  getCustomers(event) {

    let locationId = event.target.value;

    let obj = {
      "subInvenotryId": locationId,
      "userId": "1"
    }
    this.salesOrderService.getCustomerByWarehouse(obj).subscribe(response => {
      this.customerList = response.model;

    }, errorResponse => {
      alert(errorResponse.error.errorMessage);
    })
  }
  checkEmptyField(locationId, customerId) {
    if (locationId == "" && customerId == "") {
      swal({ type: 'info', text: 'Location and Customer is required' });
      this.showModal = false;
    } else if (locationId == "") {
      swal({ type: 'info', text: 'Location is required' });
      this.showModal = false;
    } else if (customerId == "") {
      swal({ type: 'info', text: 'Customer is required' });
      this.showModal = false;
    }
    else {
      this.showModal = true;
    }
  }

  autoCompleteSearch(event) {
    let searchKey = event.target.value;
      alert(searchKey);
    if (searchKey.length >= 2) {
      this.poService.auto(searchKey).subscribe(response => {
        this.autoFillOptions = response.model;
        if (this.autoFillOptions.length > 0) {
          this.searchValue = true;

        }
      }, errorResponse => {
        swal({ type: 'error', text: 'Error occured while processing your request.Please try after sometime' });
      });
    }

  }

  searchevent(e) {

    this.searchResult = e.target.innerText;
    this.searchValue = false;
    //this.searchresultid = e.target.id;
  }
  searchItem(name) {
    this.searchValue = false;
    let selectedItems = "";
    alert(this.finalSelectionList.length);
    if (this.finalSelectionList.length >= 0) {
      for (let i = 0; i < this.finalSelectionList.length; i++) {
        if (i === (this.finalSelectionList.length - 1))
          selectedItems += this.finalSelectionList[i].id;
        else
          selectedItems += this.finalSelectionList[i].id + ",";
      }
    }
    let searchObj = {
      "itemName": name,
      "whId": this.salesOrderObj.whId,
      "selectedItems": selectedItems
    };


    this.salesOrderService.searchItem(searchObj).subscribe(response => {
      this.searchedItemList = response.model;
      this.showSelectedItems = true;
      console.log(this.searchedItemList);

    }, errorResponse => {

      swal({ type: 'error', text: errorResponse.error.errorMessage });
    });
  }

  selectAllItem(e) {
    if (e.target.checked === true) {
      this.selectAll = true;
      this.checkValue = true;
      this.searchedItemList.forEach(item => {
        this.selectedItemList.push(item);
      });

    } else {
      this.selectAll = false;
      this.checkValue = false;
      this.selectedItemList = [];


    }

  }

  checkQuantity(event, stock) {
    let qty = event.target.value;
    if (qty > stock) {

      swal({ type: 'info', text: 'Quantity can not be greater than stock' });
      event.target.value = stock;

    }
  }

  singleCheckBoxEvent(event, item, type) {
    if (type === 'search') {
      // if (item.quantity == 0) {
      //   alert('Please enter the quantity first');
      //   event.target.checked=false;
      // } else {
      //   if (event.target.checked === true) {
      //     this.selectedItemList.push(item);
      //   } else {
      //     this.selectedItemList = this.selectedItemList.filter(selectedItem => selectedItem.id !== item.id);
      //   }
      // }
      if (event.target.checked === true) {
        if (item.quantity == 0) {
          swal({ type: 'info', text: 'Item quantity cannot be 0' });
          //  event.target.checked = true;
          this.selectedItemList.push(item);
        } else {
          this.selectedItemList.push(item);
        }
      } else {
        for (let i = 0; i < this.searchedItemList.length; i++) {
          if (this.selectedItemList[i].id === item.id) {
            this.selectedItemList.splice(i, 1);
            break;
          }
        }
        console.log('selcted array after uncheck ' + this.selectedItemList);
      }
    }
  }
  selectButtonEvent() {
    this.selectAll = false;
    this.checkValue = false;


    if (this.selectedItemList.length === 0) {
      alert('Please select atleast one item to add');
    } else {

      for (let item of this.selectedItemList) {
        if (item.quantity == 0) {
          alert(item.name + " quantity cant be zero");
          this.finalSelectionList.push(item);
          break;
        } else if (this.finalSelectionList.filter(finalItem => finalItem.id === item.id).length === 0) {
          this.finalSelectionList.push(item);
          this.searchedItemList = this.searchedItemList.filter(i => i.id != item.id);
          console.log(this.searchedItemList);

        }
      }
      if (this.finalSelectionList.length != 0) {
        this.selectedDivShow = true;
      } else {
        this.selectedDivShow = false;
      }
    }
    // if (count === 1) {
    //   swal({ type: 'info', text: 'Item quantity can not be 0' });
    // }
    this.selectedItemList = [];

  }
  removeItem(item) {
    this.finalSelectionList = this.finalSelectionList.filter(selectedItem => selectedItem.id != item.id);
  }

  addSOItem() {
    this.totalQty = 0;
    this.totalAmt = 0;
    if (this.salesOrderItemList.length === 0) {
      this.salesOrderItemList = Array.from(this.finalSelectionList);
    } else {
      this.salesOrderItemList = this.salesOrderItemList.concat(this.finalSelectionList);

    }
    //this.totalQty = this.salesOrderItemList.map(item => item.quantity).reduce((prev, next) => prev + next);
    this.salesOrderItemList.forEach(item => {
      this.totalQty += item.quantity;
      this.totalAmt += item.price * item.quantity;
    });
    this.finalSelectionList = [];
    this.selectedDivShow = false;
    this.searchValue = false;
    this.showSelectedItems = false;
    this.searchName.nativeElement.value = '';
  }

  cancelModal() {
    this.finalSelectionList = [];
    this.selectedDivShow = false;
    this.searchValue = false;
    this.showSelectedItems = false;
    this.searchName.nativeElement.value = '';
  }
  createSo() {

    for (let item of this.salesOrderItemList) {
      this.salesOrderObj.sODetailRequestViewModels.push({
        'itemId': item.id,
        'quantity': item.quantity,
        'sessionId': ''

      });
    }
    // alert(JSON.stringify(this.salesOrderObj));
    this.salesOrderService.createSO(this.salesOrderObj).subscribe(response => {
      console.log(response);
      if (!response.didError) {
        swal({ type: 'success', text: response.message });
        this.router.navigate(['/SalesOrder']);
      } else {
        swal({ type: 'error', text: response.message + ' ' + response.errorMessage });
      }
    }, error => {
      swal({ type: 'error', text: error.error.errorMessage });
    });
  }
}





















































