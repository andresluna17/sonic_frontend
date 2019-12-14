import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/services/auth.service";
import { HttpClient } from "@angular/common/http";
import "../../../js/md5.js";

declare var calcMD5: any;

@Component({
  selector: "app-equipo",
  templateUrl: "./equipo.component.html",
  styleUrls: ["./equipo.component.scss"]
})
export class EquipoComponent implements OnInit {
  constructor(
    private acti: ActivatedRoute,
    private route: Router,
    private http: HttpClient,
    private messageService: MessageService,
    private AuthServices: AuthService
  ) {}
  close = false;
  api = "https://sonicdb.000webhostapp.com/Controlador_eventos.php";
  empleadoid;
  evento: any = {};
  empleados: any = [];
  empleadosno: any = [];
  invitado: any = {};
  cols: any = [
    { field: "perId", header: "id" },
    { field: "perNombre", header: "nombre" },
    { field: "perApellido", header: "apellido" },
    { field: "perDocumento", header: "Documento" }
  ];
  cols2: any = [
    { field: "perId", header: "id" },
    { field: "perNombre", header: "nombre" },
    { field: "perApellido", header: "apellido" },
    { field: "perDocumento", header: "Documento" }
  ];
  categorias: any = [];
  lideres: any = [];
  displayDialog: boolean = false;
  display: boolean = false;
  newinvitado: boolean = false;
  displayDialog2: boolean = false;
  close2: boolean = false;
  empleado: any = {};
  lider: any = {};
  empleadorol;

  ngOnInit() {
    this.listar();
  }

  listar() {
    const formData = new FormData();
    formData.append("ruta", "personal");
    this.http.post(this.api, formData).subscribe(res => {
      console.log(res);
      this.empleados = res["empleados"];
      this.lideres = res["lideres"];
    });
  }
  onRowSelect(event) {
    this.close = true;
    this.empleado = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  onRowSelect2(event) {
    this.close2 = true;
    this.lider = this.cloneCar(event.data);
    this.displayDialog2 = true;
  }
  cloneCar(c: any): any {
    let car = {};
    for (let prop in c) {
      car[prop] = c[prop];
    }
    return car;
  }

  showDialogToAdd() {
    this.empleado = {};
    this.close = false;
    this.newinvitado = true;
    this.displayDialog = true;
  }

  cancelar() {
    this.newinvitado = false;
    this.displayDialog = false;
  }

  save() {
    if (this.newinvitado) {
      if (
        this.empleado["perNombre"] ||
        this.empleado["perApellido"] ||
        this.empleado["email"] ||
        this.empleado["password"] ||
        this.empleado["documento"]
      ) {
        if (
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            this.empleado["email"]
          )
        ) {
          const formData = new FormData();
          formData.append("ruta", "nuevoempleado");
          formData.append("nombre", this.empleado["perNombre"]);
          formData.append("apellidos", this.empleado["perApellido"]);
          formData.append("documento", this.empleado["documento"]);
          formData.append("email", this.empleado["email"]);
          formData.append("password", calcMD5(this.empleado["password"]));
          formData.append("rol", this.empleado["rol"]);
          this.http.post(this.api, formData).subscribe(res => {
            console.log(res);
            if (res["inserto"]) {
              this.displayDialog = false;
              this.newinvitado = false;
              this.listar();
              this.messageService.add({
                key: "tc",
                severity: "success",
                summary: "Exito !!",
                detail: "Registro insetado"
              });
            }
          });
        } else {
          this.messageService.add({
            key: "tc",
            severity: "error",
            summary: "Alerta",
            detail: "Email Invalido"
          });
        }
      } else {
        console.log(this.empleado["rol"]);
        this.messageService.add({
          key: "tc",
          severity: "error",
          summary: "Alerta",
          detail: "Formulario Vacio"
        });
      }
    } else {
      console.log(this.empleado);
      const formData = new FormData();
      formData.append("ruta", "actualizarempleado");
      formData.append("id", this.empleado["perId"]);
      formData.append("nombre", this.empleado["perNombre"]);
      formData.append("apellidos", this.empleado["perApellido"]);
      this.http.post(this.api, formData).subscribe(res => {
        console.log(res);
        if (res["inserto"]) {
          this.displayDialog = false;
          this.listar();
          this.messageService.add({
            key: "tc",
            severity: "success",
            summary: "Exito !!",
            detail: "Registro Actualizado"
          });
        }
      });
    }
  }
}
