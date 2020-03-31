import { Action, createReducer, on } from '@ngrx/store';
import { AuthUserActions } from 'src/app/auth/actions';
import { UserModel } from '../models';

export interface State {
    gettingStatus: boolean;
    user: UserModel | null;
    error: string;
}
export const initialState: State = {
    gettingStatus: false,
    user: null,
    error: '',
};
export const authReducer = createReducer(
    initialState,
    on(AuthUserActions.login, (state) => {
        return {
            ...state,
            gettingStatus: true,
            user: null,
        };
    }),
    on(AuthUserActions.logout, (state, action) => {
        return {
            ...state,
            gettingStatus: false,
            user: null,
        };
    })
);

export function reducer(state: undefined | State, action: Action){
    return authReducer(state, action);
}

export const selectGettingStatus = (state: State) => state.gettingStatus;
export const selectUser = (state: State) => state.user;
export const selectError = (state: State) => state.error;
