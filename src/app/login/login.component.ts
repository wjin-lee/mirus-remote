import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseError } from '@angular/fire/app/firebase';
import { User } from '@angular/fire/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    email: string = "";
    password: string = "";
    invalidCredentials = false;
    enableValidation = false;  // False until first login attempt. This prevents input from appearing red on page load.

    loginFailureReason: string = "";

    authorised = false  // Set to true by auth service when user is logged in.

    constructor(
        private authService: AuthService
    ) {
        authService.user$.subscribe((aUser: User | null) => {
            if (aUser != null) {
                // valid user has logged in.
                this.authorised = true;
            }
        })
    }

    login() {
        this.authService.login(this.email, this.password)
            .then(() => {
                this.enableValidation = false;
                console.log("Login success")

            }).catch((err: FirebaseError) => {
                console.log(`Login failed. Reason:`)
                console.log(err)

                switch (err.code) {
                    case "auth/invalid-email":
                        this.loginFailureReason = "Invalid credentials";
                        break;

                    case "auth/missing-password":
                        this.loginFailureReason = "Invalid password";
                        break;

                    case "auth/wrong-password":
                        this.loginFailureReason = "Invalid password";
                        break;

                    default: {
                        this.loginFailureReason = err.message;
                        break;
                    }
                }

                this.enableValidation = true;
            });
    }

}
