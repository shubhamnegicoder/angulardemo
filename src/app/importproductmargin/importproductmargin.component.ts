import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../Core/common.service';
import { ImportproductmarginService } from '../Core/importproductmargin.service';
import swal from 'sweetalert2';
import { NgForm } from '../../../node_modules/@angular/forms';
import { ImportService } from '../Core/import.service';
import { LogUtils } from '../log-utils';
import { APP_SETTINGS } from '../Core/interface';
import { DownloadService } from '../Core/download.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-importproductmargin',
  templateUrl: './importproductmargin.component.html',
  styleUrls: ['./importproductmargin.component.css']
})
export class ImportproductmarginComponent implements OnInit {
 
  countrylist: Array<any>=[];
  statelist:Array<any>=[];
  citylist:Array<any>=[];
  citysinglecheck: boolean=false;
  categorylist:Array<any>=[];
  subcategorylist:Array<any>=[];
  brandlist:Array<any>=[];
  subbrandlist:Array<any>=[];
  productlist: Array<any>=[];
  productsinglecheck: boolean=false;
   cityids:Array<any>=[];
   allcheckedproduct: boolean=false;
  fileToUpload: any;
;
   productids:Array<any>=[];
   @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private importExcelService: ImportService,
    private commonservice:CommonService,private spinner:NgxSpinnerService,
    private importservice:ImportproductmarginService,private downloadService:DownloadService) { }
 
  importdetails={
      countryId:"",
      stateId:"",
      cityId:"",
      categoryId:"",
      subcategoryId:"",
      brandId:"",
      subbrandId:"",
      productnameId:""
  }

  resetForm(){
    this.importdetails.countryId = "";
    this.importdetails.stateId = "";
    this.importdetails.cityId = "";
    this.importdetails.categoryId = "";
    this.importdetails.subcategoryId = "";
    this.importdetails.brandId = "";
    this.importdetails.subbrandId = "";
    this.importdetails.productnameId = "";
  }
  closeModal2():  void {
    this.fileInput.nativeElement.value = '';
    
  }
  ngOnInit() {
      this.getallcountrylist();
      this.getallcategory();
      this.getallbrand();
      setTimeout(() => {
        this.spinner.hide();
    }, 5000);
  }

  public getallcountrylist()
  {
    this.commonservice.getAllCountry({"userId":"1"}).subscribe(res=>{
        
      this.countrylist=res.model;
    
    })
  }
  public selectstate(e)
  {
     this.commonservice.getRegionListFromCountryId(e.target.value,"1").subscribe(res=>{
       this.statelist=res.model;
     })
    
  }
  public selectcity(e)
  {
      this.commonservice.getCitiesFromStateId(e.target.value).subscribe(res=>{
           this.citylist=res.model;
      })
     this.citysinglecheck=false;
     this.cityids=[];
  }

  public allcheck(e)
  {  
    if(e.target.checked==true)
    {
      this.citysinglecheck=true;
        this.citylist.forEach((item)=>{
          this.cityids.push(item.id)
          item.citycheck=true;
        })

       

    }
    else if(e.target.checked==false)
    {
      this.citysinglecheck=false;
      this.citylist.forEach((item)=>{
        item.citycheck=false;
      })
      this.cityids=[];
   
    }
  }
  public singlecheck(e,name,id)
  { 
    if(e.target.checked==true)
    {
      if(this.cityids.length!==0)
      {
        this.citylist.forEach((item)=>{
          if(item.name==name &&item.id==id)
          {
            this.cityids.forEach((element)=>{
              if(element==id)
              { 
                return
              }
            })
            item.citycheck=true
            this.cityids.push(id)
          }  
     
        })
      }
      else
      {
         
        this.citylist.forEach((item)=>{
          if(item.name==name &&item.id==id)
          {
            item.citycheck=true
            this.cityids.push(id)
          }  
         
        })
      }
     
      
       
    }

    else if(e.target.checked==false)
    {
      this.citylist.forEach((item)=>{
        if(item.name==name &&item.id==id)
        { item.citycheck=false
          this.cityids.forEach((item,index)=>{
            
              if(item==id)
              { 
                this.cityids.splice(index,1);
               
              }
             
          })
        }
        
      })
      
    }
  }
  public getallcategory()
  {
    this.importservice.getcategoryall({"userId":"1"}).subscribe(res=>{
      this.categorylist=res.model;  
    })
  }
  public selectsubcategory(e)
  {
    this.importservice.getsubcategoryall({
      "requestedId":e.target.value,
      "userId":"1"
    }).subscribe(res=>{
      
      this.subcategorylist=res.model;
    })
  }
  public getallbrand()
  {
    this.importservice.getbrandall({"userId":"1"}).subscribe(res=>{
      this.brandlist=res.model;
    })
  }

  public selectsubbrand(e)
  {  this.productids=[];
    this.allcheckedproduct=false;
    if(this.productlist)
    {
      this.productlist.forEach((item)=>{
        item.singlecheck=false;
      })
    }
   
    
    let count=0;
    if(e.target.value)
    {
      this.importservice.getsubbrandall({
        "requestedId":e.target.value,
        "userId": "1"
      }).subscribe(res=>{
        this.subbrandlist=res.model;
      })
  }
    for(let keys in this.importdetails)
    {
      if (!this.importdetails["countryId"] || !this.importdetails["stateId"] || !this.importdetails["categoryId"])
      { 
          
        swal({
          title: "Error!",
          text: "Mandatory Feilds Are Empty",
          type: "warning",
        });
        count++;
      }
      
    }
    if(count==0)
    {
      this.importservice.getitemlist({"countryId":"",
      "regionId":"",
      "cityId":"",
      "brandId":this.importdetails.brandId,
      "subBrandId":this.importdetails.subbrandId,
      "categoryId":this.importdetails.categoryId,
      "subCategoryId":this.importdetails.subcategoryId,
      "itemId": ""}).subscribe(res=>{
        this.productlist=res.model;

       if(this.productlist)
       {
            for(let keys of this.productlist)
            {
              keys.singlecheck=false;
            }
       } 
        
      })


    }

  }

  public allproductcheck(e)
  { 
    if(e.target.checked==true)
    { this.allcheckedproduct=true;
      this.productlist.forEach((item)=>{
        item.singlecheck=true;
        this.productids.push(item.id)
      })
  
    }
    else if(e.target.checked==false)
    {   this.allcheckedproduct=false;
      this.productlist.forEach((item)=>{
        item.singlecheck=false;
      })
      this.productids=[];
 
    }
  }
  public singleproductcheck(e,name,id)
  {  

    if(e.target.checked==true)
    {

      if(this.productids.length!==0)
      {
        this.productlist.forEach((item)=>{
          if(item.name==name &&item.id==id)
          {
            this.productids.forEach((element)=>{
              if(element==id)
              { 
                return
              }
            })
            item.singlecheck=true;
            this.productids.push(id)
          }  
        
        })
      }
      else
      {
         
        this.productlist.forEach((item)=>{
          if(item.name==name &&item.id==id)
          {
            item.singlecheck=true
            this.productids.push(id)
          }  
         
        })
      }
      
    }

    else if(e.target.checked==false)
    {
      this.productlist.forEach((item)=>{
        if(item.name==name)
        {
          item.singlecheck=false;
        }
        
      })
      this.productlist.forEach((item)=>{
        if(item.name==name &&item.id==id)
        { item.singlecheck=false
          this.productids.forEach((item,index)=>{
            
              if(item==id)
              { 
                this.productids.splice(index,1);
                
              }
             
          })
        }
        
      })
     
    }

  }
  public exportitem(data:NgForm)
  {
    let count=0;
        for(let keys in data.controls)
        { 
          
         if(data.controls[keys].errors!=null)
         {
            if(data.controls[keys].errors.required==true)
            { 
                swal({
                  title: 'Mandatory Feilds are Empty',
                  text: 'Error',
                  type: 'warning'
                })
              count+=1;
              
            }
         }

        } 
       
        if(count==0)
        { 
          let data={
            
              "countryId": this.importdetails.countryId,
              "regionId": this.importdetails.stateId,
              "cityId": this.cityids.toString(),
              "brandId": this.importdetails.brandId,
              "subBrandId":this.importdetails.subbrandId,
              "categoryId": this.importdetails.categoryId,
              "subCategoryId":this.importdetails.subcategoryId,
              "itemId":this.productids.toString()
            
          }
          
        
           swal({
         title: 'Are you sure?',
         text: 'Import details will be submitted !',
         type: 'warning',
         showCancelButton: true,
          confirmButtonText: 'Yes',
         cancelButtonText: 'No'
        }).then((result) => {
         if (result.value) {
          this.spinner.show();
          this.importservice.exportitem(data).subscribe(res=>{
              
                if(res.didError==false)
                {

                  if(res.model.filePath){
                    
                   
                    let fileName = APP_SETTINGS.base_url+ res.model.filePath;
            
              
                    let arr=fileName.split("/");
                    let downloadedFileName=arr[arr.length-1];
                    this.downloadService.downloadFile(fileName).subscribe(res=>{
                        if(res){
                          
                          LogUtils.saveAsExcelFile(res,downloadedFileName);
                          this.spinner.hide();
                        }
                    });

                  }
               
                    swal({
                      title: 'Success',
                      text:  res.model.statusMessage,
                      type: 'success'
                    });
              //  this.router.navigate(["/Warehouse"])
             }
             else if(res.didError==true)
             { 
              this.spinner.hide();
              swal({
                title: 'Error',
                text: 'Error in Import',
                type: 'warning'
              })
           }
           },error=>{
            this.spinner.hide();
             swal(error.error.message);
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


  importAsXLSX() {

   
    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      this.fileToUpload = fi.files[0];
    }
    this.spinner.show();
    this.importExcelService.uploadBrand(this.fileToUpload, 1,'api/ItemMargin/Import').subscribe(res => {

      if (res) {
        // show swal showing total number of records uploaded
        // and download file from url
        if (!res.didError) {
          this.spinner.hide();
          this.closeModal2();
         
          let  msgToDisplay = res.model.successCount + '  out of '+res.model.totalCount+' total Records imported successfully.';
          
          swal({
            title: 'Result',
            text: msgToDisplay,
            type: "success",
            showCancelButton: false,
            confirmButtonText: 'OK',
            footer: '<a href="http://103.12.132.77:6002/'+res.model.filePath+'" >click here to download details</a>'
          }).then((result) => {
          
            if (res.model.filePath !== null && res.model.filePath) {

               //this.getAllProduct();
              // this.downloadService.downloadFile(res.model.filePath).subscribe(res1 => {
             
              //   LogUtils.saveAsExcelFile(res1, 'ImportBrandResult.xlsx');

              // }, err => {
            
              // })

            }
          })


        } else {
          // handle here the error condition
          this.spinner.hide();
          swal({
            title: 'Result',
            text: res.message,
            type: "error",
            showCancelButton: false,
            confirmButtonText: 'OK'
          })

        }


      }
    }, (err: any) => {
      

     LogUtils.showLog("upload error response:-> " + err.error);
     
     this.spinner.hide();
      swal({
        title: 'Result',
        text: err.message,
        type: "error",
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    });
  }
}

