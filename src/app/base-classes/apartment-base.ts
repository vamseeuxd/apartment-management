import { Observable, from, of, map, mergeMap } from 'rxjs'
import { inject } from '@angular/core'
import { ApartmentsByUserService } from '../services/apartments/ApartmentsServiceByUser'
import { ActivatedRoute } from '@angular/router'
import { IApartment } from '../interfaces/IApartment'
import { LoaderService } from '../services/loader/loader.service'

export class ApartmentBase {
  apartmentsService: ApartmentsByUserService = inject(ApartmentsByUserService)
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  loader: LoaderService = inject(LoaderService)
  apartment$: Observable<IApartment> = this.activatedRoute.params.pipe(
    mergeMap((params: any) => {
      const loaderId = this.loader.show()
      return params.apartmentId
        ? from(this.apartmentsService.getApartment(params.apartmentId)).pipe(
            map((data) => {
              this.loader.hide(loaderId)
              return data
            }),
          )
        : of(null)
    }),
  )
}
