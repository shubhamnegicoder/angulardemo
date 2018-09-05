import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TransferReceiptNoteService } from '../Core/transfer-receipt-note.service';
import { PageService } from '../Core/page.service';
import { CommonService } from '../Core/common.service';

@Component({
  selector: 'app-transfer-receipt-note',
  templateUrl: './transfer-receipt-note.component.html',
  styleUrls: ['./transfer-receipt-note.component.css']
})
export class TransferReceiptNoteComponent implements OnInit {

  pager: any = {};
  pageSize: number = 10;
  pageNo: number=1;
  totalRecords: number = 0;
  listDetail: Array<any>=[];
  filterDetails: Array<any>;
  show: boolean = false;

  constructor(private trs: TransferReceiptNoteService, 
    private pageService: PageService, private cs: CommonService) { }
  @ViewChild("TRN") trn:ElementRef;
  @ViewChild("flocation") flocation:ElementRef;
  @ViewChild("tlocation") tlocation:ElementRef;
  @ViewChild("date") date:ElementRef;
  @ViewChild("status") status:ElementRef;
  public  toggle() {
    this.show = !this.show;
  }
  public selectdetails() {
    this.cs.getwarehouse().subscribe(res => {
      //console.log(res, "filterdata in ts");
      this.filterDetails = res.model;
    });

  }
  public filterOption(TRN, flocation, tlocation, date,status) {
    this.data.code = TRN;
    this.data.fromLocationId = flocation;
    this.data.toLocationId = tlocation;
    this.data.date = date;
    this.data.pageNo = 1;
    this.data.status=status;
   // console.log(this.data, 'lolololo');
   this.getTransferReceiptList(this.data);

  }
  public optionpage(data) {
    this.pageSize = data.target.value;
    this.data.pageNo = 1
    this.data.pageSize = data.target.value;
    this.getTransferReceiptList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, 1, this.pageSize);
  }
  public resetfunction()
  {
    this.data.fromLocationId=this.flocation.nativeElement.value=""
    this.data.toLocationId=this.tlocation.nativeElement.value=""
    this.data.status=this.status.nativeElement.value=""
    this.data.code=this.trn.nativeElement.value=""
    this.data.date=this.date.nativeElement.value="";
    this.getTransferReceiptList(this.data);
  }
  ngOnInit() {
    this.cs.setTitle('IMS-Warehouse-Stock Transfer-Transfer Receipt Note');
    this.selectdetails();
    this.getTransferReceiptList(this.data);
  }
  data = {
    "status": " ",
    "code": "",
    "date": "",
    "fromLocationId": "",
    "toLocationId": "",
    "transferType": "",
    "sortName": "date",
    "sortType": "desc",
    "pageSize": 10,
    "pageNo": 1
  }

  setPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.getTransferReceiptList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);

  }

  firstPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);
  }



  public getTransferReceiptList(data) {
    this.trs.getTransferReceipt(data).subscribe(res => {
     console.log(JSON.stringify(res), 'listdata');
      this.listDetail = res.model;
      this.totalRecords = res.totalRecord;
      if (data.pageNo === 1) {
        this.firstPage(1);
      }
    });

  }


  

}
