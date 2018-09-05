import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../../Core/country.service';
import { VendorModuleService } from '../../../Core/vendor-module.service';
import { PurchasedOrderService } from '../../../Core/purchased-order.service';
import { LogUtils } from '../../../log-utils';
import swal from 'sweetalert2';
import { CommonService } from '../../../Core/common.service';

@Component({
  selector: 'app-edit-vend',
  templateUrl: './edit-vend.component.html',
  styleUrls: ['./edit-vend.component.css']
})
export class EditVendComponent implements OnInit {
vId:any;
countryList:Array<any>;
  stateList:Array<any>;
  cityList:Array<any>;
  type_val:any;
  vendorDetails:any;
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

  constructor( private route: ActivatedRoute,private router:Router,private commonService:CommonService,
    private pos:PurchasedOrderService,private vendorService:VendorModuleService) { }

  ngOnInit() {
    this.commonService.setTitle('IMS-Catalogue-Edit Vendor');
    this.vId = this.route.snapshot.params['vid'];
   // alert("vid:-> "+this.vId);
    this.getCountryList();
    this.getVendorDetails();
  }


  getVendorDetails(){
    let dataToSend={
      "requestedId": this.vId,
      "userId": "1"
    }
    this.vendorService.getVendorDetails(dataToSend).subscribe(res=>{

      if(!res.didError){
        this.vendor = res.model
      }
      LogUtils.showLog("vendor details:-> "+JSON.stringify(this.vendor));
    },err=>{

    })
  }

  backBtnPressed(){

    this.router.navigate(['/Vendor']);
  }
  // method to update vendor
  onSubmit() {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.prod));
   LogUtils.showLog("vendor json:- "+JSON.stringify(this.vendor));

   this.vendorService.updateVendor(this.vendor).subscribe(res=>{

    LogUtils.showLog("response received:-> "+JSON.stringify(res));
    let msgToDisplay = "";
   
    if(!res.didError ){
        msgToDisplay = "Successfully Updated Vendor."
        this.type_val = "success";
    }else{
      msgToDisplay = res.message;
      this.type_val = "error";
    }

    swal({
      title: 'Result',
      text: msgToDisplay,
      type: this.type_val,
      showCancelButton: false,
      confirmButtonText: 'OK'
    }).then((result) => {
      console.log("result value:->"+result.value);
      if(res.model.statusMessage !==  'Successfully Updated' && result.value === true){
      
      }else{
       // alert("ok pressed & else executed")
       this.router.navigate(['/Vendor']);
      }
    })

   },err=>{
    LogUtils.showLog("error received:-> "+JSON.stringify(err));
   });
  
  }


  public getCountryList(){
  
    this.pos.getSearchData().subscribe(res=>{
      this.countryList = res.model.countries;
      this.stateList = res.model.regions;
      this.cityList = res.model.cities
    });
  }

 

  selectCountry(event){
    let country_id = event.target.value;
   // alert("selected country id:-> "+country_id);

    this.pos.getRegionList(country_id,1).subscribe(res=>{
      alert(res.model.length);
      this.stateList = res.model
    })
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
