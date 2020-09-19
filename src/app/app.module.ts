import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard'
import {LoggedinGuard} from './loggedin.guard'
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule}  from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input'
import {DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {PlanZajecComponent} from './plan-zajec/plan-zajec.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select'; 
import {AddUserPanelComponent} from './add-user-panel/add-user-panel.component';
import {AddTimetablePanelComponent} from './add-timetable-panel/add-timetable-panel.component'
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http'
import {DataService} from './data.service';
import {AddClassesPanelComponent} from './add-classes-panel/add-classes-panel.component';
import {EditUserPanelComponent} from './edit-user-panel/edit-user-panel.component';
import {GradesComponent} from './grades/grades.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {AddFieldOfStudyPanelComponent} from './add-field-of-study-panel/add-field-of-study-panel.component';
import {AddGradesPanelComponent} from './add-grades-panel/add-grades-panel.component';
import {HomePageComponent} from './home-page/home-page.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {matDialogAnimations, MatDialogModule} from '@angular/material/dialog'
import {DialogsComponent} from './dialogs/dialogs.component'


const config ={
apiKey: "AIzaSyBX6094HqSBMK9cgxxkd3w17_WVHPyJ070",
authDomain: "test2-31126.firebaseapp.com",
databaseURL: "https://test2-31126.firebaseio.com",
projectId: "test2-31126",
storageBucket: "test2-31126.appspot.com",
messagingSenderId: "282943221873",
appId: "1:282943221873:web:fe05afd6f4c98df8506bd0"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserProfileComponent,
    PlanZajecComponent,
    AddUserPanelComponent,
    AddTimetablePanelComponent,
    AddClassesPanelComponent,
    EditUserPanelComponent,
    GradesComponent,
    AddFieldOfStudyPanelComponent,
    AddGradesPanelComponent,
    HomePageComponent,
    DialogsComponent,
  ],
  entryComponents: [DialogsComponent, MatDialogModule],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {path: '', redirectTo: "/home/homePage", pathMatch: 'full'},
      {path: 'login', component: LoginComponent, canActivate: [LoggedinGuard]},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
        {path: 'userProfile', component: UserProfileComponent},
        {path: 'planZajec', component:PlanZajecComponent},
        {path: 'addUser',component: AddUserPanelComponent},
        {path: 'addTimetable',component: AddTimetablePanelComponent},
        {path: 'grades',component: GradesComponent},
        {path: 'editUser',component: EditUserPanelComponent},
        {path: 'addClasses',component: AddClassesPanelComponent},
        {path: 'addFieldOfStudy',component: AddFieldOfStudyPanelComponent},
        {path: 'addGrades',component: AddGradesPanelComponent},
        {path: 'homePage',component: HomePageComponent},
      ]},
      
    ]),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatDividerModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    MatStepperModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    AngularFireStorageModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSortModule,
    MatExpansionModule,
    MatDialogModule,

  ],
  providers: [AuthGuard,LoggedinGuard,DatePipe,{provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
