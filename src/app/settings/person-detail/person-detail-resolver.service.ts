import {Injectable} from '@angular/core';
import {Person} from '../../shared/person';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PeopleService} from '../../people.service';
import {map, take} from 'rxjs/internal/operators';

@Injectable(
  // {providedIn: SettingsModule}
)
export class PersonDetailResolver implements Resolve<Person> {

  constructor(private personService: PeopleService, private router: Router) {
  }

  // https://angular.io/guide/router#fetch-data-before-navigating
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Person> | Promise<Person> | Person {
    const key = route.paramMap.get('key');

    if (key === 'new') {
      return this.personService.createPerson().pipe(
        take(1),
        map(person => {
          if (person) {
            return person;
          } else { // key not found
            this.router.navigate(['/dashboard']);
            return null;
          }
        })
      );
    }

    return this.personService.getPersonDetails(key).pipe(
      take(1),
      map(person => {
        if (person) {
          return person;
        } else { // key not found
          this.router.navigate(['/dashboard']);
          return null;
        }
      })
    );
  }
}
