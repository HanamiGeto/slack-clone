import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MainComponent } from './main/main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChannelsComponent } from './channel/channels/channels.component';
import { DirectMessagesComponent } from './direct-message/direct-messages/direct-messages.component';
import { RegisterComponent } from './register/register.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogCreateChannelComponent } from './channel/dialog-create-channel/dialog-create-channel.component';
import { DialogCreateDirectMessageComponent } from './direct-message/dialog-create-direct-message/dialog-create-direct-message.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TextboxComponent } from './textbox/textbox.component';
import { ChannelContentComponent } from './channel/channel-content/channel-content.component';
import { ThreadContentComponent } from './thread-content/thread-content.component';
import { FormsModule } from '@angular/forms';
import { DirectMessagesContentComponent } from './direct-message/direct-messages-content/direct-messages-content.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { QuillModule } from 'ngx-quill';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GetUserNameByIdPipe } from './get-user-name-by-id.pipe';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { HotToastModule } from '@ngneat/hot-toast';
import { MatChipsModule } from '@angular/material/chips';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ThreadsListComponent } from './threads-list/threads-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { SidebarService } from './services/sidebar.service';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HomeHeaderComponent,
    MainComponent,
    ChannelsComponent,
    DirectMessagesComponent,
    RegisterComponent,
    DialogCreateChannelComponent,
    DialogCreateDirectMessageComponent,
    TextboxComponent,
    ChannelContentComponent,
    ThreadContentComponent,
    DirectMessagesContentComponent,
    UserDetailComponent,
    GetUserNameByIdPipe,
    UserListComponent,
    ThreadsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSidenavModule,
    MatExpansionModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    MatDialogModule,
    MatAutocompleteModule,
    FormsModule,
    QuillModule,
    MatTooltipModule,
    HotToastModule.forRoot(),
    MatTooltipModule,
    MatChipsModule,
    MatTabsModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    GetUserNameByIdPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
