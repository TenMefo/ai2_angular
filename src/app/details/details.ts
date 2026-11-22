import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { catchError, from, map, of, startWith, switchMap } from 'rxjs';
import { Housing } from '../housing';
import { HousingLocationInfo } from '../housinglocation';

type DetailsState =
  | { status: 'loading' | 'missing' | 'error' }
  | { status: 'ready'; location: HousingLocationInfo };

@Component({
  selector: 'app-details',
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  private readonly route = inject(ActivatedRoute);
  private readonly housingService = inject(Housing);
  protected readonly details = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id === null || !/^\d+$/.test(id)) return of<DetailsState>({ status: 'missing' });

        return from(this.housingService.getHousingLocationById(Number(id))).pipe(
          map((location): DetailsState => location ? { status: 'ready', location } : { status: 'missing' }),
          catchError(() => of<DetailsState>({ status: 'error' })),
          startWith({ status: 'loading' } as DetailsState),
        );
      }),
    ),
    { initialValue: { status: 'loading' } as DetailsState },
  );
}
