import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import{EditpoService} from '../Core/editpo.service';
import {CreatePoService}from '../Core/create-po.service';
import { createPoMenu } from '../Core/interface';
import swal from 'sweetalert2';


@Component({
  selector: 'app-reorder-po',
  templateUrl: './reorder-po.component.html',
  styleUrls: ['./reorder-po.component.css']
})
export class ReorderPoComponent implements OnInit {

  poId: any;
  podata: any;
  addeditem:Array<any>=[];
  show3: boolean;
  show1: boolean=false;
  selectedresponse: Array<any>=[];
  selectedfinallist: Array<any>=[];
  filterdresult: Array<any>;
  searchresult: String;
  searchresultid: String;
  searchvalue:boolean = false;
  po: Array<any>;
  poDetailsArray: any;
  checkvalue=false;
  time: any = new Date();
  vendorAdd:string="";
  poUpdateDetails: any[];
    data2 = {
    "userId": "",
    "whId": "",
    "vendorId": "",
    "cityId": "",
    "poId": "",
    "isSpecial": "",
    "pODetailRequestModels": this.poDetailsArray 
    
  }
  nameresponse: Array<any>=[];
  showselected: boolean;
  special: string="0";
  poselectitem: Array<any>=[];
  show2: boolean=false;
  abbs: boolean=false;
  wareId: string="";
  vendorId: string="";
  cityId: string="";
  previtem: Array<any>=[];
  purchaseOrderId: number;
  addeditem2: Array<any>=[];
  prev: boolean=true;
  ismodal: boolean=false;
  ismodal2: boolean=false;
  poselectfinalitem:Array<any>=[];
  today=new Date().toJSON().split('T')[0];

  constructor( private route: ActivatedRoute,
    private router: Router,private edits:EditpoService,private poservice:CreatePoService) { }
    toggle1() {
      this.show1 = true;
    }
    toggle2() {
      this.show1 = false;
    }
    toggle3() {
      this.show3 = true;
      this.searchvalue = false;
    }
    toggle4() {
      this.show3 = false;
      this.showselected=false;
    }
    toggleshow2(){
      this.show2=true;
    }
    show2false(){
      this.show2=false;
    }
    modalopen(){
      this.ismodal=true;
    }
    modalopen2(){
      this.ismodal2=true;
    }

  ngOnInit() {
    this.poId = this.route.snapshot.params['poid'];
    this.podetail({"requestedId": this.poId,
    "userId": 1});
   
  }
  // ************************get po details for edit****************************
public podetail(data)
{ 
  // console.log(this.poId,"poid");
  this.poservice.reorderdetail(data).subscribe(res=>{
  // console.log(res,"reoerder res");
  this.podata=res.model.reOrderPOHeaderViewModel;
  this.previtem=res.model.itemViewModels;
  this.cityId=res.model.reOrderPOHeaderViewModel.cityId;
  this.vendorId=res.model.reOrderPOHeaderViewModel.vendorId;
  this.wareId=res.model.reOrderPOHeaderViewModel.warehouseId;
  // this.purchaseOrderId=res.model.purchaseOrderId;
  this.polist();
})
}


auto(e) {
  let len = e.target.value.length;
  if (len >= 2) {
    this.poservice.auto(e.target.value).subscribe(res => {
      this.filterdresult = res.model;
     if (this.previtem.length != 0) {
      this.previtem.forEach((element) => {
      this.filterdresult = this.filterdresult.filter(item => element.id !== item.id);    
       })

      }
      if (this.selectedfinallist.length != 0) {
           this.selectedfinallist.forEach((element) => {
           this.filterdresult = this.filterdresult.filter(item => element.id !== item.id);

        })
    
      }

     if (this.filterdresult != null && this.filterdresult.length != 0) {
        this.searchvalue = true;
        
      }
      else {
        swal({
          title: "Error!",
          text:"No record Found",
          type: "warning",
          showCancelButton: false,
          confirmButtonText: 'OK'
        });
      
        this.searchresult="";
        this.searchvalue = false;
      }
    })
  }
  else {
   

  }

}
// ****************for select item event*************************
searchevent(e) {
  this.searchresult = e.target.innerText;
  this.searchvalue = false;
  this.searchresultid = e.target.id;
  this.posearchlist('',this.searchresult);
}

 // ****************for select all items checkbox*************************
public checkbox(e){
  this.abbs=true;
  let count =0;
  if(e.target.checked==true){
   this.nameresponse.forEach((item)=>{
          if(item.quantity == null)
          { 
            swal({
              title: "Error!",
              text:"please select valid quantity",
              type: "warning",
              showCancelButton: false,
              confirmButtonText: 'OK'
            });
            this.checkvalue=false;
            e.target.checked=false;
            this.abbs=false;
            count++

          }
      });
          if(count==0)
           {
            this.checkvalue=true;
            this.selectedresponse=this.nameresponse;
          }

  }else if(e.target.checked==false)
  {
    this.checkvalue=false;
    this.selectedresponse=[];
  }
  //this.nameresponse=[];

}
closename(){

  this.nameresponse=[];
  this.selectedfinallist=[];
  this.searchresult="";
  this.toggle4();
}

 // ****************for polist selector*************************
public polist() {
   this.poservice.polist({ "userId": "1" , "whId": this.wareId, "vId": this.vendorId, }).subscribe(res => {
      this.po = res.model;
  })
}

 // ****************for selected item list by name*************************
 public goselect() {
  this.abbs = false;
  let count = 0;
  this.checkvalue = false;
  if (this.selectedresponse.length != 0) {
    this.selectedresponse.forEach((item) => {
      if (item.quantity == null) {
        count++;
        swal({
          title: "Error!",
          text: "please select valid quantity ",
          type: "warning",
          showCancelButton: false,
          confirmButtonText: 'OK'
        })
      }
      else if (count == 0) {
        this.showselected = true;
        if (this.selectedfinallist.filter(data => data.id == item.id).length == 0) {
          this.selectedfinallist.push(item);
        }
        this.selectedresponse=[];
        this.nameresponse=[];
      }
    })
  }
  else {
    swal({
      title: "Error!",
      text: "first select the atleast one item for PO ",
      type: "warning",
      showCancelButton: false,
      confirmButtonText: 'OK'
    });

  }

}

// ****************for po search item list*************************
public posearchlist(po,name) {
  // alert(name);
  if (po && name == "") {
    this.poservice.searchpo({
      "cityId": this.cityId,
      "itemName": "",
      "selectedItems": "",
      "whId": this.wareId,
      "poId": po,
      "vendorId": this.vendorId,
      "userId": "1",
      "isSpecial": this.special
    }).subscribe(res => {
      res.model.forEach(item=>{
        if(this.previtem.filter(data=>data.id==item.id).length==0 && this.poselectitem.filter(data=>data.id==item.id).length==0 ){
          this.poselectitem.push(item);
        }
      })
             this.poselectitem.forEach(item => {
              if(this.poselectfinalitem.filter(data=>data.id==item.id).length==0)
              {
                this.poselectfinalitem.push(item);                       
              }
         });
      })

    this.toggle2();
  }
  else if (name != "") 
  {
  //  alert('');
    this.poservice.searchpo({
      "cityId": this.cityId,
      "itemName":name,
      "selectedItems": "",
      "whId": this.wareId,
      "poId": po,
      "vendorId": this.vendorId,
      "userId": "1",
      "isSpecial": this.special
    }).subscribe(res => {
      res.model.forEach(item=>{
        if(this.previtem.filter(data=>data.itemId==item.id).length==0 && this.nameresponse.filter(data=>data.id==item.id).length==0 && this.selectedfinallist.filter(data=>data.id==item.id).length==0 )
                   {
                     this.nameresponse.push(item);                       
                   }

      })

    })
        this.toggle3();
  }
  else{
    swal({
      title: "Error!",
      text:"please search item by Name",
      type: "warning",
      showCancelButton: false,
      confirmButtonText: 'OK'
    });
  
  }
}

// ****************for remove final selected list*************************
public removeitem(value){
  this.previtem.forEach((item)=>{
    if(item.id==value){
      let index=this.previtem.indexOf(item);
      this.previtem.splice(index,1);
    }
  })
}
// ****************for remove by name selected list*************************
public removeitem2(value){
  this.selectedfinallist.forEach((item)=>{
    if(item.id==value){
      let index=this.selectedfinallist.indexOf(item);
      this.selectedfinallist.splice(index,1);
    }
  })
}

// ****************for checkbox click event************************
public singlecheck(e,value,val,qty) {
  if(val=='search'){
    if(e.target.checked==true){
      this.nameresponse.forEach((item)=>{
        if(item.id==value){
          if(qty!=null){
            this.selectedresponse.push(item);
          }
          else{
            swal({
              title: "Error!",
              text:"enter some postive quantity",
              type: "warning",
              showCancelButton: false,
              confirmButtonText: 'OK'
            });
           
            e.target.checked=false;
          }
        }
      })
    }
    else if(e.target.checked==false){
      this.nameresponse.forEach((item)=>{
        if(item.id==value){
          let index = this.selectedresponse.indexOf(item.id);
          this.selectedresponse.splice(index,1);
        }
     
    })
  }
}
else if(val=='poselect'){
  // console.log("added item :"+this.addeditem);
  let index=this.poselectfinalitem.findIndex(item=>item.id===value);
  // alert("index number"+index);
  this.poselectfinalitem.splice(index,1);
  // console.log("added item :"+this.poselectfinalitem);
}

}
// ****************for submit by name search modal*************************
public bynamelist(e){
if(this.selectedfinallist.length!=0){
this.toggle1();
this.selectedfinallist.forEach((item)=>{
  item.expiryDate="";
  if(this.previtem.filter(data=>data.id==item.id).length==0){
    this.previtem.push(item);
     }
    
})
//  this.addeditem=[];
this.ismodal=false;
this.show3=false;
this.showselected=false; 
this.selectedfinallist=[];
}
else
{
  this.ismodal=true;
  swal({
    title: "Error!",
    text:"selected item empty!! select atleast one item",
    type: "warning",
    showCancelButton: false,
    confirmButtonText: 'OK'
  });

}


 
}
// ******back*****
back(){
this.router.navigate(['/PurchaseOrder']);
}
// ****************for submit by po search modal*************************
public byposelect(e){
  if(this.poselectfinalitem.length==0){
    swal({
      title: "Error!",
      text:"please select atleast one po",
      type: "warning",
      showCancelButton: false,
      confirmButtonText: 'OK'
    });
   
    this.ismodal2=true;
  }
  if(this.poselectfinalitem.length!=0)
  {
     let num=0;
    this.poselectfinalitem.forEach(item=>{
      if(item.quantity==null){
        swal({
          title: "Error!",
          text:"enter some postive quantity",
          type: "warning",
          showCancelButton: false,
          confirmButtonText: 'OK'
        });
       
         num++;
      }
    })
    if(num==0){
    this.poselectfinalitem.forEach(item=>{
        item.expiryDate="";
       if(this.previtem.filter(data=>data.id==item.id).length==0){
                this.previtem.push(item);
        }
             
    })
     this.toggle1();
    this.ismodal2=false;
    this.poselectfinalitem=[]; 
  }
   
}
  
}
// ****************for final create po submit*************************
public submitPO() {
  this.createDataForPOCreation();
 //console.log(this.poDetailsArray,"podetails");
 if(this.poDetailsArray.length!=0)
 {
  
  this.data2.vendorId = this.vendorId;
  this.data2.whId = this.wareId;
  this.data2.poId = "";
  this.data2.userId = "1";
  this.data2.cityId = this.cityId;
  this.data2.pODetailRequestModels = this.poDetailsArray;
 

  this.poservice.createPO(this.data2).subscribe(res => {
   
    if(!res.didError)
    {
      swal({
        title: "Success!",
        text:"Po created successfully",
        type: "success",
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    this.router.navigate(['/PurchaseOrder']);
    }
    else
    swal({
      title: "Error!",
      text:"Error while processing your request ,try again later",
      type: "warning",
      showCancelButton: false,
      confirmButtonText: 'OK'
    });
  
  }),
    err => {
      alert("error in processing");
    }
  
  
}
else if(this.previtem.length==0){
  swal({
    title: "Error!",
    text:"please Select product items",
    type: "warning",
    showCancelButton: false,
    confirmButtonText: 'OK'
  });

}
}

// ****************for final create po submit*************************
createDataForPOCreation() {
  // alert('f')
  this.poDetailsArray = [];
    let count=this.previtem.length;
    this.previtem.forEach(item => {
      if(item.quantity==null || item.expiryDate==('' || undefined)){
        // alert("kokokoko")
        swal({
          title: "Error!",
          text:"plz Select quantity and Expairy Date",
          type: "warning",
          showCancelButton: false,
          confirmButtonText: 'OK'
        });
    
        count--;
        return false;
      }
    })
    // alertposlia(count);
     if(count==this.previtem.length)
     {
       this.previtem.forEach(item=>{
        let createPo: createPoMenu = {
          "itemId": item.id,
          "quantity": item.quantity,
          "sessionId": " ",
          "itemExpiryDate": item.expiryDate
  
        }
        this.poDetailsArray.push(createPo);
        console.log(this)

       })
      
    }
}

}
