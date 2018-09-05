import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../Core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LocationComponent } from '../location/location.component';
import { SubmenuService } from '../Core/submenu.service';
import { StateComponent } from '../state/state.component';
import { CityComponent } from '../city/city.component';
import { WarehouseComponent } from '../warehouse/warehouse.component';
import { OutboundComponent } from '../outbound/outbound.component';
import { InboundComponent } from '../inbound/inbound.component';
import { StockTransferComponent } from '../stock-transfer/stock-transfer.component';
import { SubMenu, SubMenu1 } from '../Core/interface';
import { PurchaseOrderComponent } from '../purchase-order/purchase-order.component';
import { GRNComponent } from '../grn/grn.component';
import { TransferOrderComponent } from '../transfer-order/transfer-order.component';
import { PurchaseReturnComponent } from '../purchase-return/purchase-return.component';
import { TransferReceiptNoteComponent } from '../transfer-receipt-note/transfer-receipt-note.component';
import { StockAdjustmentComponent } from '../stock-adjustment/stock-adjustment.component';
import { CanactivateGuard } from '../Core/canactivate.guard';
import { AddWarehouseComponent } from '../add-warehouse/add-warehouse.component';
import { ProductComponent } from '../product/product.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { CreatePoComponent } from '../create-po/create-po.component'; 
import {EditproComponent}   from '../editpro/editpro.component';
// import { EditGrnComponent } from '../edit-grn/edit-grn.component';
// import { ViewGrnComponent } from '../view-grn/view-grn.component';
import { ProductTypeComponent } from '../product/product-type/product-type.component';
import { BrandComponent } from '../product/brand/brand.component';
import { SubBrandComponent } from '../product/sub-brand/sub-brand.component';
import { CategoryComponent } from '../product/category/category.component';
import { SubCategoryComponent } from '../product/sub-category/sub-category.component';
import { CompanyComponent } from '../product/company/company.component';
import { DepartmentComponent } from '../product/department/department.component';
import { TaxComponent } from '../product/tax/tax.component';
import { CreateGrnComponent } from '../create-grn/create-grn.component';
import{ EditpoComponent} from '../editpo/editpo.component'
import { EditWarehouseComponent } from '../edit-warehouse/edit-warehouse.component';
import { MasterVndorComponent } from '../product/master-vndor/master-vndor.component';
import { AddVendComponent } from '../product/master-vndor/add-vend/add-vend.component';
import { EditVendComponent } from '../product/master-vndor/edit-vend/edit-vend.component';
import { AddstockadjustmentComponent } from '../addstockadjustment/addstockadjustment.component';
import { CreatePurchaseReturnComponent } from '../create-purchase-return/create-purchase-return.component';
import { ProductMarginComponent } from '../product/product-margin/product-margin.component';
import { TrnmismatchComponent } from '../trnmismatch/trnmismatch.component';
import { EditGrnComponent } from '../edit-grn/edit-grn.component';
import { ViewGrnComponent } from '../view-grn/view-grn.component';
import { CreateToComponent } from '../create-to/create-to/create-to.component';
import { EdittrnComponent } from '../transfer-receipt-note/edittrn/edittrn.component';
import { ReleasetrnmismatchComponent } from '../releasetrnmismatch/releasetrnmismatch.component';
import { MachineComponent } from '../machine/machine.component';
import { SaleOrderComponent } from '../machine/sale-order/sale-order.component';
import { CreateMachineComponent } from '../machine/create-machine/create-machine.component';

import { CreateSalesOrderComponent } from '../machine/create-sales-order/create-sales-order.component';
import { ReorderPoComponent } from '../reorder-po/reorder-po.component';
import { EditMachineComponent } from '../machine/edit-machine/edit-machine.component';
import { MaintainStockComponent } from '../warehouse/maintain-stock/maintain-stock.component';
import { EditstockadjustmentComponent } from '../editstockadjustment/editstockadjustment.component';
import { CountryComponent } from '../country/country.component';
import { ImportproductmarginComponent } from '../importproductmargin/importproductmargin.component';
import { EditSoComponent } from '../machine/edit-so/edit-so.component';
import { EditToComponent } from '../edit-to/edit-to.component';
import { LogUtils } from '../log-utils';
//import { some } from 'lodash';

// const whitespaceCharacters = [' ', '  ',
//   '\b', '\t', '\n', '\v', '\f', '\r', `\"`, `\'`, `\\`,
//   '\u0008', '\u0009', '\u000A', '\u000B', '\u000C',
// '\u000D', '\u0020','\u0022', '\u0027', '\u005C',
// '\u00A0', '\u2028', '\u2029', '\uFEFF']
// const hasWhitespace = char => some(
//   w => char.indexOf(w) > -1,whitespaceCharacters
// )
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  providers: [SubmenuService]
})


export class NavMenuComponent implements OnInit {


  modulesArray: Array<any> = [];
  subModulesArray: Array<SubMenu> = [];
  subModulesArray1: Array<SubMenu1> = [];
  selectedModule: string;
  moduleToShowActive:string;
  sideToggleButton: boolean = false;
  sideToggleButtonArrow: boolean = false;
  calledComponent:string;
  username:string;
  constructor(private authServiceObj: AuthService,private activatedRoute:ActivatedRoute ,private router: Router, private submenuservice: SubmenuService) { }

  ngOnInit() {
    this.username = this.authServiceObj.username;
    this.GetModules();
  }

  GetModules() {
   // alert("get modules called->"+this.authServiceObj.menuList.length);

    let isAlreadyLogin = sessionStorage.getItem("isLogged");
    let url = location.href;
    let x = url.split("/");
     this.calledComponent = x[x.length-1];

    if(this.calledComponent != "" && isAlreadyLogin === "1"){
     // alert("enter in if condition")
      let userIdData = {
        "userId":1
      }
        this.authServiceObj.getModulesByUserID(userIdData).subscribe(res=>{

          if(res === true){
           // alert("modules received");
            this.modulesArray = this.authServiceObj.menuList;
            this.subModulesArray = this.authServiceObj.subMenuList;

            let moduleName = this.calledComponent;
    
            console.log("modules arr:- >"+JSON.stringify(this.modulesArray));
      
            console.log("subModules arr:- >"+JSON.stringify(this.subModulesArray));
        
            let moduleIdToGetSubModule = 0;
            let moduleParentId = 0;
        
            moduleIdToGetSubModule = this.subModulesArray.filter(item => item.action == moduleName)[0].permissionId;
            moduleParentId = this.subModulesArray.filter(item => item.action == moduleName)[0].parentId;
            this.moduleToShowActive = this.subModulesArray.filter(item => item.action == moduleName)[0].module;
            // alert("selected_module  "+this.moduleToShowActive);
            // alert("moduleId  "+moduleIdToGetSubModule+"---- ParentId:->"+moduleParentId);
      
            if(moduleParentId === 0)
                this.getSubMenu(moduleIdToGetSubModule);
            else{     
              for(let i=0;i<this.subModulesArray.length;i++){
                let p_id = this.getRootParentId(moduleParentId);
                console.log("parent id  "+p_id);
                if(p_id === 0){
                  break;
                }else{
                  moduleParentId = p_id;
                }
      
              }
      
             // alert("parent id   "+moduleParentId);
              this.getSubMenu(moduleParentId);
            }
          }else{
           // alert("getModulesByUserId respond  "+ res)
          }

        });
    }else{

   //   alert("menu array of authservice obj val:->"+ this.authServiceObj.menuList.length);
      this.modulesArray = this.authServiceObj.menuList;
      this.subModulesArray = this.authServiceObj.subMenuList;

      //alert("submodules count from coming from login  "+this.subModulesArray.length);
      this.moduleToShowActive = 'Dashboard';
      this.getSubMenu(35);
    }


   // if(this.modulesArray != null && this.modulesArray.length > 0){
      
     
     // alert("login data received->"+JSON.stringify(this.modulesArray));
     

     
      // alert("data received called comp  "+this.calledComponent);

    
  //}
   
}


  getRootParentId(permission_id:number):number{
   return this.subModulesArray.filter(item => item.permissionId === permission_id)[0].parentId;
  }

  getSubMenu(id: number) {
    console.log("modules array  "+JSON.stringify(this.modulesArray));
    console.log("permission id  "+id);
    this.selectedModule = this.modulesArray.filter(item => item.permissionId == id)[0].module;
    this.submenuservice.getSubMenu(id).subscribe(response => {

      console.log("submenuservice response  "+JSON.stringify(response));
      this.subModulesArray = response;

      let arr: Array<any> = [];
      // for (let item of this.subModulesArray) {

      //   console.log("controller action name  " + item.action);
      //   switch (item.action) {
      //     case "Dashboard": this.router.config.unshift({ path: item.action, component: DashboardComponent });//arr.push({ path: item.action, component: DashboardComponent })
      //       break;
      //     case "State": this.router.config.unshift({ path: item.action, component: StateComponent });//arr.push({ path: item.action, component: StateComponent })
      //       break;
      //     case "City": this.router.config.unshift({ path: item.action, component: CityComponent });//arr.push({ path: item.action, component: CityComponent })
      //       break;
      //     case "Warehouse":  this.router.config.unshift({ path: item.action, component: WarehouseComponent });//arr.push({ path: item.action, component: WarehouseComponent })
      //       break;
      //     case "Outbound":  this.router.config.unshift({ path: item.action, component: OutboundComponent });//arr.push({ path: item.action, component: OutboundComponent })
      //       break;
      //     case "Inbound":  this.router.config.unshift({ path: item.action, component: InboundComponent });//arr.push({ path: item.action, component: InboundComponent })
      //       break;
      //     case "StockTransfer": 
      //         this.router.config.unshift({ path: item.action, component: StockTransferComponent }); //arr.push({ path: item.action, component: LocationComponent })
      //       break;
      //       case "PurchaseOrder": 
      //       this.router.config.unshift({ path: item.action, component: PurchaseOrderComponent }); //arr.push({ path: item.action, component: LocationComponent })
      //     break;
      //     case "GRN": 
      //       this.router.config.unshift({ path: item.action, component: GRNComponent }); //arr.push({ path: item.action, component: LocationComponent })
      //     break;
      //     case "TransferOrder": 
      //       this.router.config.unshift({ path: item.action, component: TransferOrderComponent }); //arr.push({ path: item.action, component: LocationComponent })
      //     break;
      //     case "PurchaseReturn": 
      //       this.router.config.unshift({ path: item.action, component: PurchaseReturnComponent }); //arr.push({ path: item.action, component: LocationComponent })
      //     break;
      //     case "TransferReceiptNote": 
      //       this.router.config.unshift({ path: item.action, component: TransferReceiptNoteComponent }); //arr.push({ path: item.action, component: LocationComponent })
      //     break;

      //     case "StockAdjustment": 
      //       this.router.config.unshift({ path: item.action, component: StockAdjustmentComponent }); //arr.push({ path: item.action, component: LocationComponent })
      //     break;

      //     case "Stock": 
      //       this.router.config.unshift({ path: item.action, component: StockTransferComponent }); //arr.push({ path: item.action, component: LocationComponent })
      //     break;

      //   }
      //   // arr.push({ path: item.action, component: DashboardComponent})     

      //   // this.router.config.unshift(
      //   //   for item in arr
      //   //   arr[0]

      //   // );
      // }
      this.filterMenu(id);

      
     // this.router.config.unshift(arr);

    }, error => {
       LogUtils.showLog("error in fetching submenu  "+error.error.errorMessage);
       });
  }


  filterMenu(id: number) {
    //alert("filter menu called");
    let childMenu: Array<SubMenu> = [];
    this.subModulesArray1 = [];
    console.log("submodulesArray  "+JSON.stringify(this.subModulesArray) +"-- id->"+id);
    this.subModulesArray.forEach(menu => {
      let m: SubMenu1 = {
        "permissionId": 0,
        "module": "",
        "sequence": 0,
        "parentId": 0,
        "cssClass": "",
        "add": true,
        "edit": true,
        "delete": true,
        "import": true,
        "view": true,
        "controller": "",
        "action": "",
        "childrenss": []
      };
      if (menu.parentId == id) {
        this.subModulesArray.forEach(menu1 => {
          if (menu1.parentId == menu.permissionId)
            childMenu.push(menu1);

        });
        console.log("permission id inside filtermenu:- > " + menu.permissionId);
        m.permissionId = menu.permissionId;
        m.view = menu.view;
        m.action = menu.action;
        m.add = menu.add;
        m.controller = menu.controller;
        m.cssClass = menu.cssClass;
        m.delete = menu.delete;
        m.edit = menu.edit;
        m.import = menu.import;
        m.module = menu.module;
        m.parentId = menu.parentId;
        m.sequence = menu.sequence;
        m.childrenss = childMenu;

        this.subModulesArray1.push(m);

        childMenu = [];

      }
    } );
    //console.log(this.subModulesArray1);
  
    console.log("subModulesArray1  "+JSON.stringify(this.subModulesArray1) +"-- id->"+id);

    // let showingModuleSequenceNumb = this.subModulesArray1.filter(item => item.module == this.calledComponent)[0].sequence;
    // alert("showing module sequence number  "+showingModuleSequenceNumb);
     let menuTODisplay = "";
  
     if(this.calledComponent){
       menuTODisplay = this.subModulesArray.filter(item => item.action == this.calledComponent)[0].action;
       this.calledComponent = '';
     }else{
      this.moduleToShowActive = this.subModulesArray.filter(item => item.sequence === 1)[0].module;

      for(let menu of this.subModulesArray1)
      {
          if(menu.sequence===1){
             menuTODisplay='/'+menu.action;
             break;
          }
      }
     }
     
    //
    //alert("menuTodisplay  "+menuTODisplay);

    // if(this.calledComponent != ""){
    //   menuTODisplay='/'+menuTODisplay;
    // }else{
    //   for(let menu of this.subModulesArray1)
    // {
    //     if(menu.sequence===1)
    //        menuTODisplay='/'+menu.action;
    // }
    //}
    menuTODisplay='/'+menuTODisplay;
    //console.log("menuToDisplay:- > "+menuTODisplay);
    //alert("menuToDisplay:- > "+menuTODisplay);
    //alert("navigate to dashboard");
    this.router.navigate([menuTODisplay]);
  }
  

  logout() {
    this.authServiceObj.logOut();
    this.authServiceObj.subject.subscribe(value=>{
      this.authServiceObj.isLoggedIn=value;
      
    });
    
    //  window.location.reload();


  }

  public sideToggle(){
    // this.imageHide = !this.imageHide;
  this.sideToggleButton = !this.sideToggleButton; 
  this.sideToggleButtonArrow = !this.sideToggleButtonArrow;
  if(this.sideToggleButton === true){
    document.getElementById("content").classList.add("toggle1Class");
  }
  if(this.sideToggleButton === false){
    document.getElementById("content").classList.remove("toggle1Class");
  }
  // this.imageHide = !this.imageHide;
  console.log(' this.sideToggleButton',  this.sideToggleButton);
}
}