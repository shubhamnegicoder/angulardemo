import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TrnmismatchService } from '../Core/trnmismatch.service';
import { trnmismatch } from '../Core/interface';
import { PageService } from '../Core/page.service';
import swal1 from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../Core/common.service';

@Component({
  selector: 'app-trnmismatch',
  templateUrl: './trnmismatch.component.html',
  styleUrls: ['./trnmismatch.component.css']
})
export class TrnmismatchComponent implements OnInit {
  trigger: boolean = false;
  fromLocation: Array<trnmismatch> = [];
  toLocation: Array<trnmismatch> = [];
  trnmismatchList: Array<trnmismatch> = [];
  trnmismatchListArr: Array<any> = [];
  trnmismatchListArrLength: number = 0;
  pageSize: number = 10;
  totalRecords: number = 0;
  pager: any = {};
  pageNo: number = 1;
  data = {
    "status": "",
    "code": "",
    "date": "",
    "fromLocationId": "",
    "toLocationId": "",
    "transferType": "",
    "fromDate": "",
    "toDate": "",
    "sortName": "date",
    "sortType": "desc",
    "pageSize": 10,
    "pageNo": 1
  }
  @ViewChild('fromLoc') fromLoc: ElementRef;
  @ViewChild('toLoc') toLoc: ElementRef;
 
  constructor(private trnService: TrnmismatchService, private pageService: PageService, private spinner: NgxSpinnerService,private commonService:CommonService) { }

  ngOnInit() {
    this.commonService.setTitle('IMS-Reports-TRNMismatch');
    this.getLocationsInFilter();
    this.trnMismatchList(this.data);
    setTimeout(() => {
      this.spinner.hide();
  }, 5000);
  }

  /****************************  Function To Trigger The Filter  ******************************/
  public filterTrigger() {
    this.trigger = !this.trigger;
  }


  /****************************  Function To Get The List Of Locations In Filter  ******************************/
  public getLocationsInFilter() {
    this.trnService.getTRNLocations({ "userId": "1" }).subscribe(res => {
      if (res.didError === false) {
        let msg: string = '';
        if(res.model.fromLocations === null || res.model.fromLocations.length === 0){
         msg = 'No From Locations Found';
        }
        if(res.model.toLocations === null || res.model.toLocations === 0){
          msg = 'No To Locations Found';
        }
        if(msg != ''){
          swal1({type: 'warning',text: msg, showConfirmButton: true});
        } else {
            this.fromLocation = res.model.fromLocations;
            this.toLocation = res.model.toLocations;
        }
      }
    }
    );
  }


public resetfunction()
{
  this.data.fromLocationId=this.fromLoc.nativeElement.value=""
  this.data.toLocationId=this.toLoc.nativeElement.value="";
  this.trnMismatchList(this.data);
}
  /****************************  Function To Get The List Of TRN Mismatch  ******************************/
  public trnMismatchList(data) {
    this.spinner.show();
    this.trnService.getList(data).subscribe(res => {
      this.spinner.hide();
      if (res.didError === false) {
        this.totalRecords = res.totalRecord;
        this.trnmismatchList = res.model;
        for (let i = 0; i < res.model.length; i++) {
          this.trnmismatchListArrLength = res.model[i].transferReceiptNoteDetailViewModels.length;
          this.trnmismatchListArr = res.model[i].transferReceiptNoteDetailViewModels;
        }
        if (this.data.pageNo == 1) {
          this.firstPage(1);
        }
      } else {
        this.pageNo = 0;
        this.totalRecords = 0;
        swal1({
          type: 'warning',
          text: 'No Records Found',
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
    }
    );
  }

  /****************************  Function To Set The Page  ******************************/
  setPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.trnMismatchList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);

  }

  /****************************  Function To Set The First Page  ******************************/
  firstPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);
  }

  /****************************  Function To Set Page After Click On Pagination button ******************************/
  public optionpage(data) {
    this.pageSize = data.target.value;
    this.data.pageNo = 1
    this.data.pageSize = data.target.value;
    this.trnMismatchList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, 1, this.pageSize);
  }

  /****************************  Function To Search The Data  ******************************/
  searchdata(fromLoc, toLoc) {
    this.data.fromLocationId = fromLoc;
    this.data.toLocationId = toLoc;
    this.trnMismatchList(this.data);
  }

}
