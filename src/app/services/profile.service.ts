import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private username = '';
  private repoName;
  private clientid = '967d59d3d970b6314d28';
  private clientsecret = 'ae7a4b83021e22b5c5cec55e0047ea4bdfc837f1';

  constructor(private http: HttpClient) {
  }
  getProfileInfo() {
    return this.http.get('https://api.github.com/users/' + this.username + "?client_id=" +
        this.clientid + "&client_secret=" + this.clientsecret);
  }
  getProfileRepos() {
      return this.http.get('https://api.github.com/users/' + this.username + "/repos?client_id=" +
          this.clientid + "&client_secret=" + this.clientsecret);
  }
  updateProfile(username: string) {
      this.username = username;
    }
  updateRepo(repoName: string) {
      this.repoName = repoName;
    }
  getRepoByName() {
      return this.http.get('https://api.github.com/search/repositories?q=' + this.repoName + '&client_id=' +
          this.clientid + '&client_secret=' + this.clientsecret).pipe(
          map(res => res['items']));
  }
  getUsersList() {
    return this.http.get("https://api.github.com/users?client_id=" +
        this.clientid + "&client_secret=" + this.clientsecret);
  }

}
