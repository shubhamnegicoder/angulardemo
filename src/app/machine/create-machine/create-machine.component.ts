import { Component, OnInit } from '@angular/core';
import { LogUtils } from '../../log-utils';
import { MachineService } from '../../Core/machine.service';
import { CommonService } from '../../Core/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {


  warehouseList: Array<any> = [];
  cityList: Array<any> = [];
  countryList: Array<any> = [];
  stateList: Array<any> = [];

  type_val:any;
dataForMachineCreation={
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
  private spinner:NgxSpinnerService,private router:Router) { }

  ngOnInit() {
    this.commonService.setTitle('IMS-Machine-Create Machine');

    this.getSearchDataSelector();
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
        //alert("datatatatat");
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

  createMachine(){
    LogUtils.showLog("data to send for machine creation:-> "+JSON.stringify(this.dataForMachineCreation));

    this.spinner.show();
    this.machineService.createMachine(this.dataForMachineCreation).subscribe(res=>{
      this.spinner.hide();

      let msgToDisplay = "";
       
      if(!res.didError){
          msgToDisplay = "Successfully created customer."
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
         // alert("should navigate to machine listing")
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
