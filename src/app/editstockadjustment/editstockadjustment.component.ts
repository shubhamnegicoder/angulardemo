import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute}from '@angular/router';
import { AddstockadjustmentService } from '../Core/addstockadjustment.service';
import { CreatePoService } from '../Core/create-po.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { NgForm } from '../../../node_modules/@angular/forms';
import { EditstockadjustmentService } from '../Core/editstockadjustment.service';
import { CommonService } from '../Core/common.service';
@Component({
  selector: 'app-editstockadjustment',
  templateUrl: './editstockadjustment.component.html',
  styleUrls: ['./editstockadjustment.component.css']
})
export class EditstockadjustmentComponent implements OnInit {
  transferorderid: any;
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
  totalquantity:any="";
  editdate:any="";
  code:any="";
  warehousename:any="";
  status:any=""
  statusid: any="";
  boxes:any="";
  transferOrderDetailId: any;
  releaseby:any;
  releaseon:any;
  constructor(private editstock:EditstockadjustmentService,private commonService:CommonService,
     private routes:ActivatedRoute,private stockadjustment:AddstockadjustmentService,private itemlist:CreatePoService,private router:Router) { }
 

     @ViewChild("name") name :ElementRef;

  ngOnInit() {

    this.commonService.setTitle('IMS-Warehouse-Stock Transfer-Edit Stock Adjustment');

    this.transferorderid=this.routes.snapshot.params["id"];

    this.getwarehouse();
    this.getsadetail();
    this.showaddeditem=true;
  }
  
  public getsadetail(){
    this.editstock.getsadetail({"requestedId":this.transferorderid,"userId":'1'}).subscribe(res=>{
      
       this.releaseby=res.model.releasedBy;
       this.releaseon=res.model.releasedOn;
         this.transferOrderDetailId=res.model.transferOrderDetailId;
         this.editdate=res.model.date;
         this.warehousename=res.model.fromWHName;
         this.warehouseid=res.model.toWHId;
         this.remarks=res.model.remarks;
         this.totalquantity=res.model.totalQuantity;
         this.code=res.model.code;
         this.status=(res.model.status=='1')?"Open":(res.model.status=='2')?"Released":(res.model.status=='3')?"Closed":"N/A";
         this.statusid=res.model.status;
         this.addeditem=res.model.transferOrderDetailViewModels
         for(let key of this.addeditem)
         {
           key.canbedeleted=false;
         }
       
    })

    
  }

  public getwarehouse(){

    this.stockadjustment.getsawarehouse().subscribe(res => {
      this.warehouse = res.model;
 
   })
 }

 public resetfunction()
 {
    this.show3=false;
    this.showselected=false;
    this.name.nativeElement.value=""
 }
  public auto(e) {
   this.filterdresult=[];
    let len = e.target.value.length;
    if (len >= 3) {
      this.searchvalue=true;
      this.itemlist.auto(e.target.value).subscribe(res => {
        this.filterdresult = res.model;
       

        if (this.selectedfinallist.length != 0) {
          this.selectedfinallist.forEach((element) => {
            this.filterdresult = this.filterdresult.filter(item => element.id !== item.id);

         })
      
  
      }
      if(this.addeditem.length!=0){
        this.addeditem.forEach((element)=>{
          
          this.filterdresult=this.filterdresult.filter(item => element.itemId !== item.id.toString())
          })
      
          
      }
      })
      
  }
    else
    {
      this.filterdresult=[];
    }
  
  }
  public searchevent(e) {
    this.searchresult = e.target.innerText;
    this.searchvalue = false;
    this.searchresultid = e.target.id;
    

    this.transfromvalue="",this.transtovalue=""
    if(e.target.innerText.replace(/\s/g, "").length>=2)
    {
      this.stockadjustment.getallsaitems({"itemName":e.target.innerText,"whId":this.warehouseid,"selectedItems":""}).subscribe(res=>{

       
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
      this.stockadjustment.getallsaitems({"itemName":itemName,"whId":this.warehouseid,"selectedItems":""}).subscribe(res=>{

       
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
     }
    
  }
  public toggle3() {
    this.show3 = true;
    this.searchvalue = false;
  }
  public checkbox(e){
    this.allchecked=true;
    this.checkvalidation=e.target.checked;
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
  public goselect(){
 
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
  if(!(this.transfromvalue && this.transtovalue))
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
        let index=this.selectedfinallist.indexOf(item);
        this.selectedfinallist.splice(index,1);
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
       { item.quantity=0;
        item.showchange=item.damageQty
        this.transfromvalue=e.target.value
        item.fromReason= this.transfromvalue
        this.showdate=false;
       }
       else if(e.target.value=="nearToExpire"&&name==item.name)
       {  item.quantity=0;
        item.showchange=item.nearToExpireQty
        this.transfromvalue=e.target.value
        item.fromReason= this.transfromvalue;
        this.showdate=true;

       }
       else if(e.target.value=="Expired"&&name==item.name)
       { item.quantity=0;
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
     {  item.quantity=0;
        item.showdate=false;
       this.transtovalue=e.target.value;
        item.reason=this.transtovalue
        this.showdate=true;
     }
     if(e.target.value=="Damaged" &&name==item.name)
     { item.quantity=0;
      this.transtovalue=e.target.value
      item.reason=this.transtovalue
      item.showdate=true;
      this.showdate=false;
     }
     if(e.target.value=="GoodStock" &&name==item.name)
     {  item.quantity=0;
      this.transtovalue=e.target.value
      item.reason=this.transtovalue
      item.showdate=true;
      this.showdate=false;
     }
     if(e.target.value=="Expired" &&name==item.name)
     { item.quantity=0;
      this.transtovalue=e.target.value
      item.reason=this.transtovalue
      item.showdate=true;
      this.showdate=false;
     }
    })
  }
  public qtycheck(e,stockvalue)
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
        text: 'stock details  will be adjusted !',
        type: 'warning',
        showCancelButton: true,
         confirmButtonText: 'Yes',
        cancelButtonText: 'No'
       }).then((result) => {
        if (result.value) {
          
          
          this.selectedfinallist.forEach((item)=>{
            
                for(let key in item) {
                    if(key=="id")
                    {
                      
                      item.itemId=item[key].toString();
                      delete item.id;
                    }
                    if(key=="name")
                    {
                    
                      item.itemName=item[key]
                      delete item.name;
                      
                    }
                    if(key=="showchange")
                    {
                      item.availableQuantity=item[key]
                      delete item.showchange;
                      
                    }
                    if(key=="price")
                    {
                      item.mrp=item[key]
                      delete item.price;
                     
                    }
                    if(key=="uom")
                    {
                      item.uomName=item[key]
                      delete item.uom;
                      
                    }
              };
             
          })
         
          let itemdetails=[];
    this.selectedfinallist.forEach((item)=>
    
     {
        itemdetails.push({"todId":this.transferorderid,"itemId":item.itemId,"uom":item.uomName,"conversion":item.conversion,
        "quantity":item.quantity.toString(),"stock":item.availableQuantity.toString(),"sessionId":"","reason":item.reason,"fromReason":item.fromReason,
        "expiryDate":(item.expiryDate==undefined)?"":item.expiryDate})
     
    })
    
    let data={
      "userId":'1',
      "fromWHId":this.warehouseid,
      "toWHId":this.warehouseid,
      "boxCount":this.boxes,
      "remarks":this.remarks,
      "toId":this.transferorderid,
      "toiId":"",
      "tODetailRequestViewModels":itemdetails
    }
        
          
          this.selectedfinallist.forEach((item)=>{
            if(this.addeditem.filter(data=>data.itemId==item.itemId).length==0){
              // this.addeditem.push(item);
              // swal({
              //   title: "Success",
              //   text: "Stock Updated Requested Successfully",
              //   type: "success",
              // });  
              this.editstock.insertsaitems(data).subscribe(res=>{
                if(res.didError==false)
                { 
                    this.addeditem=res.model.transferOrderViewModel.transferOrderDetailViewModels;
                    this.addeditem.forEach((item)=>
                    {
                     
                          for(let key of this.selectedfinallist)
                          {
                            
                             
                            if(item.itemId!==key.itemId)
                              { 
                              
                                item.canbedeleted=false;
                              
                              }
                              else if(item.itemId===key.itemId)
                              {
                                item.canbedeleted=true;
                              }
                          }

                    })
                      
                    swal({
                      title: "Item Added Successfully",
                      text:  this.code + "=>" +res.model.statusMessage,
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

     else{
      swal({
        title: "Error!",
        text: "selected item empty!! select atleast one item",
        type: "warning",
      });
    
      
    }
   
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
      if(item.itemId==id)
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
  public back(){
    this.router.navigate(['/StockAdjustment']);
  }
  public stockadjust(data:NgForm,ref){
      
         this.showModal=true;
     
       
  }
  public removefinalitem(value,id)
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
          if(item.canbedeleted==false &&item.itemId==value)
          {
            swal({
              title: "Failed",
              text: "Cannot be deleted",
              type: "warning",
            });
          }
          else if(item.itemId==value &&item.canbedeleted==true){
  
            this.totalqty=0;
            let index=this.addeditem.indexOf(item);
            // this.addeditem.splice(index,1);
            delete this.addeditem[index]
          this.addeditem=  this.addeditem.filter(item=>item)
        

          this.editstock.deletesaitems({"requestedId":id,"userId":'1'}).subscribe(res=>{
            if(res.didError==false)
            {
                
                swal({
                  title: "Stock deleted Successfully",
                  text:  this.code + "=>" +res.model.statusMessage,
                  type: "success",
                });
             
              this.addeditem.forEach((item)=>{
                this.totalqty+= parseInt(item.quantity);
              })
         }
         else if(res.didError=true)
         {
                
                swal({
                  title: "Error!",
                  text: "error in delete",
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
        })
      
       
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


  public releasesa()
  {
      
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
    
    swal({
      title: 'For Changes Updation Is Required!',
      text: 'Are You Sure !',
      type: 'warning',
      showCancelButton: true,
       confirmButtonText: 'Yes',
      cancelButtonText: 'No'
     }).then((result) => {
      if (result.value) {
        this.editstock.releasesa({ "requestedId":this.transferorderid,
        "userId":'1'}).subscribe(res=>{
          if(res.didError==false)
          { 
              
              swal({
                title: "Stock Released Successfully",
                text:  this.code,
                type: "success",
              });
            this.router.navigate(["/StockAdjustment"])
       }
       else if(res.didError=true)
       {
              
              swal({
                title: "Error!",
                text: "error in Releasing",
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
  public updatesa()
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
        itemdetails.push({"todId":item.transferOrderDetailId,"itemId":item.itemId,"uom":item.uomName,"conversion":item.conversion,
        "quantity":item.quantity.toString(),"stock":item.availableQuantity.toString(),"sessionId":"","reason":item.reason,"fromReason":item.fromReason,
        "expiryDate":(item.expiryDate==undefined)?"":item.expiryDate})
     
    })
    
    let data={
      "userId":'1',
      "fromWHId":this.warehouseid,
      "toWHId":this.warehouseid,
      "boxCount":this.boxes,
      "remarks":this.remarks,
      "toId":this.transferorderid,
      "toiId":"",
      "tODetailRequestViewModels":itemdetails
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
        this.editstock.updatesa(data).subscribe(res=>{
          if(res.didError==false)
          { 
              
              swal({
                title: "Update Requested Successfully",
                text:  this.code + "=>" +res.model.statusMessage,
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



