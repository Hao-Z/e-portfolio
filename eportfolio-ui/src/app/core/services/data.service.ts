import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getIndustry() { 
    return of([
      { label: "Computer Games", value: "computerGames" },
      { label: "Computer Hardware", value: "computerHardware" },
      { label: "Computer Networking", value: "computerNetworking" },
      { label: "Computer Software", value: "computerSoftware" },
      { label: "Information Technology", value: "informationTechnology" }
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
