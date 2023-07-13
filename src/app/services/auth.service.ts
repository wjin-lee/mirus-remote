import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    private auth: Auth = inject(Auth);
    user$ = user(this.auth);
    userSubscription: Subscription;
    currentUser: User | null;

    constructor(
    ) {
        this.currentUser = null;
        this.userSubscription = this.user$.subscribe((aUser: User | null) => {
            console.log(aUser);
            if (aUser != null) {
                this.currentUser = aUser;
            }
        })
    }

    getUser() {
        return this.currentUser;
    }

    isLoggedIn() {
        return this.currentUser != null;
    }

    login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
