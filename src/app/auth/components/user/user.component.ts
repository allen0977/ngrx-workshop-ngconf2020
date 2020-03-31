import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { UserModel } from 'src/app/shared/models';
import { AuthUserActions } from '../../actions';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: [
        './user.component.css',
    ],
})
export class UserComponent {
    user$: Observable<UserModel | null> = of({
        id: '1',
        username: 'NgRx Learner',
    });
    constructor(private store: Store) {}
    onLogout() {
        // Not Implemented
        this.store.dispatch(AuthUserActions.logout());
    }
}
