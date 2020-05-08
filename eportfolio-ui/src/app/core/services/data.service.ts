import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getIndustry() { 
    return of([
      { label: "Computer Games", value: "Computer Games" },
      { label: "Computer Hardware", value: "Computer Hardware" },
      { label: "Computer Networking", value: "Computer Networking" },
      { label: "Computer Software", value: "Computer Software" },
      { label: "Information Technology", value: "Information Technology" }
    ])
  }

  getGender() {
    return of([
      { value: 'MALE', label: 'Male' },
      { value: 'FEMALE', label: 'Female' },
      { value: 'OTHER', label: 'Other' },
    ])
  }

}
