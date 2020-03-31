import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { AuthModule } from './auth';
import { BooksModule } from './books';
import { MaterialModule } from './material.module';
import { metaReducers, reducers } from './shared/state';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: '', pathMatch: 'full', redirectTo: '/books' },
        ]),
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([]),
        MaterialModule,
        AuthModule,
        BooksModule,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {}
