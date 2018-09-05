import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesOrderService } from '../../Core/sales-order.service';
import swal from 'sweetalert2';
import { CreatePoService } from '../../Core/create-po.service';
import { CommonService } from '../../Core/common.service';
@Component({
  selector: 'app-edit-so',
  templateUrl: './edit-so.component.html',
  styleUrls: ['./edit-so.component.css']
})
export class EditSoComponent implements OnInit {
  soId = 0;
  response: any;
  showModal = false;
  totalQty = 0;
  totalAmt = 0;
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
  constructor(private route: ActivatedRoute, private commonService:CommonService,
    private salesOrderService: SalesOrderService, private router: Router, private poService: CreatePoService) {
    this.soId = this.route.snapshot.params['soId'];
    this.getSOById(this.soId);
  }

  ngOnInit() {
    this.commonService.setTitle('IMS-Machine-Sales Order-Edit Sales Order');

  }

  getSOById(soId) {
    let data = {
      'requestedId': soId,
      'userId': 1
    };
    this.salesOrderService.soById(data).subscribe(res => {
      this.response = res.model;
      this.totalQty = this.response.quantity;
      this.totalAmt = this.response.netAmount;

    }, errorResponse => {
      swal({ type: "error", text: errorResponse.error.errorMessage });
    });
  }
  openModal() {
    this.showModal = true;
  }
  deletePrevItem() {
    swal({ type: 'info', text: 'You can not delete earlier added items' });
  }
  checkQuantity(event) {
    this.totalQty = 0;
    this.totalAmt = 0;
    for (let item of this.response.salesOrderDetailViewModels) {
      this.totalQty += item.quantity;
      this.totalAmt += item.quantity * item.price;
    }
    if (this.salesOrderItemList.length != 0) {
      for (let i of this.salesOrderItemList) {
        this.totalQty += i.quantity;
        this.totalAmt += i.amount * i.quantity;
      }
    }
  }

  releaseSO() {
    let data = {
      'requestedId': this.soId,
      'userId': 1

    };
    swal({ type: 'warning', title: 'Are you sure to confirm the Order', text: 'Make sure you have saved all the changes', cancelButtonText: 'Cancel', confirmButtonText: 'Yes', showCancelButton: true }).then(result => {
      if (result.value) {
        this.salesOrderService.releaseSo(data).subscribe(response => {
          console.log(response);
          if (!response.didError) {

            swal({ type: 'success', text: 'Sales Order Released successfully' });
            this.router.navigate(['/SalesOrder']);
          } else {
            swal({ type: 'info', text: 'we are unable to release the SO as ' + response.message });
          }
        }, error => {
          swal({ type: 'error', text: error.error.errorMessage });
        });
      }
    });
  }

  autoCompleteSearch(event) {
    let searchKey = event.target.value.trim();

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
  cancelModal() {
    this.finalSelectionList = [];
    this.selectedDivShow = false;
    this.searchValue = false;
    this.showSelectedItems = false;
    this.searchName.nativeElement.value = '';
  }
  searchItem(name) {
    this.searchValue = false;
    let selectedItems = "";
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
      "whId": this.response.warehouseId,
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


    if (this.selectedItemList.length == 0) {
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

  submitSO() {
    let data = {
      "userId": "1",
      "whId": this.response.warehouseId,
      "customerId": this.response.customerId,
      "soId": this.soId,
      "sODetailRequestViewModels": [

      ]
    };
    this.finalSelectionList.forEach(item => {
      if (this.response.salesOrderDetailViewModels.filter(i => i.id == item.id) == 0) {
        data.sODetailRequestViewModels.push({ "itemId": item.id, "quantity": item.quantity, "sessionId": '' });
        this.salesOrderItemList.push(item);
      }

    });
    console.log(data);
    this.salesOrderService.saveSOItems(data).subscribe(response => {
      console.log(response);
      if (!response.didError) {
        swal({ type: 'success', text: response.message });
      } else {
        swal({ type: 'warning', text: response.message });
      }
    }, error => {
      swal({ type: 'error', text: error.error.errorMessage });
    });
  }

}
