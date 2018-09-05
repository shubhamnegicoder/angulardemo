export interface IUserLogin {
  username: string;
  password: string;
}

export interface StateListModal {
  code: string,
  countryName: string,
  countryId: string,
  id: string,
  name: string,
  isActive: string
}

export let APP_SETTINGS = {
  base_url: 'http://103.12.132.77:6002/',
  printBase_url:'https://cors-anywhere.herokuapp.com/http://103.12.132.77:6002/'
  
}

export let Api_Urls={

  login:'api/User/Login',
  GetAllSaItems:'api/TransferOrder/GetAllSAItems',
  CreateSA:'api/TransferOrder/CreateSA',
  GetBrandList:'api/Brand/GetBrandList',
  CreateBrand:'api/Brand/Save',
  changeBrandStatus:'api/Brand/ChangeStatus',
  GetAllBrands:'api/Brand/GetAll'
}
export interface Product {
  uom: string;
  price: string;
  barCode: string;
  hsnCode: string;
  taxPercentage: string;
  margin: string;
  landingPrice: string;
  basePrice: string;
  amount: string;
  stock: string;
  quantity: string;
  conversion: number;
  departmentId: string;
  companyId: string;
  productTypeId: string;
  brandId: string;
  categorId: string;
  uomId: number;
  taxId: string;
  subBrandId: string;
  subCategoryId: string;
  id: number;
  name: string;
  isActive: number;
  categoryName: string;
  brandName: string;
}
export interface SubMenu {
  "permissionId": number;
  "module": string;
  "sequence": number;
  "parentId": number;
  "cssClass": ""
  "add": boolean;
  "edit": boolean;
  "delete": boolean;
  "import": boolean;
  "view": boolean;
  "controller": string;
  "action": string;

}
export interface SubMenu1 {
  "permissionId": number;
  "module": string;
  "sequence": number;
  "parentId": number;
  "cssClass": "";
  "add": boolean;
  "edit": boolean;
  "delete": boolean;
  "import": boolean;
  "view": boolean;
  "controller": string;
  "action": string;
  "childrenss": Array<SubMenu>;
}
export interface MainModules {
  permissionId: number;
  module: string;
  sequence: number;
  cssClass: string;
  controller: string;
  action: string;

}

export interface chartDataItem {
  type: string;
  open: number;
  cancelled: number;
  closed: number;

}

export interface ChartData {
  ib: string;
  ob: string;
  ibStatus: Array<chartDataItem>;
  obStatus: Array<chartDataItem>;
}

export interface brand {
  id: number;
  name: string;
  isActive: number;
}
export interface Category {
  id: number;
  name: string;
  isActive: number;
}
export interface UOM {
  id: number;
  name: string;
  isActive: number;
}
export interface Tax {
  id: number;
  name: string;
  isActive: number;
}
export interface Department {
  id: number;
  name: string;
  isActive: number;
}
export interface Company {
  id: number;
  name: string;
  isActive: number;
}
export interface ProductType {
  id: number;
  name: string;
  isActive: number;
}
export interface createPoMenu {
  itemId: string;
  quantity: number;
  sessionId: string;
  itemExpiryDate: string;
}
export interface grn{
  itemId: string;
  itemName: string;
  conversion: number;
  poQuantity: number;
  basePrice: number;
  netAmount: number;
  warehouseName: string;
  vendorName: string; 
  poCode: string;
  date: string;
  invoiceNo: string;
  invoiceDate: string;
  status: boolean;
  quantity: number;
  releasedBy: string;
  releasedOn: string;
  hsnCode: string;
  code: string;
  poId: string;
  price: number;

}
export interface trnmismatch{
name: string;
id:number;
address1: string;
address2: string;
billingAddress1: string;
billingAddress2: string;
billingCINNo: string;
billingCityId: string;
billingCountryId: string;
billingEmail:string;
billingGSTIN: string;
billingPOBox: string;
billingPhone: string;
billingStateId: string;
cityName: string;
countryName: string;
isActive: boolean;
mainWarehouse: boolean;
panNo: string;
phone: string;
poBox: string;
regionName: string;
shippingAddress1: string;
shippingAddress2: string;
shippingCINNo: string;
shippingCityId: string;
shippingCountryId: string;
shippingEmail: string;
shippingGSTIN: string;
shippingPOBox: string;
shippingPhone: string;
shippingStateId: string;
userId: string;
}

export interface releasetrnmismatch{
  code: string;
  date: string;
  transferOrderCode: string;
  boxCount: string;
  fromWHId: string;
  fromWHName: string;
  releasedBy: string;
  releasedByName: string;
  releasedOn: string;
  status: string;
  transferReceiptNoteDetailViewModels: any;
  toWHId: string;
  toWHName: string;
  transferOrderId: string;
  transferType: string;
  trnCode: string;
  trnId: string; 
}