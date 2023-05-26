import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/core/models/employee.model';



export function createHttpObservable(url: string, token?: string) : Observable<IEmployee[]> {
    return Observable.create((observer:any) => {
        fetch(url, {
          method: 'GET', 
          headers: {
            'Authorization': `Bearer ${token!}`
          },
        })
          .then(response => {
            return response.json();
          })
          .then(body => {
            observer.next(body);
            observer.complete();
          })
          .catch(err => {
            observer.error(err);
          })
      });
}
//May not need this, i think UUID has validate function
export function validateUUID(uuid: string):boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}
export function camelToSnakeCase(str: string) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}
export function snakeToCamelCase(str: string) {
    return str.replace(/[-_][a-z]/ig, letter => `${letter.toUpperCase()}`).replace('_', '');
}