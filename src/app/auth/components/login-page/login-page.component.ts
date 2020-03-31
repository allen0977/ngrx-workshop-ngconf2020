import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { UserModel } from 'src/app/shared/models';
import { selectGettingStatus } from 'src/app/shared/state';
import { AuthUserActions } from '../../actions';
import { LoginEvent } from '../login-form';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: [
        './login-page.component.css',
    ],
})
export class LoginPageComponent {
    gettingStatus$ = this.store.select(selectGettingStatus);
    user$: Observable<UserModel | null> = of({
        id: '1',
        username: 'NgRx Learner',
    });
    error$: Observable<string | null> = of(null);
    constructor(private store: Store) {}
    onLogin($event: LoginEvent) {
        // Not Implemented
        this.store.dispatch(AuthUserActions.login());
    }
}
