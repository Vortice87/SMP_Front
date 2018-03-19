import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguagesRequest } from '../../../../../models/languagesRequest';

@Component({
  selector: 'app-new-row-lang',
  templateUrl: './new-row-lang.component.html',
  styleUrls: ['./new-row-lang.component.css']
})
export class NewRowLangComponent implements OnInit {

  @Input("row")
  public row: LanguagesRequest;

  @Output("deleting")
  public deleting: EventEmitter<number> = new EventEmitter<number>();
  
  langs: string[] = ["Language 1", "Language 2", "Language 3"];
  levels: string[] = ["Bajo", "Medio", "Alto"];
  reqdes: string[] = ["Required", "Desireable"];
  
  constructor() { }

  ngOnInit() {
  }

  toClearLang(): void {
    if (this.row.language == "") {
      this.row.level = "";
      this.row.reqdes = "";
    }
  }

}
