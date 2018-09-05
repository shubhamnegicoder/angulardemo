import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthService } from './Core/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationComponent } from './location/location.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { OutboundComponent } from './outbound/outbound.component';
import { InboundComponent } from './inbound/inbound.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { GRNComponent } from './grn/grn.component';
import { TransferOrderComponent } from './transfer-order/transfer-order.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { TransferReceiptNoteComponent } from './transfer-receipt-note/transfer-receipt-note.component';
import { StockAdjustmentComponent } from './stock-adjustment/stock-adjustment.component';
import { PurchasedOrderService } from './Core/purchased-order.service';
import { PageService } from './Core/page.service';
import { GrnService } from './Core/grn.service';
import { ChartComponent } from './chart/chart.component';
import {ChartsModule} from 'ng2-charts';
import { ChartService } from './Core/chart.service';
import { TransferOrderService } from './Core/transfer-order.service';
import { CommonService } from './Core/common.service';
import { TransferReceiptNoteService } from './Core/transfer-receipt-note.service';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanactivateGuard } from './Core/canactivate.guard';
import { PurchasedReturnService } from './Core/purchased-return.service';
import { AddWarehouseComponent } from './add-warehouse/add-warehouse.component';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CreatePoComponent } from './create-po/create-po.component';
import { CreatePoService } from './Core/create-po.service';
import { CreateGrnComponent } from './create-grn/create-grn.component';
import { EditWarehouseComponent } from './edit-warehouse/edit-warehouse.component';
import { BrandService } from './Core/brand.service';
import { ProductTypeComponent } from './product/product-type/product-type.component';
import { BrandComponent } from './product/brand/brand.component';
import { SubBrandComponent } from './product/sub-brand/sub-brand.component';
import { CategoryComponent } from './product/category/category.component';
import { SubCategoryComponent } from './product/sub-category/sub-category.component';
import { CompanyComponent } from './product/company/company.component';
import { DepartmentComponent } from './product/department/department.component';
import { TaxComponent } from './product/tax/tax.component';
import { ProductTypeService } from './Core/product-type.service';
import { SubBrandService } from './Core/sub-brand.service';
import { StockService } from './Core/stock.service';
import { EditGrnComponent } from './edit-grn/edit-grn.component';
import { ViewGrnComponent } from './view-grn/view-grn.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddstockadjustmentComponent } from './addstockadjustment/addstockadjustment.component';
// import { EditGrnComponent } from './edit-grn/edit-grn.component';
// import { ViewGrnComponent } from './view-grn/view-grn.component';

import { EditpoService } from './Core/editpo.service';
import { EditpoComponent } from './editpo/editpo.component';
import { CreatePurchaseReturnComponent } from './create-purchase-return/create-purchase-return.component';
import { CreateToComponent } from './create-to/create-to/create-to.component';
import { EditproComponent } from './editpro/editpro.component';
import { EdittrnComponent } from './transfer-receipt-note/edittrn/edittrn.component';
import { TrnmismatchComponent } from './trnmismatch/trnmismatch.component';
import { MasterVndorComponent } from './product/master-vndor/master-vndor.component';
import { AddVendComponent } from './product/master-vndor/add-vend/add-vend.component';
import { EditVendComponent } from './product/master-vndor/edit-vend/edit-vend.component';
import { ProductMarginComponent } from './product/product-margin/product-margin.component';
 import { ReleasetrnmismatchComponent } from './releasetrnmismatch/releasetrnmismatch.component';
import { MachineComponent } from './machine/machine.component';
import { SaleOrderComponent } from './machine/sale-order/sale-order.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CreateSalesOrderComponent } from './machine/create-sales-order/create-sales-order.component';
import { ReorderPoComponent } from './reorder-po/reorder-po.component';
import { NocommanumberPipe } from './nocommanumber.pipe';
import { CreateMachineComponent } from './machine/create-machine/create-machine.component';
import { EditMachineComponent } from './machine/edit-machine/edit-machine.component';
import { MaintainStockComponent } from './warehouse/maintain-stock/maintain-stock.component';
import { EditstockadjustmentComponent } from './editstockadjustment/editstockadjustment.component';
import { CountryComponent } from './country/country.component';
import { ImportproductmarginComponent } from './importproductmargin/importproductmargin.component';
import { EditSoComponent } from './machine/edit-so/edit-so.component';
import {EditToComponent} from './edit-to/edit-to.component';
import { EditToService } from './Core/edit-to.service';
import { ViewpoComponent } from './viewpo/viewpo.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ViewstockComponent } from './viewstock/viewstock.component';



const appRoutes:Routes=[{path:'' ,component:AppComponent},{path:'Login' ,component:LoginComponent},{path:'Dashboard' ,component:DashboardComponent},
{path:'State' ,component:StateComponent},{path:'City' ,component:CityComponent},{path:'Country' ,component:CountryComponent},
{path:'Product' ,component:ProductComponent},{path:'ProductMargin' ,component:ProductMarginComponent},
{ path:'ProductMargin/importproductmargin', component: ImportproductmarginComponent},
{path:'Brand' ,component:BrandComponent},{path:'Category' ,component:CategoryComponent},
{path:'SubBrand' ,component:SubBrandComponent},{path:'Subcategory' ,component:SubCategoryComponent},
{path:'ProductType' ,component:ProductTypeComponent},
{path:'Vendor' ,component:MasterVndorComponent},{ path:'Vendor/addVendor', component: AddVendComponent},
{ path:'Vendor/editVendor/:vid', component: EditVendComponent},
{path:'Company' ,component:CompanyComponent},{path:'Department' ,component:DepartmentComponent},
{path:'Tax' ,component:TaxComponent},{path:'Warehouse' ,component:WarehouseComponent},
{ path: "Warehouse/addWarehouse", component: AddWarehouseComponent},{ path: "Warehouse/editWarehouse/:id", component: EditWarehouseComponent},
{ path: "Warehouse/maintainStock/:id", component: MaintainStockComponent},
{path:'Machine' ,component:MachineComponent},{ path:'Machine/addMachine', component: CreateMachineComponent},
{ path:'Machine/editMachine/:id', component: EditMachineComponent},
{path:'TRNMismatch' ,component:TrnmismatchComponent},{ path: 'TRNMismatch/ReleaseTrnMismatch/:trnId', component: ReleasetrnmismatchComponent},
{path:'PurchaseOrder' ,component:PurchaseOrderComponent},{ path: 'PurchaseOrder/CreatePo', component:CreatePoComponent},
{ path: 'PurchaseOrder/editPo/:poid', component:EditpoComponent},{ path: 'PurchaseOrder/viewPo/:poid', component:ViewpoComponent},{ path: 'PurchaseOrder/ReOrderPo/:poid', component:ReorderPoComponent},
{path:'GRN' ,component:GRNComponent},{ path: 'GRN/CreateGrn', component: CreateGrnComponent},
{ path: 'GRN/EditGrn/:grnId', component: EditGrnComponent},{ path: 'GRN/ViewGrn/:grnId', component: ViewGrnComponent},
{path:'PurchaseReturn' ,component:PurchaseReturnComponent}, { path: 'PurchaseReturn/createPR', component: CreatePurchaseReturnComponent },
{ path: 'PurchaseReturn/editPR/:proId', component: EditproComponent },
{path:'TransferOrder' ,component:TransferOrderComponent},{path: 'TransferOrder/CreateTo', component: CreateToComponent},
{path: 'TransferOrder/CreateTo', component: CreateToComponent},{path: 'TransferOrder/editTo/:id', component: EditToComponent},
{ path: 'TransferReceiptNote', component: TransferReceiptNoteComponent},{ path: 'TransferReceiptNote/manageTRN/:trnId', component: EdittrnComponent},
{ path: 'StockAdjustment', component: StockAdjustmentComponent},{ path: 'StockAdjustment/Addstock', component: AddstockadjustmentComponent}, 
{ path: 'StockAdjustment/Editstockadjustment/:id', component: EditstockadjustmentComponent},
{ path: 'StockAdjustment/viewstockadjustment/:id', component: ViewstockComponent},
{ path: 'Stock', component: StockTransferComponent},
{ path:'Product', component: ProductComponent}, { path:'Product/addProduct', component: AddproductComponent},
{ path: 'SalesOrder', component: SaleOrderComponent}, { path: 'SalesOrder/createSO', component: CreateSalesOrderComponent},
{ path: 'Product/EditProduct/:id', component: EditProductComponent},
]; 

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    DashboardComponent,
    LocationComponent,
    SideBarComponent,
    StateComponent,
    CityComponent,
    EditToComponent,
    WarehouseComponent,
    OutboundComponent,
    InboundComponent,
    StockTransferComponent,
    PurchaseOrderComponent,
    GRNComponent,
    TransferOrderComponent,
    PurchaseReturnComponent,
    TransferReceiptNoteComponent,
    StockAdjustmentComponent,
    ChartComponent,
    LoginComponent,
    AddWarehouseComponent,
    ProductComponent,
    AddproductComponent,
    CreatePoComponent,
    CreateGrnComponent,
    ProductTypeComponent,
    BrandComponent,
    SubBrandComponent,
    CategoryComponent,
    SubCategoryComponent,
    CompanyComponent,
    DepartmentComponent,
    TaxComponent,
    EditWarehouseComponent,
    AddstockadjustmentComponent,
     ViewGrnComponent,
  MasterVndorComponent,
  AddVendComponent,
  EditVendComponent,
  ProductMarginComponent,
    EditGrnComponent,
    ViewGrnComponent,
    EditWarehouseComponent,
    EditpoComponent,
    CreatePurchaseReturnComponent,CreateToComponent,
    EditWarehouseComponent,
    CreatePurchaseReturnComponent,
    EditproComponent,
    CreateToComponent,
    EdittrnComponent,
    TrnmismatchComponent,
    ReleasetrnmismatchComponent,
    EditstockadjustmentComponent,
    CreateSalesOrderComponent,
    ReorderPoComponent ,
    CreateMachineComponent,
    SaleOrderComponent,
    MachineComponent,
    CreateSalesOrderComponent,
    ReorderPoComponent,
    NocommanumberPipe,
    EditMachineComponent,
    MaintainStockComponent,EditstockadjustmentComponent, CountryComponent,ImportproductmarginComponent,EditSoComponent,ViewpoComponent,
    EditProductComponent,
    ViewstockComponent,
    EditProductComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
      NgxSpinnerModule
  ],
  providers: [AuthService,EditToService,PurchasedOrderService,PageService,BrandService,ProductTypeService,SubBrandService,StockService,GrnService,ChartService,PurchasedReturnService,TransferOrderService,CommonService,TransferReceiptNoteService,CanactivateGuard,CreatePoService,EditpoService],
  entryComponents: [
    ViewpoComponent,
    EditToComponent,
    ReorderPoComponent,
    CreateSalesOrderComponent,
    MachineComponent,
    SaleOrderComponent,
    LoginComponent,
    DashboardComponent,
    LocationComponent,
    StateComponent,
    CityComponent,
    WarehouseComponent,
    OutboundComponent,
    InboundComponent,
    StockTransferComponent,
    PurchaseOrderComponent,
    GRNComponent,
    TransferOrderComponent,
    PurchaseReturnComponent,
    TransferReceiptNoteComponent,
    StockAdjustmentComponent,
    ChartComponent,
    AddWarehouseComponent,
    ProductComponent,
    AddproductComponent,
    CreatePoComponent,
    CreateGrnComponent,
    EditWarehouseComponent,
    ProductTypeComponent,
    BrandComponent,
    ViewGrnComponent,
    SubBrandComponent,
    CategoryComponent,
    TrnmismatchComponent,
    AddstockadjustmentComponent,
    EditGrnComponent,
    SubCategoryComponent,CompanyComponent,DepartmentComponent,TaxComponent,
    CreateToComponent,
    SubCategoryComponent,CompanyComponent,DepartmentComponent,TaxComponent,
    EditpoComponent,
    CreatePurchaseReturnComponent,CreateToComponent,
    EditproComponent,
    CreatePurchaseReturnComponent,EdittrnComponent,MasterVndorComponent,
    AddVendComponent,
    EditVendComponent,ProductMarginComponent,ReleasetrnmismatchComponent,
    EditstockadjustmentComponent,
    CreateSalesOrderComponent,
    ReorderPoComponent,
    CreateMachineComponent,
    SaleOrderComponent,
    MachineComponent,
    EditMachineComponent,MaintainStockComponent,EditstockadjustmentComponent,CountryComponent,
    ImportproductmarginComponent,EditSoComponent,
    EditProductComponent,ViewstockComponent
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
