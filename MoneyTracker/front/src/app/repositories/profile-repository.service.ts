import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileRepositoryService {

  constructor() { }

  private profileKey: string = "PROFILE-KEY"

  getProfile(): Profile {
    let json: string = localStorage.getItem(this.profileKey);
    if (json == null) {
      return new Profile(0, 0, []);
    } else {
      return JSON.parse(json);
    }
  }

  setProfile(profile: Profile) {
    localStorage.setItem(this.profileKey, JSON.stringify(profile));
  }
}
