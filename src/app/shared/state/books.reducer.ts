import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { BooksApiActions, BooksPageActions } from 'src/app/books/actions';
import { BookModel, calculateBooksGrossEarnings } from 'src/app/shared/models';

export interface State extends EntityState<BookModel> {
    activeBookId: string | null;
}
export const adapter: EntityAdapter<BookModel> = createEntityAdapter<BookModel>();

export const initialState: State = adapter.getInitialState({
    activeBookId: null,
});

export const booksReducer = createReducer(
    initialState,
    on(BooksPageActions.clearSelectedBook, BooksPageActions.enter, (state) => {
        return {
            ...state,
            activeBookId: null,
        };
    }),
    on(BooksPageActions.selectBook, (state, action) => {
        return {
            ...state,
            activeBookId: action.bookId,
        };
    }),
    on(BooksApiActions.booksLoaded, (state, action) => {
        return adapter.addAll(action.books, {
            ...state,
            activeBookId: null,
        });
    }),
    on(BooksApiActions.bookDeleted, (state, action) => {
        return adapter.removeOne(action.bookId, {
            ...state,
            activeBookId: null,
        });
    }),
    on(BooksApiActions.bookUpdated, (state, action) => {
        return adapter.updateOne(
            { id: action.book.id, changes: action.book },
            {
                ...state,
                activeBookId: null,
            }
        );
    }),
    on(BooksApiActions.bookCreated, (state, action) => {
        return adapter.addOne(action.book, {
            ...state,
            activeBookId: null,
        });
    })
);

export function reducer(state: undefined | State, action: Action){
    return booksReducer(state, action);
}

/*
Getter Selectors
*/
// export const selectAll = (state: State) => state.collection;
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectActiveBookId = (state: State) => state.activeBookId;

/**
 * Complex Selectors
**/

// export const selectActiveBookUnoptimized = (state: State) => {
//     const books = selectAll(state);
//     const activeBookId = selectActiveBookId(state);
//     return books.find((book) => book.id === activeBookId);
// };
export const selectActiveBook = createSelector(selectEntities, selectActiveBookId, (books, activeBookId) => {
    return activeBookId ? books[activeBookId] : null;
});
// export const selectEarningsTotals = createSelector(selectAll, (books) => {
//     return calculateBooksGrossEarnings(books);
// });

// ! the last selector is the projector function to run .. in this case, it passes the input of selectAll to that method
export const selectEarningsTotals = createSelector(selectAll, calculateBooksGrossEarnings);
