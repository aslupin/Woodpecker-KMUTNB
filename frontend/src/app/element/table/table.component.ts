import { Component, OnInit, OnDestroy } from '@angular/core';

import { PM } from "../PM.model";
import { ElementService } from '../element.service';
import { Subscription } from "rxjs";
import { PageEvent } from '@angular/material';
@Component({
  selector: 'element-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  constructor(public elementService: ElementService) { }
  isLoading = false;
  PMs: PM[] = [];
  totalPMs = 0;
  PMsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 20, 50, 100];
  displayedColumns: string[] = ['Date', 'AC1', 'AC2'];
  dataSource = this.PMs ;
  private PMSub: Subscription;

  ngOnInit() {
    this.isLoading = true;
    this.elementService.getPMs(this.PMsPerPage, this.currentPage);
    this.PMSub = this.elementService
      .getPMUpdateListener()
      .subscribe((PMData: { PMs: PM[]; PMCount: number }) => {
        this.isLoading = false;
        this.totalPMs = PMData.PMCount;
        this.PMs = PMData.PMs;
      });
  }
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.PMsPerPage = pageData.pageSize;
    this.elementService.getPMs(this.PMsPerPage, this.currentPage);
  }
  ngOnDestroy() {
    this.PMSub.unsubscribe();
  }

}
