import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?: boolean; //only for login request
}

@Injectable({ providedIn:'root' })
export class AuthService {
    // user = new Subject<User>();
    user = new BehaviorSubject<User>(null);  //BehaviorSubject gives the previous/current value along with next value
    private tokenExiprationTimer: any;
    
    constructor(private http: HttpClient, private router: Router) { }

    signup(email:string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnP4gR7BCDhnLK1W8aONpH8TvgscFSBes',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }

    login(email:string, password:string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnP4gR7BCDhnLK1W8aONpH8TvgscFSBes',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }

    autoLogin() {
        const userData: {email:string, id:string, _token: string, _tokenExpirationDate:string;} = 
                JSON.parse(localStorage.getItem('userData'));
        
        if(!userData) {
            return;
        }

        const loadUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadUser.token) {
            this.user.next(loadUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExiprationTimer) {
            clearTimeout(this.tokenExiprationTimer);
        }
        this.tokenExiprationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExiprationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration); //logout after specified exipration time
    }

    private handleAuthentication(email:string, userId:string, token:string, expiresIn:number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknwon error occured!";
                if(!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMessage);
                }
                switch(errorRes.error.error.message) {
                    case 'EMAIL_EXISTS': 
                        errorMessage = 'This email already exists'; 
                        break;
                    case 'OPERATION_NOT_ALLOWED':
                        errorMessage = ' Password sign-in is disabled for this project.';
                        break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                        break;
                    case 'EMAIL_NOT_FOUND': 
                        errorMessage = 'Email is not registered';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage = 'The password is invalid or the user does not have a password.';
                        break;
                }
                return throwError(errorMessage);
    }

}