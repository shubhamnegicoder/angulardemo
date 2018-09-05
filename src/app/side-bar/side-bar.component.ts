import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  _sideBarModules: Array<any> = [];
  @Input() selectedModuleTitle: string = "Test"
  @Input() selectedModulee: string = '';

  selectedModule: string = '';
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  get sideBarModules() {
    return this._sideBarModules;
  }

  @Input()
  set sideBarModules(modules: Array<any>) {
    this._sideBarModules = modules;
    this.selectedModule = modules[0].module;
  }


  constructor() { }

  ngOnInit() {
  }

  focusMe(data) {
    this.selectedModule = data;
    this.selectedModulee = data;
  }
  toggleMenu(name) {
    switch (name) {
      case 'Inbound':
        document.getElementById('Inbound_id').className = 'showChild';
        document.getElementById('Outbound_id').className = 'hideChild';
        document.getElementById('Stock Transfer_id').className = 'hideChild';
        break;
      case 'Outbound':
        document.getElementById('Inbound_id').className = 'hideChild';
        document.getElementById('Outbound_id').className = 'showChild';
        document.getElementById('Stock Transfer_id').className = 'hideChild';
        break;
        case 'Stock Transfer' :
        document.getElementById('Inbound_id').className = 'hideChild';
        document.getElementById('Outbound_id').className = 'hideChild';
        document.getElementById('Stock Transfer_id').className = 'showChild';
        break;
        default:
        document.getElementById('Inbound_id').className = 'hideChild';
        document.getElementById('Outbound_id').className = 'hideChild';
        document.getElementById('Stock Transfer_id').className = 'hideChild';

    }

  }
}