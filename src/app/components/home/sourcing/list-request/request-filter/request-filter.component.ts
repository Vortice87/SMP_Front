import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-filter',
  templateUrl: './request-filter.component.html',
  styleUrls: ['./request-filter.component.css']
})
export class RequestFilterComponent implements OnInit {

  public titulo: string;
  public solicitante: string;
  public tecnologia: string;
  public descripcxion: string;
  public fechaAlta: string;
  public estado: string = '';
  public estados: Array<string> = ['Nueva', 'En proceso', 'Cerrada', 'Abierta'];

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  constructor() {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
  }

}
