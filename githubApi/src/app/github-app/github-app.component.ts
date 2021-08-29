import { Component, OnInit } from '@angular/core';
import { GithubServiceService } from '../services/github-service.service';

@Component({
  selector: 'app-github-app',
  templateUrl: './github-app.component.html',
  styleUrls: ['./github-app.component.css']
})
export class GithubAppComponent implements OnInit {


  public githubUserQuery:string;
  public githubProfile: any;
  public githubRepos: any[];
  public errorMessage:string;
   
  constructor(private GithubServiceService:GithubServiceService){} 
  public searchUser(){

    //fetch git profile
    this.GithubServiceService.getProfile(this.githubUserQuery)
    .subscribe((data) =>{
    this.githubProfile = data;
    } ,

     (error) => {
      this.errorMessage = error;
    });
  
 // fetch git repos
  this.GithubServiceService.getRepos(this.githubUserQuery).subscribe((data) => {
   this.githubRepos=data;
 }, 
 (error)=>{
  this.errorMessage = error;
 });
  }
  ngOnInit(): void {
  }

}
