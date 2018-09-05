import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrnmismatchService } from '../Core/trnmismatch.service';
import swal1 from 'sweetalert2';
import { CommonService } from '../Core/common.service';

@Component({
  selector: 'app-releasetrnmismatch',
  templateUrl: './releasetrnmismatch.component.html',
  styleUrls: ['./releasetrnmismatch.component.css']
})
export class ReleasetrnmismatchComponent implements OnInit {
  trnId;
  oneTrnMismatch:any;
  ArrayOfOne = [];
  Status = '';
  id = 0;
  constructor(private route: ActivatedRoute,private commonService:CommonService,
    private trnService: TrnmismatchService, private router: Router) { }

  ngOnInit() {

    this.commonService.setTitle('IMS-Reports-TRNMismatch-Maintain TRNMismatch');

    this.trnId = this.route.snapshot.params['trnId'];
    this.getOneTrnMismatchById(this.trnId);
  }

  /****************************  Function To Get One TRN Mismatch  ******************************/
  public getOneTrnMismatchById(id) {
    let data = {
      "requestedId": id,
      "userId": 1
    };
    this.trnService.getOneTrnMismatch(data).subscribe(res => {
      console.log("res in getOneTrnMismatch",res);
      if (res.didError === false) {
        this.oneTrnMismatch = res.model;
        let status = res.model.status;
        if (status == 3) {
          this.Status = 'Closed';
        }
        if (status == 1) {
          this.Status = 'Open';
        }
        if (res.model.transferReceiptNoteDetailViewModels == null) {
          this.ArrayOfOne = [];
        } else {
          this.ArrayOfOne = res.model.transferReceiptNoteDetailViewModels;
          for (let obj of this.ArrayOfOne) {
            obj.action = "";
            obj.reason1 = "";
          }
        }
      } else {
        swal1({
          type: 'warning',
          text: "Error In Processing The Request",
          showConfirmButton: true
        });
      }
    }, err => {
      swal1({
        type: 'error',
        text: err.error.errorMessage,
        showConfirmButton: true
      });
    });
  }

  /****************************  Function To Release One TRN Mismatch  ******************************/
  public release(dataArray) {
    let ar = [];
    dataArray.forEach(item => {
      let trnDetailId1 = item.trnDetailId;
      let action1 = item.action;
      let quantity1 = item.quantity;
      let itemType1 = item.reason;
      let remark1 = item.reason1;
      ar.push({
        "trnDetailId": trnDetailId1,
        "action": action1,
        "quantity": quantity1,
        "itemType": itemType1,
        "remark": remark1
      });
    });
    let data = {
      "releasedBy": "1",
      "trnId": this.trnId,
      "releaseTRNDetailRequestModels": ar
    }
    let isAllValidationVerified = true;

    // use for loop here, and the moment you get action blank, set isAllValidationVerified flag & break the loop;
    for (let i = 0; i < data.releaseTRNDetailRequestModels.length; i++) {
      if (data.releaseTRNDetailRequestModels[i].action == "" && data.releaseTRNDetailRequestModels[i].action.trim() == "") {
        isAllValidationVerified = false;
        break;
      }
    }

    if (!isAllValidationVerified) {
      swal1({
        type: 'warning',
        text: "Action is required ",
        showConfirmButton: true
      });
    }
    else {
      swal1({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Release',
        cancelButtonText: 'Cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.trnService.releasedTrnMismatch(data).subscribe(res => {

            if (res.model.statusValue == 1) {
              swal1({
                type: 'success',
                text: "Trn Mismatch is released successfully",
                showConfirmButton: true
              });
              this.router.navigate(['/TRNMismatch']);
            } else if (res.model.statusValue == -2) {
              swal1({
                type: 'warning',
                text: "Trn Mismatch is already released ",
                showConfirmButton: true
              });
            } else if (res.model.statusValue == -1) {
              swal1({
                type: 'warning',
                text: "Not Able to release ",
                showConfirmButton: true
              });
            }else{
              swal1({
                type: 'warning',
                text: "Error in processing the request",
                showConfirmButton: true
              });
            }
            
          },err=>{
            swal1({
              type: 'error',
              text: err.error.errorMessage,
              showConfirmButton: true
            });
          }
          );
        } else if (result.dismiss === swal1.DismissReason.cancel) {
        }
      })
    }
  }
}
