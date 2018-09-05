import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { WarehouseService } from '../Core/warehouse.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {startWith} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';
import { CommonService } from '../Core/common.service';
export interface User {
  name: string;
}
@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css']
})

export class AddWarehouseComponent implements OnInit {
  country:Array<any>;
  state: Array<any>;
  city:Array<any>;
  count:number=0;
  allformvalue:boolean;
  shippingemail:string="";
  shippingcino:string="";
  shippinggistin:string="";
  shippingadd1:string="";
  shippingadd2:string="";
  shippingpobox:string="";
  shippingphone:string="";
  billingemail:string="";
  billingcino:string="";
  billinggistin:string="";
  billingadd1:string="";
  billingadd2:string="";
  billingpobox:string="";
  billingphone:string="";
  warehouseform = {
    name: "",
    panNo: "",
    shippingGSTIN: "",
    shippingCINNo:"",
    isActive: "1",
    mainWarehouse:false,
    shippingCountryId:'',
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
    alternateShippingEmail:"",
    alternateBillingEmail:"",
    contactNumber:"",
    contactPerson:"",
  };
  myControl = new FormControl();
 
  //options:any[] = [];
 
  filteredCountryOptions: Array<any>;
  constructor(private warehouse:WarehouseService,private router:Router,private commonService:CommonService) {
  
  }

  ngOnInit() {
    this.commonService.setTitle('IMS-Warehouse-Add Warehouse');
    this.getallcountry();
    
   
  }
  displayFn(value): string | undefined {
    console.log(value,"display")
    
    return value && typeof value === 'object' ? value.name : value;
  }

  private _filter(country: any[], val: string) {
    const filterValue = val.toLowerCase();
    console.log(filterValue,"filtu")

    return country.filter(country => country.name.toLowerCase().startsWith(filterValue));;
  }
 
  
 public autocomplete(val:string)
 {
   console.log(val,"value");
  return val ? this._filter(this.country, val) : this.country;
   
 }

 public back()
 {
  this.router.navigate(['/Warehouse']);
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
     text: 'warehouse details will be submitted !',
     type: 'warning',
     showCancelButton: true,
      confirmButtonText: 'Yes',
     cancelButtonText: 'No'
    }).then((result) => {
     if (result.value) {
     this.warehouse.addwarehouse(data.value).subscribe(res=>{
            console.log(res,"swall",data.value);
            if(res.didError==false)
            {
            Swal(
             res.model.statusMessage
           )
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
     
    // Swal({
    //   title: 'Are you sure?',
    //   text: 'warehouse details will be submitted !',
    //   type: 'warning',
    //   showCancelButton: true,ggfd 
    //   confirmButtonText: 'Yes',
    //   cancelButtonText: 'No'
    // }).then((result) => {
    //   if (result.value) {
    //   this.warehouse.addwarehouse(data.value).subscribe(res=>{
    //          console.log(res,"swall");
    //          if(res.didError==false)
    //          {
    //          Swal(
    //           res.model.statusMessage,
    //           'success'
    //         )
    //       }
    //       else if(res.error.didError=true)
    //       {
    //         Swal(
    //           res.model.statusMessage,
    //           'failed'
    //         )
    //       }
    //     },error=>{
    //       Swal(
    //         error.error.message
    //       )

    //     })
       
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     Swal(
    //       'Cancelled',
    //       'error'
    //     )
    //   }
    // })
   
  }
  public getallcountry()
  {
    this.warehouse.warehousecountry({"userId":'1'}).subscribe(res=>{
     // console.log(res.model,"response");
      this.country=res.model;
      //this.options=res.model;
      
    })     
   }
   public selectstate(e){
    
     this.warehouse.warehousestate('1',e.target.value).subscribe(res=>{
       this.state=res.model;
     // console.log(res,"mody")
     })
   }
   public selectcity(e){
   
    this.warehouse.warehousecity('1',e.target.value).subscribe(res=>{
      this.city=res.model;
     //console.log(res,"mody")
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
