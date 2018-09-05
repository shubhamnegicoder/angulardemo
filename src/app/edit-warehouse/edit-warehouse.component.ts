import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../Core/warehouse.service';
import {ActivatedRoute}from '@angular/router'
import { NgForm } from '../../../node_modules/@angular/forms';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { CommonService } from '../Core/common.service';

@Component({
  selector: 'app-edit-warehouse',
  templateUrl: './edit-warehouse.component.html',
  styleUrls: ['./edit-warehouse.component.css']
})
export class EditWarehouseComponent implements OnInit {
  warehouseid: any;
  warehouseform = {
    name: "",
    panNo: "",
    shippingGSTIN: "",
    shippingCINNo:"",
    isActive: "1",
    mainWarehouse:false,
    shippingCountryId:"",
    shippingStateId: "",
    shippingCityId: "",
    shippingEmail: "",
    shippingAddress1: "",
    shippingAddress2: "",
    shippingPOBox: "",
    shippingPhone: "",
    billingCountryId: "",
    billingStateId: "",
    billingCityId: "",
    billingEmail: "",
    billingAddress1: "",
    billingAddress2: "",
    billingPOBox:"",
    billingPhone: "" ,
    billingCINNo:"" ,
    billingGSTIN: "",
    userId:"1",
    id:"0 ",
    alternateBillingEmail:"",
    alternateShippingEmail:"",
    contactNumber:"",
    contactPerson:""
  };
  country:Array<any>;
  state: Array<any>;
  city: Array<any>;
  count: number;
  constructor(private warehousebyid:WarehouseService,private commonService:CommonService,
    private routes:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.commonService.setTitle('IMS-Warehouse-Add Warehouse');
    this.warehouseid=this.routes.snapshot.params["id"];
    this.getwarehousebyid({ "requestedId":this.warehouseid,"userId": 1});
    this.getallcountry();
  }

  public getwarehousebyid(data)
  {
    this.warehousebyid.getwarehousebyid(data).subscribe(res=>{
       console.log(res.model,"res")
         this.warehouseform.name=res.model.name;
         this.warehouseform.panNo=res.model.panNo;
         this.warehouseform.shippingGSTIN=res.model.shippingGSTIN;
         this.warehouseform.shippingCINNo=res.model.shippingCINNo;
         this.warehouseform.isActive=res.model.isActive;
         this.warehouseform.mainWarehouse=res.model.mainWarehouse;
         this.warehouseform.contactPerson=res.model.contactName;
         this.warehouseform.contactNumber=res.model.contactNumber;
        //  this.warehouseform.shippingCountryId=res.model.shippingCountryId;
        //  this.warehouseform.shippingStateId=res.model.shippingStateId;
        //  this.warehouseform.shippingCityId=res.model.shippingCityId;
         this.warehouseform.shippingEmail=res.model.shippingEmail;
         this.warehouseform.shippingAddress1=res.model.shippingAddress1;
         this.warehouseform.shippingAddress2=res.model.shippingAddress2;
         this.warehouseform.shippingPOBox=res.model.shippingPOBox;
         this.warehouseform.shippingPhone=res.model.shippingPhone;
         this.warehouseform.billingCountryId=res.model.billingCountryId;
         this.warehouseform.billingStateId=res.model.billingStateId;
         this.warehouseform.billingCityId=res.model.billingCityId;
         this.warehouseform.billingEmail=res.model.billingEmail;
         this.warehouseform.billingAddress1=res.model.billingAddress1;
         this.warehouseform.billingAddress2=res.model.billingAddress2;
         this.warehouseform.billingPOBox=res.model.billingPOBox;
         this.warehouseform.billingPhone=res.model.billingPhone;
         this.warehouseform.billingCINNo=res.model.billingCINNo;
         this.warehouseform.billingGSTIN=res.model.billingGSTIN;
         this.warehouseform.userId=res.model.userId;
         this.warehouseform.id=res.model.id;
         this.warehouseform.alternateShippingEmail=res.model.alternateShippingEmail;
         this.warehouseform.alternateBillingEmail=res.model.alternateBillingEmail;
  })
 }

 
 public submitform(data:NgForm)
    
 {    
  
       this.count=0;
       for(let keys in data.controls)
       { 
         //console.log(data.controls[keys].errors,"req")
        if(data.controls[keys].errors!=null)
        {
           if(data.controls[keys].errors.required==true)
           { 
               Swal({
                 title: 'Mandatory Feilds are Empty',
                 text: 'Error',
                 type: 'warning'
               })
             this.count+=1;
             
           }
        }

       } 
      // console.log(this.count,"count");
     
   if(this.count==0)
   {
      Swal({
    title: 'Are you sure?',
    text: 'warehouse details will be Updated !',
    type: 'warning',
    showCancelButton: true,
     confirmButtonText: 'Yes',
    cancelButtonText: 'No'
   }).then((result) => {
    if (result.value) {
    this.warehousebyid.updatewarehousebyid(data.value).subscribe(res=>{
         //  console.log(res,"swall");
           if(res.didError==false)
           {
           Swal(
            res.model.statusMessage )
          this.router.navigate(["/Warehouse"])
        }
        else if(res.didError=true)
        {
          Swal(
            res.message
        )
      }
      },error=>{
        Swal(error.error.message);
      })

    } 
    else if (result.dismiss === Swal.DismissReason.cancel) 
    {
      Swal(
        'Cancelled',
        'error'
      )
     }
    })
  
   }
  // console.log(data.value,"count");
   
  
 }

 public back()
 {
  this.router.navigate(['/Warehouse']);
 }
 public getallcountry()
 {
   this.warehousebyid.warehousecountry({"userId":'1'}).subscribe(res=>{
     //console.log(res.model,"response");
     this.country=res.model;
   })     
  }
  public selectstate(e){
    this.warehousebyid.warehousestate('1',e.target.value).subscribe(res=>{
      this.state=res.model;
     //console.log(res,"mody")
    })
  }
  public selectcity(e){
  
   this.warehousebyid.warehousecity('1',e.target.value).subscribe(res=>{
     this.city=res.model;
   // console.log(res,"mody")
   })
  }
  public checkevent(e){
    if(e.target.checked==true)
    {
      
   this.warehouseform.billingEmail =this.warehouseform.shippingEmail;
   this.warehouseform.billingCINNo= this.warehouseform.shippingCINNo;
   this.warehouseform.billingGSTIN=this.warehouseform.shippingGSTIN;
   this.warehouseform.billingAddress1 = this.warehouseform.shippingAddress1;
   this.warehouseform.billingAddress2= this.warehouseform.shippingAddress2;
   this.warehouseform.billingPOBox=this.warehouseform.shippingPOBox;
   this.warehouseform.billingPhone= this.warehouseform.shippingPhone;
   this.warehouseform.alternateBillingEmail=this.warehouseform.alternateShippingEmail
    }
  }
}
