import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../services/profile.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: any;
  profile: any;
  repos: any;
  allRepos: any;
  username: string;
  login: string;
  editRowId: any;
  repoName: string;

  constructor(private  profileService: ProfileService) {

      this.profileService.getUsersList().subscribe(users => {
        this.users = users;
        console.log(users);
      });
  }
  findProfile() {
      this.profileService.updateProfile(this.username);
      this.profileService.getProfileInfo().subscribe(profile => {
          this.profile = profile;
      });
      this.profileService.getProfileRepos().subscribe(repos => {
          this.repos = repos;
      });
    }

    findProfileOnClick(login) {
      console.log(login);
      this.profileService.updateProfile(login);
      this.profileService.getProfileInfo().subscribe(profile => {
        this.profile = profile;
        });
      this.profileService.getProfileRepos().subscribe(repos => {
            this.repos = repos;
        });
    }
    findRepo() {
        this.profileService.updateRepo(this.repoName);
        this.profileService.getRepoByName().subscribe(allRepos => {
            this.allRepos = allRepos;
            //console.log(allRepos.items);
            console.log(this.allRepos);
        });
    }
    edit(val) {
      this.editRowId = val;
    }

    readLocal(id) {
        const localName = (localStorage.getItem(id));
        return  JSON.parse(localName);
  }
    saveToLocal(id, name) {
        localStorage.setItem(JSON.stringify(id), JSON.stringify(name));
    }

  ngOnInit() {
  }
}
