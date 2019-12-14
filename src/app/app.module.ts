import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FileUploadModule } from "primeng/fileupload";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AdminpanelModule } from "./adminpanel/adminpanel.module";
import { FormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { GalleriaModule } from "primeng/galleria";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ServicesService } from "src/services.service";
import { LoaderInterceptor } from "src/interceptors/interceptor";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoaderComponent } from "src/components/shared/loader/loader.component";
import { EventosComponent } from "./adminpanel/eventos/eventos.component";
import { EquipoComponent } from "./adminpanel/equipo/equipo.component";
import { TableModule } from "primeng/table";
import { EventoComponent } from "./adminpanel/evento/evento.component";
import { CalendarModule } from "primeng/calendar";
import { InputSwitchModule } from "primeng/inputswitch";
import { ResgistrarComponent } from './resgistrar/resgistrar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    EventosComponent,
    EquipoComponent,
    EventoComponent,
    ResgistrarComponent
  ],
  imports: [
    InputSwitchModule,
    CalendarModule,
    MatProgressSpinnerModule,
    ScrollPanelModule,
    NgbModule,
    GalleriaModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    FileUploadModule,
    HttpClientModule,
    AdminpanelModule,
    ToastModule,
    FormsModule,
    RouterModule.forRoot([{ path: "", component: LoginComponent }])
  ],
  providers: [
    MessageService,
    ConfirmationService,
    ServicesService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
