import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FileUploadModule } from "primeng/fileupload";
import { RouterModule } from "@angular/router";
import { AdminpanelComponent } from "./adminpanel.component";
import { EventosComponent } from "./eventos/eventos.component";
import { EquipoComponent } from "./equipo/equipo.component";
import { CanActivateGuard } from "../can-activate.guard";
import { EventoComponent } from "./evento/evento.component";

@NgModule({
  declarations: [AdminpanelComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FileUploadModule,
    RouterModule.forRoot([
      {
        path: "adminpanel",
        component: AdminpanelComponent,
        canActivate: [CanActivateGuard],
        canActivateChild: [CanActivateGuard],
        children: [
          { path: "Eventos", component: EventosComponent },
          { path: "Equipo", component: EquipoComponent },
          { path: "Evento/:id", component: EventoComponent }
        ]
      }
    ])
  ],
  providers: [],
  bootstrap: [AdminpanelComponent]
})
export class AdminpanelModule {}
