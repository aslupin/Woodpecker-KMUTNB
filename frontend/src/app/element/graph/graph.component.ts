import { Component, OnInit, OnDestroy } from "@angular/core";

import { PM } from "../PM.model";
import { ElementService } from "../element.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material";

@Component({
  selector: "element-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"]
})
export class GraphComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements: {
      point:{
          radius: 0
      }}
  };


  public barChartLebels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  public barChartType = "line";
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: "AC1" },
    { data: [], label: "AC2" }

  ];
  constructor(public elementService: ElementService) {}

  totalACs = 0;
  ACsPerPage = 100;
  currentPage = 1;
  pageSizeOptions = [5, 10, 20, 50, 100,1000,10000];
  isLoading = false;

  AC1:string[] = [];
  AC2:string[] = [];
  DT:string[] = [];
  private ACSub : Subscription;
  ngOnInit() {
    this.isLoading = true;
    this.elementService.getACs(this.ACsPerPage, this.currentPage);
    this.ACSub = this.elementService
      .getACUpdateListener()
      .subscribe((ACData: { AC1: string[]; AC2:string[]; DT:string[]; ACCount: number }) => {
        this.isLoading =false;
        this.AC1 = ACData.AC1;
        this.AC2 = ACData.AC2;
        this.DT = ACData.DT;
        this.totalACs = ACData.ACCount;
        this.barChartLebels = this.DT;
        this.barChartData = [{ data: this.AC1, label: "AC1" },{ data: this.AC2, label: "AC2" }];
      });

  }
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.ACsPerPage = pageData.pageSize;
    this.elementService.getACs(this.ACsPerPage, this.currentPage);
  }
  ngOnDestroy() {
    this.ACSub.unsubscribe();
  }
}
