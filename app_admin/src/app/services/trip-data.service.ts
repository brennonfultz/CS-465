import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';



@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private apiBaseUrl = 'http://localhost:3000/api/';
  url = 'http://localhost:3000/api/trips';

  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    //console.log('Inside TripDatService::getTrips');
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    //console.log('Inside TripDatService::updateTrips');
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong.', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
    }
   public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
    }
   private makeAuthApiCall(urlPath: string, user: User):
   Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
    .post<AuthResponse>(url, user)
    .toPromise()
    .then(response => {
      if (!response) {
        throw new Error('No response received');
      }
      return response;
    })
    .catch(this.handleError);
} 
   
  

}
