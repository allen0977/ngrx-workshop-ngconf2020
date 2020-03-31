import { createAction, props } from '@ngrx/store';
import { BookModel, BookRequiredProps } from 'src/app/shared/models';

export const enter = createAction('[Book Page] Enter');
export const selectBook = createAction('[Book Page] Select', props<{ bookId: string }>());
export const clearSelectedBook = createAction('[Book Page] Clear');
export const createBook = createAction('[Book Page] Create Book', props<{ book: BookModel }>());
export const updateBook = createAction('[Book Page] Update Book', props<{ changes: BookRequiredProps; bookId: string }>());
export const deleteBook = createAction('[Book Page] Delete Book', props<{ bookId: string }>());
