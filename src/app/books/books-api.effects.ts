import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { BooksService } from '../shared/services';
import { BooksApiActions, BooksPageActions } from './actions';

@Injectable()
export class BooksApiEffects {
    constructor(private actions$: Actions, private booksService: BooksService) {}

    loadBooks$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BooksPageActions.enter),
            exhaustMap((action) => {
                return this.booksService.all().pipe(map((books) => BooksApiActions.booksLoaded({ books })));
            })
        );
    });
    deleteBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BooksPageActions.deleteBook),
            mergeMap((action) => {
                return this.booksService.delete(action.bookId).pipe(map((books) => BooksApiActions.bookDeleted({ bookId: action.bookId })));
            })
        );
    });
    updateBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BooksPageActions.updateBook),
            concatMap((action) => {
                return this.booksService.update(action.bookId, action.changes).pipe(map((book) => BooksApiActions.bookUpdated({ book })));
            })
        );
    });
    createBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BooksPageActions.createBook),
            concatMap((action) => {
                return this.booksService.create(action.book).pipe(map((book) => BooksApiActions.bookCreated({ book })));
            })
        );
    });
}
