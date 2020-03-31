import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookModel, BookRequiredProps } from 'src/app/shared/models';
import { BooksService } from 'src/app/shared/services';
import { selectActiveBook, selectAllBooks, selectBooksEarningTotals, State } from 'src/app/shared/state';
import { BooksPageActions } from '../../actions';

@Component({
    selector: 'app-books',
    templateUrl: './books-page.component.html',
    styleUrls: [
        './books-page.component.css',
    ],
})
export class BooksPageComponent implements OnInit {
    total$ = this.store.select(selectBooksEarningTotals);
    books$ = this.store.select(selectAllBooks);
    currentBook$ = this.store.select(selectActiveBook);
    constructor(private booksService: BooksService, private store: Store<State>) {}

    ngOnInit() {
        this.removeSelectedBook();
    }

    onSelect(book: BookModel) {
        this.store.dispatch(BooksPageActions.selectBook({ bookId: book.id }));
    }

    onCancel() {
        this.removeSelectedBook();
    }

    removeSelectedBook() {
        this.store.dispatch(BooksPageActions.clearSelectedBook());
    }

    onSave(book: BookRequiredProps | BookModel) {
        if ('id' in book) {
            this.store.dispatch(BooksPageActions.updateBook({ bookId: book.id, changes: book }));
        } else {
            this.store.dispatch(BooksPageActions.createBook({ book: book as BookModel }));
        }
    }

    onDelete(book: BookModel) {
        this.store.dispatch(BooksPageActions.deleteBook({ bookId: book.id }));
    }
}
