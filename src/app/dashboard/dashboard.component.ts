import { Component, OnInit } from '@angular/core';
import { ChartData } from '../Core/interface';
import { ChartService } from '../Core/chart.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../Core/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartData:ChartData={
    ib:'Inbound',
    ob:'Outbound',
    ibStatus:[],
    obStatus:[]


  }
  constructor(private chartService:ChartService,private spinner: NgxSpinnerService,private commonService:CommonService) { }

  ngOnInit() {
    this.commonService.setTitle('IMS-Dashboard');
    this.loadData();
  }

  loadData()
  {
    this.spinner.show();
    this.chartService.getChartData().subscribe(response=>{
      this.spinner.hide();
        if(!response.didError)
        {
          this.chartData.ib='Inbound';
          this.chartData.ob='Outbound';
          
          this.chartData.ibStatus=response.model.ibStatus;
          this.chartData.obStatus=response.model.obStatus;
        }else{
          //alert(response.errorMessage);
        }

    },err=>{
      this.spinner.hide();
    });
  }
}
