import { Component, OnInit } from '@angular/core';
import { DatatableService } from './datatable.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  constructor(private dtService: DatatableService) { }

  ngOnInit() {
    this.dtService.getCryptos().subscribe(
      (response) => {
        console.log(response);
        console.log(this.dtService.data);
      }, error => {
        console.log(error);
      }
    )
    
  }

}
