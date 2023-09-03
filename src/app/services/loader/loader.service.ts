import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private loaders: number[] = [];
  private loadersAction: BehaviorSubject<number[]> = new BehaviorSubject(
    this.loaders
  );
  isLoader$: Observable<boolean> = this.loadersAction.asObservable().pipe(
    map((loaders) => {
      return loaders.length > 0;
    })
  );
  show(): number {
    const loaderId = new Date().getTime();
    this.loaders.push(loaderId);
    this.loadersAction.next(this.loaders);
    return loaderId;
  }
  hide(loaderId: number) {
    this.loaders = this.loaders.filter((id) => id != loaderId);
    this.loadersAction.next(this.loaders);
  }
}
