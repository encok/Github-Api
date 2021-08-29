import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError,retry } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {

  constructor(private httpClient:HttpClient) { }

  //github profile
 public getProfile(searchQuery):Observable<any>{
   let dataURL=`https://api.github.com/users/${searchQuery}?access_token=${environment.Token}`
   return this.httpClient.get<any>(dataURL).pipe(
     retry(1),
     catchError(this.handleErrors)
   );
 }
  //github repos
  public getRepos(searchQuery):Observable<any[]>{
    let dataURL=`https://api.github.com/users/${searchQuery}/repos?access_token=${environment.Token}`
    return this.httpClient.get<any[]>(dataURL).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  //error messages
  public handleErrors(error:HttpErrorResponse){
    let errorMessage:string;
    if(error.error instanceof ErrorEvent){
      //client side error
      errorMessage = `MESSAGE : ${error.error.message}`;
    }
    else{
      errorMessage = `STATUS :${error.status} MESSAGE : ${error.message}`;
    }
    return throwError(errorMessage)
  }
}
