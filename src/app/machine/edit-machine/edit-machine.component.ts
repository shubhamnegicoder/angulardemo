import { Component, OnInit } from '@angular/core';
import { LogUtils } from '../../log-utils';
import { MachineService } from '../../Core/machine.service';
import { CommonService } from '../../Core/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '../../../../node_modules/@angular/compiler/src/core';
@Component({
  selector: 'app-edit-machine',
  templateUrl: './edit-machine.component.html',
  styleUrls: ['./edit-machine.component.css']
})
export class EditMachineComponent implements OnInit {

  warehouseList: Array<any> = [];
  cityList: Array<any> = [];
  countryList: Array<any> = [];
  stateList: Array<any> = [];
  machineId:any;
  type_val:any;
editData={
  "userId": "1",
  "address1": "",
  "address2": "",
  "poBox": "",
  "phone": "",
  "regionId": "",
  "cityId": "",
  "countryId": "",
  "warehouseId": "",
  "warehouseName": "",
  "regionName": "",
  "cityName": "",
  "countryName": "",
  "id": 0,
  "name": "",
  "isActive": "1"
}

  constructor(private machineService:MachineService,private commonService:CommonService,
  private spinner:NgxSpinnerService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.commonService.setTitle('IMS-Warehouse-Machine-Edit Machine');

    this.machineId = this.route.snapshot.params['id'];
   // alert("machine id:-> "+this.machineId);
    this.getMachineDetails();
    LogUtils.showLog("this.editdata:-> "+JSON.stringify(this.editData));

    this.getSearchDataSelector();
  }


  // method to get the machine details from the received machine id


  getMachineDetails(){
    let dataToSend={
      "requestedId": this.machineId,
      "userId": 1
    }
    this.machineService.getMachineDetails(dataToSend).subscribe(res=>{

      if(!res.didError){
        this.editData = res.model;
       // LogUtils.showLog("this.editdata:-> "+JSON.stringify(this.editData));
      }else{
        swal({
          title: '',
          text: res.errorMessage,
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
                this.router.navigate(['/Machine']);          
        });

      }


    },err=>{

      swal({
        title: '',
        text: err.error.errorMessage,
        type: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK'
      }).then((result) => {
              this.router.navigate(['/Machine']);          
      });

    });


  }



  public getSearchDataSelector() {
    let dataToSend={
      "userId":1
    }
    this.machineService.getFilterOptionsData(dataToSend).subscribe(res => {
      if (res.didError == false) {
       // alert("data received");
        this.countryList = res.model.countries;
        this.stateList = res.model.regions;
        this.cityList = res.model.cities;
        this.warehouseList = res.model.warehouses;
      //  alert(JSON.stringify(this.warehouseList));
      }
      else {
       // alert("datatatatat");
        //swal("Something Went Wrong");
      }
    }, err => {
      swal(err.error.errorMessage);
      //swal("err.error.errorMessage");
    });

  }


  //selector onchange event methods

  countrySelector(data){
    let countryId = data.target.value;
    let userId  = 1;
    this.commonService.getRegionListFromCountryId(countryId,userId).subscribe(res => {
      if (res.didError == false) {
        this.stateList = res.model;
      } else {
        LogUtils.showLog("Something Went Wrong");
      }
    }, err => {
      LogUtils.showLog(err.error.errorMessage);
    });
  }

  /****************************  Function To Get City By State  ******************************/
  stateSelector(data) {
    let stateId = data.target.value;
    this.commonService.getCitiesFromStateId(stateId).subscribe(res => {
      if (res.didError == false) {
        this.cityList = res.model;
      } else {
        LogUtils.showLog("Something Went Wrong");
      }
    }, err => {
      LogUtils.showLog(err.error.errorMessage);
    });
  }

  /****************************  Function To Get State In Filter ******************************/
  cityselector(data) {
    
    let cityId = data.target.value;
    let userId = 1;
    this.machineService.getSubWareHouse(cityId,userId).subscribe(res => {
      if (res.didError == false) {
        this.warehouseList = res.model;
               // alert(JSON.stringify(this.warehouseList));

      } else {
        this.warehouseList = [];
        swal(res.errorMessage);
      }
    }, err => {
      this.warehouseList = [];
      swal(err.error.errorMessage);
    });
   
  }


  //func to create machine

  editMachine(){
    LogUtils.showLog("data to send for machine creation:-> "+JSON.stringify(this.editData));

    this.spinner.show();
    this.machineService.updateMachine(this.editData).subscribe(res=>{
      this.spinner.hide();

      let msgToDisplay = "";
       
      if(!res.didError){
          msgToDisplay = "Successfully updated."
          this.type_val = "success";
      }else{
        msgToDisplay = res.message;
        this.type_val = "warning";
      }

      swal({
        title: '',
        text: msgToDisplay,
        type: this.type_val,
        showCancelButton: false,
        confirmButtonText: 'OK'
      }).then((result) => {
        console.log("result value:->" + result.value);
        if (res.didError == true && result.value === true) {
          // this.removeModal();
          //alert("ok pressed & if executed")
        } else {
          // success case
          //alert("should navigate to machine listing")
          this.router.navigate(['/Machine']);
        }
      });

      // LogUtils.showLog(JSON.stringify(res));
    },err=>{
      this.spinner.hide();
      swal(err.error.errorMessage);
      
    })
  }

// back button pressed event method
  goBack(){
    //alert("back btn pressed");
    this.router.navigate(['/Machine']);  }

}
