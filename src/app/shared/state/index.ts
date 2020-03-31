// import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
// import * as fromAuth from "./auth.reducer";
// import * as fromBooks from "./books.reducer";
import { Action, ActionReducer, ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromBooks from './books.reducer';

export interface State {
    books: fromBooks.State;
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
    books: fromBooks.reducer,
    auth: fromAuth.reducer,
};

function logger(reducer: ActionReducer<any, any>){
    return (state: any, action: Action) => {
        console.log('previous state', state);
        console.log('action', action);
        const nextState = reducer(state, action);
        return nextState;
    };
}

export const metaReducers: MetaReducer<State>[] = [
    logger,
];

/* Books State */
export const selectBooksState = (state: State) => state.books;

// export const selectActiveBookUnoptimized = (state:State) => {
//     const booksState = selectBookState(state);
//     return fromBooks.selectActiveBook(booksState)
// }

// export const selectActiveBookStillUnoptimized = createSelector(selectBooksState, (booksState) => fromBooks.selectActiveBook(booksState));

export const selectActiveBook = createSelector(selectBooksState, fromBooks.selectActiveBook);
export const selectAllBooks = createSelector(selectBooksState, fromBooks.selectAll);
export const selectBooksEarningTotals = createSelector(selectBooksState, fromBooks.selectEarningsTotals);

export const selectAuthState = (state: State) => state.auth;

export const selectGettingStatus = createSelector(selectAuthState, fromAuth.selectGettingStatus);
export const selectUser = createSelector(selectAuthState, fromAuth.selectUser);
export const selectError = createSelector(selectAuthState, fromAuth.selectError);
