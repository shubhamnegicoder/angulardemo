import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrnService } from '../Core/grn.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-view-grn',
  templateUrl: './view-grn.component.html',
  styleUrls: ['./view-grn.component.css']

})

export class ViewGrnComponent implements OnInit {
  grnId;
  viewList;
  viewArray;
  quantity;
  amount1;
  releasedDate;
  constructor(private route: ActivatedRoute, private grnService: GrnService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.grnId = this.route.snapshot.params['grnId'];
    this.getViewGrn(this.grnId);
    setTimeout(() => {
      this.spinner.hide();
    }, 5000); 
  }

  getViewGrn(id) {
    let data = {
      "requestedId": id,
      "userId": 1
    };
    this.spinner.show();
    this.grnService.getOneGrn(data).subscribe(res => {
      this.spinner.hide();
      if (res.didError === false) {
        this.viewList = res.model;
        this.viewArray = res.model.gRNDetailViewModels;

        let str = this.viewList.releasedOn;
        let releasedOn = str.substring(13);
        this.releasedDate = releasedOn;
        let netQty = 0;
        let netAmt = 0;
        for (let i = 0; i < this.viewArray.length; i++) {
          netQty += this.viewArray[i].quantity;
          netAmt += this.viewArray[i].netAmount;
          this.quantity = netQty;
          this.amount1 = netAmt;
        }
      } else {
        swal({ type: 'warning', text: "Error in processing the request", showConfirmButton: true });
      }
    }, err => {
      this.spinner.hide();
      swal({ type: 'error', text: err.error.errorMessage, showConfirmButton: true });
    })
  }
}
