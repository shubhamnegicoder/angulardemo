import { Component, OnInit } from '@angular/core';
import { LogUtils } from '../../../log-utils';
import { CountryService } from '../../../Core/country.service';
import { PurchasedOrderService } from '../../../Core/purchased-order.service';
import { VendorModuleService } from '../../../Core/vendor-module.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonService } from '../../../Core/common.service';
@Component({
  selector: 'app-add-vend',
  templateUrl: './add-vend.component.html',
  styleUrls: ['./add-vend.component.css']
})
export class AddVendComponent implements OnInit {

  countryList:Array<any>;
  stateList:Array<any>;
  cityList:Array<any>;
  type_val:any;
  vendor = {
    "address1": "",
    "address2": "",
    "address3": "",
    "poBox": "",
    "phone": "",
    "countryName": "",
    "regionName": "",
    "cityName": "",
    "panNo": "",
    "gstno": "",
    "tinNo": "",
    "email": "",
    "alternateEmail": "",
    "contactPerson": "",
    "countryId": "",
    "regionId": "",
    "cityId": "",
    "userId": "1",
    "id": 0,
    "name": "",
    "isActive": 1
  }
  constructor(private countryService:CountryService,private router:Router,private commonService:CommonService,
    private pos:PurchasedOrderService,private vendorService:VendorModuleService) { }

  ngOnInit() {
    this.commonService.setTitle('IMS-Catalogue-Add Vendor');
    this.getCountryList();
  }


  onSubmit() {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.prod));
   LogUtils.showLog("vendor json:- "+JSON.stringify(this.vendor));

   this.vendorService.createVendor(this.vendor).subscribe(res=>{

    LogUtils.showLog("response received:-> "+JSON.stringify(res));
    let msgToDisplay = "";
   
    if(!res.didError){
        msgToDisplay = "Successfully Created Vendor."
        this.type_val = "success";
    }else if(res.didError){
      msgToDisplay = res.message
        this.type_val = "warning";
    }

    swal({
      title: 'Result',
      text: msgToDisplay,
      type: this.type_val,
      showCancelButton: false,
      confirmButtonText: 'OK'
    }).then((result) => {
      console.log("result value:->"+result.value);
      if(!res.didError && result.value === true){
        this.router.navigate(['/Vendor']);
      }else{
       // alert("ok pressed & else executed")
      
      }
    })

   },err=>{
    LogUtils.showLog("error received:-> "+JSON.stringify(err));
   });
  
  }


  public getCountryList(){
    let dataForGettingCountryList={
      "userId": "1"
    }
    this.countryService.getCountryList(dataForGettingCountryList).subscribe(res=>{
      this.countryList = res.model;
    });
  }


  selectCountry(event){
    let country_id = event.target.value;
   // alert("selected country id:-> "+country_id);

    this.pos.getRegionList(country_id,1).subscribe(res=>{
      this.stateList = res.model
    })
  }

  backBtnPressed(){

    this.router.navigate(['/Vendor']);
  }

  selectState(event){
    let state_id = event.target.value;
    //alert("selected state id:-> "+state_id);

    this.pos.getSearchCities(state_id).subscribe(res => {
      //console.log(res, 'statedata');
      this.cityList = res.model;
    })
  }


  
}
