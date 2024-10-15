import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SimilaritySearchService } from './services/similarity-search.service';
import { CommonModule } from '@angular/common';
import { UploadDocumentsComponent } from './components/upload-documents/upload-documents.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchTextComponent } from './pages/search-text/search-text.component';
import { AuthService } from './services/auth.service';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    UploadDocumentsComponent,
    FooterComponent,
    HeaderComponent,
    SearchTextComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SimilaritySearchService, LoginService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
