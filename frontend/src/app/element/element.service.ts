import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

import { PM } from "./PM.model";
import { environment } from "src/environments/environment";
const BACKEND_URL = environment.apiUrl + "/PM";
const AC_URL = BACKEND_URL + "/AC";
@Injectable({ providedIn: "root" })
export class ElementService {
  constructor(public http: HttpClient, private router: Router) {}

  // TABLE
  private PMs: PM[] = [];
  private PMsUpdated = new Subject<{ PMs: PM[]; PMCount: number }>();
  getPMs(PMsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${PMsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; PMs: any; maxPMs: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(PMData => {
          return {
            PMs: PMData.PMs.map(PM => {
              return {
                id: PM._id,
                AC1: PM.AC1,
                AC2: PM.AC2,
                DT: PM.DT
              };
            }),
            maxPMs: PMData.maxPMs
          };
        })
      )
      .subscribe(transfrormedPostData => {
        this.PMs = transfrormedPostData.PMs;
        this.PMsUpdated.next({
          PMs: [...this.PMs],
          PMCount: transfrormedPostData.maxPMs
        });
      });
  }
  getPMUpdateListener() {
    return this.PMsUpdated.asObservable();
  }

  //GRAPH
  private ACs:any ;
  private ACsUpdated = new Subject<{ AC1: string[],AC2: string[] ,DT:string[], ACCount: number}>();
  getACs(ACsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${ACsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; ACs: any;maxACs: number }>(AC_URL + queryParams )
      .pipe(
        map(ACData => {
          return {
            AC1: ACData.ACs.map(AC => {
              return AC.AC1;
            }),
            AC2: ACData.ACs.map(AC => {
              return AC.AC2;
            }),
            DT: ACData.ACs.map(AC => {
              return AC.DT;
            }),
            maxACs: ACData.maxACs
          };
        })
      )
      .subscribe(Data => {
        this.ACs = Data;
        this.ACsUpdated.next({
          AC1: [...this.ACs.AC1],
          AC2: [...this.ACs.AC2],
          DT: [...this.ACs.DT],
          ACCount: Data.maxACs
        });
      });
  }
  getACUpdateListener() {
    return this.ACsUpdated.asObservable();
  }
}
