import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ReqFunctional } from '../../../../../models/reqFunctional';

@Component({
  selector: 'app-new-row-req-funct',
  templateUrl: './new-row-req-funct.component.html',
  styleUrls: ['./new-row-req-funct.component.css']
})
export class NewRowReqFunctComponent implements OnInit {

  @Input('row')
  public row: ReqFunctional;

  @Output('deleting')
  public deleting: EventEmitter<number> = new EventEmitter<number>();

  @Output('validateNow')
  public validateNow: EventEmitter<boolean> = new EventEmitter<boolean>();

  functionalScope: string[] = ["ALHAMBRA - AGENTS", "ALHAMBRA - CHANNELS"];
  nResources: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  reqdes: string[] = ["Required", "Desireable"];


  constructor() { }

  ngOnInit() {
  }

  public isValidRow(): void {
    this.validateNow.emit(true);
  }

  mostrar():void{
    console.log(this.row);
  }

}
