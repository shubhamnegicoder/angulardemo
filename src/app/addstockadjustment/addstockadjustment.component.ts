import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AddstockadjustmentService } from '../Core/addstockadjustment.service';
import { CreatePoService } from '../Core/create-po.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { NgForm } from '../../../node_modules/@angular/forms';
import { CommonService } from '../Core/common.service';
@Component({
  selector: 'app-addstockadjustment',
  templateUrl: './addstockadjustment.component.html',
  styleUrls: ['./addstockadjustment.component.css']
})
export class AddstockadjustmentComponent implements OnInit {
  warehouse:Array<any>;
  time: any = new Date();
  filterdresult: Array<any>=[];
  searchresult: string;
  searchvalue: boolean=true;
  searchresultid:string;
  show3: boolean=false;
  searchresponse: Array<any>=[];
  allchecked: boolean=false;
  singlecheck:boolean=false;
  selectedresponse:Array<any>=[];
  showselected: boolean=false;
  selectedfinallist: Array<any>=[];
  temp: any[];
  selectedstockvalue: string;
  qty: number=0;
  showdate: boolean=false;
  transfromvalue:string=""
  transtovalue:string=""
  addeditem: Array<any>=[];
  showModal:boolean=false;
  checkvalidation: boolean=false;
  showaddeditem: boolean=false;
  totalqty:number=0;
  expireddate:any="";
  warehouseid=0;
  remarks:string="";
 
;
  constructor(private stockadjustment:AddstockadjustmentService,private commonService:CommonService,
    private itemlist:CreatePoService,private router:Router) { }
 @ViewChild("name")name :ElementRef;

  ngOnInit() {
    this.commonService.setTitle('IMS-Warehouse-Stock Transfer-Add Stock Adjustment');
    this.getwarehouse();
  }

  public getwarehouse(){

    this.stockadjustment.getsawarehouse().subscribe(res => {
      this.warehouse = res.model;
 
   })
 }
  public auto(e) {
   
    let len = e.target.value.length;
    if (len >= 2) {
      this.searchvalue=true;
      this.itemlist.auto(e.target.value).subscribe(res => {
        this.filterdresult = res.model;
      })
    }
    else
    {
      this.filterdresult=[];
    }
  
  }
  public searchevent(e,whId) {
    this.searchresult = e.target.innerText;
    this.searchvalue = false;
    this.searchresultid = e.target.id;

    this.transfromvalue="",this.transtovalue=""
    if(e.target.innerText.replace(/\s/g, "").length>=2)
    { 
      this.stockadjustment.getallsaitems({"itemName":e.target.innerText,"whId":whId,"selectedItems":""}).subscribe(res=>{
       this.searchresponse=res.model
         this.show3=true;
       if (this.selectedfinallist.length != 0) {
        this.selectedfinallist.forEach((element) => {
          res.model = res.model.filter(item => element.id !== item.id);
          
       })
    
       this.searchresponse=res.model
 
    }
      if(this.addeditem.length!=0){
        this.addeditem.forEach((element)=>{
       

          res.model=res.model.filter(item => element.itemId !== item.id.toString())
          })
          this.searchresponse=res.model
     
      }
    })
         
   
   }
  else{
  
    swal({
     title: "Error!",
     text: "name character should be greater than 2",
     type: "warning",
   });
  }
    for(let obj of this.searchresponse)
    {
       obj.showchange='';
       obj.reason='';
       obj.fromReason="";
       obj.expiryDate='';
       obj.showdate="";
    }

    
  }
  public getallsaitems(itemName,whId){
     this.transfromvalue="",this.transtovalue=""
     if(itemName.replace(/\s/g, "").length>=2)
     {
       this.stockadjustment.getallsaitems({"itemName":itemName,"whId":whId,"selectedItems":""}).subscribe(res=>{
        
        
        this.searchresponse=res.model
 
        if (this.selectedfinallist.length != 0) {
         this.selectedfinallist.forEach((element) => {
           res.model = res.model.filter(item => element.id !== item.id);
           
        })
     
        this.searchresponse=res.model
  
     }
       if(this.addeditem.length!=0){
         this.addeditem.forEach((element)=>{
        
 
           res.model=res.model.filter(item => element.itemId !== item.id.toString())
           })
           this.searchresponse=res.model
      
       }
     })
          
    
    }
   else{
   
     swal({
      title: "Error!",
      text: "name character should be greater than 2",
      type: "warning",
    });
   }
     for(let obj of this.searchresponse)
     {
        obj.showchange='';
        obj.reason='';
        obj.fromReason="";
        obj.expiryDate='';
        obj.showdate="";
        console.log(this.searchresponse,"search")
     }
    
    
  }
  public toggle3() {
    this.show3 = true;
    this.searchvalue = false;
  }
  public checkbox(e){
    this.checkvalidation=e.target.checked;
    this.allchecked=true;
    if(e.target.checked==true){
      this.singlecheck=true;
      this.selectedresponse=this.searchresponse;

    }else if(e.target.checked==false)
    {
      this.singlecheck=false;
      this.selectedresponse=[];
    }
    //this.nameresponse=[];

  }

 public emptyquantityvalidation():any
  {
    for(let items of this.searchresponse)
    {  
      if(!items.quantity)
      {
        return true;
      }

    }

      
   
  }
  public goselect(qty){
    

  if(this.emptyquantityvalidation()==true)
  {  
    swal({
      title: "Error!",
      text: "quantity cannot be Empty",
      type: "warning",
    });
    return false;
  }
  if(this.quantityvalidation()==true)
  {
    swal({
      title: "Error!",
      text: "quantity cannot greater than stock",
      type: "warning",
    });
    return false;
  }
 if(this.checkvalidation==false)
  {
    
    swal({
      title: "Error!",
      text: "item selection required",
      type: "warning",
    });
    return false;
  }
  else if(!(this.transfromvalue && this.transtovalue))
   { 
    swal({
      title: "Error!",
      text: "stock selection is mandatory",
      type: "warning",
    });
    
   }
   else if(this.transfromvalue && this.transtovalue && this.transfromvalue==this.transtovalue)
     {
       
       swal({
        title: "Error!",
        text: "same stock cannot be transfer",
        type: "warning",
      });
      
       
     }
     
    else if(this.datevalidation()==true)
    {
      swal({
        title:"Error!",
        text:"date selection is required",
        type:"warning",
      });
        
    }
    
     
  else
  {
   
    



            this.allchecked=false;
            this.singlecheck=false;
            if(this.selectedresponse.length!=0){
            this.showselected=true;
            this.selectedresponse.forEach((item)=>{
            if(this.selectedfinallist.filter(data=>data.id==item.id).length==0)
                          {
                            this.selectedfinallist.push(item);
                          }
            })
          
          }
          else{
           
            swal({
              title: "Error!",
              text: "select the atleast one item for Stock",
              type: "warning",
            });
            
          }
          //  this.selectedresponse=[];
         
            this.temp= this.searchresponse.filter(data=>!this.selectedresponse.includes(data));
          this.searchresponse=this.temp;
          this.selectedresponse=[];
       }   

   
  //  this.searchresponse=[];
  }
public resetfunction()
{
    this.show3=false;
    this.showselected=false;
    this.name.nativeElement.value="";
}

  public datevalidation():any
  { 
    for(let item of this.searchresponse){
           
      if((item.showdate==false && !item.expiryDate))
      {
        
        return true;
        
      }
    }
    
  }

  public quantityvalidation():boolean
  {

    for(let item of this.searchresponse){

      if(isNaN(item.quantity))
      {
        return true;
      }

     
         
      else if((parseInt(item.quantity)>parseInt(item.showchange)))
      { 
       
        return true;
        
      }
    }
  }
  public singlecheckbox(e,value,val) {
    this.checkvalidation=e.target.checked;
    if(val=='search'){
    if(e.target.checked==true){
      this.searchresponse.forEach((item)=>{
        if(item.id==value){
          this.selectedresponse.push(item);
        }
      })
    }
    else if(e.target.checked==false){
      this.searchresponse.forEach((item)=>{
        if(item.id==value){
          let index = this.selectedresponse.indexOf(item.id);
          this.selectedresponse.splice(index,1);
        }
     
    })
  }
}


  }
  // ****************for remove by name selected list*************************
  public removeselectedfinal(value){
    this.selectedfinallist.forEach((item)=>{
      if(item.id==value){
           this.totalqty=0;
        let index=this.selectedfinallist.indexOf(item);
        this.selectedfinallist.splice(index,1);
        this.addeditem.forEach((item)=>{
          this.totalqty+= parseInt(item.quantity);
        })
      }
    })
    if(this.selectedfinallist.length==0)
    {
      this.showselected=false;
    }
  }

  public transfrom(e,name)
  { 
     this.searchresponse.forEach((item,index)=>{
       if(e.target.value=="GoodStock" &&name==item.name)
       {  item.quantity=0;
         item.showchange=item.goodStock
         this.transfromvalue=e.target.value
         item.fromReason= this.transfromvalue
         this.showdate=false;
       }
       else if(e.target.value=="Damaged"&&name==item.name)
       {item.quantity=0;
        item.showchange=item.damageQty
        this.transfromvalue=e.target.value
        item.fromReason= this.transfromvalue
        this.showdate=false;
       }
       else if(e.target.value=="nearToExpire"&&name==item.name)
       { item.quantity=0;
        item.showchange=item.nearToExpireQty
        this.transfromvalue=e.target.value
        item.fromReason= this.transfromvalue;
        this.showdate=true;

       }
       else if(e.target.value=="Expired"&&name==item.name)
       {item.quantity=0;
        item.showchange=item.expiredQty;
        this.transfromvalue=e.target.value
        item.fromReason= this.transfromvalue
        this.showdate=false;
       }
     })
  }
  public transto(e,name)
  { this.searchresponse.forEach((item,index)=>{
     if(e.target.value=="nearToExpire" &&name==item.name)
     { item.quantity=0;
        item.showdate=false;
       this.transtovalue=e.target.value;
        item.reason=this.transtovalue
        this.showdate=true;
     }
     if(e.target.value=="Damaged" &&name==item.name)
     {item.quantity=0;
      this.transtovalue=e.target.value
      item.reason=this.transtovalue
      item.showdate=true;
      this.showdate=false;
     }
     if(e.target.value=="GoodStock" &&name==item.name)
     { item.quantity=0;
      this.transtovalue=e.target.value
      item.reason=this.transtovalue
      item.showdate=true;
      this.showdate=false;
     }
     if(e.target.value=="Expired" &&name==item.name)
     {item.quantity=0;
      this.transtovalue=e.target.value
      item.reason=this.transtovalue
      item.showdate=true;
      this.showdate=false;
     }
    })
  }

  public  qtychange(e,stock,id)
 { 

  if(!e.target.value)
  {
    swal({
      title: "Error!",
      text: "Quantity Cannot Be Empty",
      type: "warning",
    });
  }
   if(parseInt(e.target.value) > parseInt(stock))
   {
    swal({
      title: "Error!",
      text: "quantity cannot greater than stock",
      type: "warning",
    });
    this.addeditem.forEach((item)=>{
      if(item.id==id)
      {
        item.quantity=0;
        this.totalqty=0;
        this.addeditem.forEach((item)=>{
        this.totalqty+= parseInt(item.quantity);
      })
      }
    })
    
   }

   else
   {
        this.totalqty=0;
        this.addeditem.forEach((item)=>{
        this.totalqty+= parseInt(item.quantity);
      })
   }
  
 }
  public qtycheck(e,stockvalue,id)
  {
    if(!e.target.value)
    {
      swal({
        title: "Error!",
        text: "quantity cannot be empty",
        type: "warning",
      });
    }
    if( parseInt(e.target.value) > parseInt(stockvalue.innerText))
     { 
            swal({
              title: "Error!",
              text: "quantity cannot greater than stock",
              type: "warning",
            });
         
     }
  }

  public stockfinal(e)
  {
    if(this.selectedfinallist.length!=0){
      swal({
        title: 'Are you sure?',
        text: 'stock details will be adjusted !',
        type: 'warning',
        showCancelButton: true,
         confirmButtonText: 'Yes',
        cancelButtonText: 'No'
       }).then((result) => {
        if (result.value) {
         
          this.selectedfinallist.forEach((item)=>{
            if(this.addeditem.filter(data=>data.id==item.id).length==0){
              this.addeditem.push(item);
               }
          })
          
         
          swal({
            title: "Success",
            text: "Stock Adjust Requested Successfully",
            type: "success",
          });
        
          
          this.show3=false;
          this.showselected=false; 
          this.selectedfinallist=[];
          this.showModal=false;
          this.showaddeditem=true;

          this.addeditem.forEach((item)=>{
            this.totalqty+= parseInt(item.quantity);
          })
        } 
        else if (result.dismiss === swal.DismissReason.cancel) 
        {
          swal(
            'Cancelled',
            'error'
          )
         }
        })
    
      
    }

     else
    {
      swal({
        title: "Error!",
        text: "selected item empty!! select atleast one item",
        type: "warning",
      });
    
      
    }
   
  }

  public back(){
    this.router.navigate(['/StockAdjustment']);
  }
  public stockadjust(data:NgForm){
       if(!data.value.whId)
       {
            swal({
              title: "Error!",
              text: "warehouse is mandatory",
              type: "warning",
            });
       
         return false;
       }
       else
       {
         this.showModal=true;
       }
  }
  public removefinalitem(value)
  {
    swal({
      title: 'Are you sure?',
      text: 'stock details will be deleted !',
      type: 'warning',
      showCancelButton: true,
       confirmButtonText: 'Yes',
      cancelButtonText: 'No'
     }).then((result) => {
      if (result.value) {
        this.addeditem.forEach((item)=>{
          if(item.id==value){
            let index=this.addeditem.indexOf(item);
            this.addeditem.splice(index,1);
          }
        })
      
        swal({
          title: "Success",
          text: "Stock deleted Successfully",
          type: "success",
        });
        if(this.addeditem.length==0)
        {
          this.showaddeditem=false;
        }
      } 
      else if (result.dismiss === swal.DismissReason.cancel) 
      {
        swal(
          'Cancelled',
          'error'
        )
       }
      })
     
   
  }

  public dateselection(e,name)
  {
    this.searchresponse.forEach((item)=>{
       
      if(name==item.name && e.target.value)
      {
        item.expiryDate=e.target.value
      }
      
    })
    
  }

public finalquantityvalidation():any
{
  for(let item of this.addeditem)
  {
    if(!item.quantity)
    {
      return true;
    }
    if(item.quantity==0)
    {
      return true;
    }
  }
}

  public createsa()
  { 

    if(this.finalquantityvalidation()==true)
    {
      swal({
        title: "Error!",
        text: "Quantity should be greater than 1",
        type: "warning",
      });

      return false;
    }
    if(!this.remarks)
    {
      swal({
        title: "Error!",
        text: "remarks cannot be null",
        type: "warning",
      });
    
    }
    else
  {
    let itemdetails=[];
    this.addeditem.forEach((item)=>
    
     {
        itemdetails.push({"itemId":item.id.toString(),"uom":item.uom,"conversion":item.conversion,
        "quantity":item.conversion,"stock":item.showchange,"sessionId":"","reason":item.reason,"fromReason":item.fromReason,
        "expiryDate":(item.expiryDate==undefined)?"":item.expiryDate})
     
    })
    
    let data={
      "saId":"",
      "userId":'1',
      "whId":this.warehouseid,
      "remarks":this.remarks,
      "sADetailRequestViewModels":itemdetails
    }
    

    swal({
      title: 'Are you sure?',
      text: 'Adjustment will be Submitted !',
      type: 'warning',
      showCancelButton: true,
       confirmButtonText: 'Yes',
      cancelButtonText: 'No'
     }).then((result) => {
      if (result.value) {
        this.stockadjustment.createsa(data).subscribe(res=>{
          if(res.didError==false)
          { 
              
              swal({
                title: "Success",
                text:  "Your TO-NO is"+res.model.messageCode,
                type: "success",
              });
            this.router.navigate(["/StockAdjustment"])
       }
       else if(res.didError=true)
       {
              
              swal({
                title: "Error!",
                text: "error in submit",
                type: "warning",
              });
            
       }
        },error=>{
        
          swal({
            title: "Error!",
            text: error.error.Message,
            type: "warning",
          });
        })
       
       
      } 
      else if (result.dismiss === swal.DismissReason.cancel) 
      {
        swal(
          'Cancelled',
          'error'
        )
       }
      })
   

     
  }
 }
}
