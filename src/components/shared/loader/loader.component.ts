import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ServicesService } from '../../../services.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  color = 'warn';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.ServicesService.isLoading;

  constructor(private ServicesService: ServicesService ) { }

  ngOnInit() {
  }

}
