import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TransferOrderService } from '../Core/transfer-order.service';
import { PageService } from '../Core/page.service';
import { APP_SETTINGS } from '../Core/interface';
import { CommonService } from '../Core/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { DownloadService } from '../Core/download.service';
import { LogUtils } from '../log-utils';
@Component({
  selector: 'app-transfer-order',
  templateUrl: './transfer-order.component.html',
  styleUrls: ['./transfer-order.component.css']
})
export class TransferOrderComponent implements OnInit {

  pager: any = {};
  pageSize: number = 10;
  pageNo: number;
  totalRecords: number = 0;
  listDetail: Array<any>;
  filterDetails: Array<any>;
  show: boolean = false;
  data = {
    "status": "",
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
  constructor(private ts: TransferOrderService, private pageService: PageService, private cs: CommonService,
    private downloadService:DownloadService,private spinner: NgxSpinnerService) { }

    @ViewChild("TO") to:ElementRef;
    @ViewChild("flocation") flocation:ElementRef;
    @ViewChild("tlocation") tlocation:ElementRef;
    @ViewChild("dateto") dateto:ElementRef;
    @ViewChild("status") status:ElementRef;
    
  toggle() {
    this.show = !this.show;
  }
  public selectdetails() {
    this.cs.getwarehouse().subscribe(res => {
      //console.log(res, "filterdata in ts");
      this.filterDetails = res.model;
    })

  }
 public resetfunction()
 {
    this.data.fromLocationId=this.flocation.nativeElement.value=""
    this.data.toLocationId=this.tlocation.nativeElement.value=""
    this.data.status=this.status.nativeElement.value=""
    this.data.code=this.to.nativeElement.value=""
    this.data.date=this.dateto.nativeElement.value="";
    this.getTransferList(this.data);
 }
  public optionpage(data) {
    this.pageSize = data.target.value;
    this.data.pageNo = 1
    this.data.pageSize = data.target.value;
    this.getTransferList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, 1, this.pageSize);
  }
  ngOnInit() {
    this.cs.setTitle('IMS-Warehouse-Stock Transfer-Transfer Order');
    this.selectdetails();
    this.getTransferList(this.data);
  }
  
  public filterOption(TO, flocation, tlocation, status, date) {
    this.data.code = TO;
    this.data.fromLocationId = flocation;
    this.data.toLocationId = tlocation;
    this.data.status = status;
    this.data.date = date;
    this.setPage(1);

  }
  setPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.getTransferList(this.data);
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);

  }

  firstPage(page: number) {
    this.pageNo = page;
    this.data.pageNo = page;
    this.pager = this.pageService.getPager(this.totalRecords, page, this.pageSize);
  }



  public getTransferList(data) {
    this.ts.getTranferOrder(data).subscribe(res => {
       console.log(res, 'listdata');
      this.listDetail = res.model;
      this.totalRecords = res.totalRecord;
      if (data.pageNo == 1)
        this.firstPage(1);
    });

  }



  /****************************  Function To PrintPdf  ******************************/
  printToPdf(toId){
    
    let dataToSend = {
      "requestedId": toId,
      "userId": 1
    }
    this.spinner.show();
    this.cs.printPDF(dataToSend,'api/TransferOrder/PrintTO').subscribe(res=>{
          if(!res.didError){
            
            if(res.model.filePath != null && res.model.filePath != ""){

              let fileName = APP_SETTINGS.printBase_url+ res.model.filePath;
            
              
              let arr=fileName.split("/");
              let downloadedFileName=arr[arr.length-1];
              this.downloadService.downloadFile(fileName).subscribe(res=>{
                  if(res){
                    LogUtils.saveAsFile(res,downloadedFileName);
                    this.spinner.hide();
                  }
              });

            }else{
              this.spinner.hide();
            }
          }else{
            this.spinner.hide();
            swal({
              title: 'Result',
              text: res.message,
              type: 'error',
              showCancelButton: false,
              confirmButtonText: 'OK'
            });
          }
    },error=>{
      this.spinner.hide();
      swal({
        title: 'Result',
        text: error.error.errorMessage,
        type: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    });
  }
}
