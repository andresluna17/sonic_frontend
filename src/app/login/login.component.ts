import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/api";
import "../../js/md5.js";
import { AuthService } from "../services/auth.service.js";

declare var calcMD5: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  dat = {
    username: "",
    contrasena: ""
  };
  api = "https://sonicdb.000webhostapp.com/Controlador_aceso.php";

  constructor(
    private route: Router,
    private http: HttpClient,
    private messageService: MessageService,
    private AuthServices: AuthService
  ) {}

  ngOnInit() {}

  login() {
    if (this.dat.username == "" && this.dat.contrasena == "") {
      this.messageService.add({
        key: "tc",
        severity: "warn",
        summary: "Alerta",
        detail: "Ingresa Tu Correo y Contraseña"
      });
    } else {
      let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (!emailRegex.test(this.dat.username)) {
        this.messageService.add({
          key: "tc",
          severity: "warn",
          summary: "Alerta",
          detail: "Debes ingresar un correo valido"
        });
      } else {
        const formData = new FormData();
        let contra = calcMD5(this.dat.contrasena);
        formData.append("username", this.dat.username);
        formData.append("password", contra);
        this.http.post(this.api, formData).subscribe(res => {
          if (res["Acceso"]) {
            localStorage.setItem("usuario", JSON.stringify(res["usuario"]));
            let roles = res["roles"];
            let opciones = "false";
            for (let i = 0; i < roles.length; i++) {
              if (roles[i] == 1) {
                opciones = "true";
              }
            }
            localStorage.setItem("roles", opciones);
            this.AuthServices.login();
            this.route.navigate(["adminpanel/Eventos"]);
          } else {
            this.messageService.add({
              key: "tc",
              severity: "error",
              summary: "Alerta",
              detail: "Credenciales incorrectas"
            });
            this.dat = {
              username: "",
              contrasena: ""
            };
          }
        });
      }
    }
  }
}
