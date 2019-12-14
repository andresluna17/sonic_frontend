import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/services/auth.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-evento",
  templateUrl: "./evento.component.html",
  styleUrls: ["./evento.component.scss"]
})
export class EventoComponent implements OnInit {
  close = false;
  api = "https://sonicdb.000webhostapp.com/Controlador_eventos.php";
  empleadoid;
  evento: any = {};
  invitados: any = [];
  empleados: any = [];
  empleadosno: any = [];
  invitado: any = {};
  cols: any = [
    { field: "perId", header: "id" },
    { field: "perNombre", header: "nombre" },
    { field: "perApellido", header: "apellido" },
    { field: "perDocumento", header: "Documento" },
    { field: "invMesa", header: "mesa" }
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
  roles: string;
  rol: boolean;
  constructor(
    private acti: ActivatedRoute,
    private route: Router,
    private http: HttpClient,
    private messageService: MessageService,
    private AuthServices: AuthService
  ) {}
  id;
  ngOnInit() {
    this.id = this.acti.snapshot.paramMap.get("id");
    this.listar();
    this.listarFormularios();
    this.listarempleaods();
    this.roles = localStorage.getItem("roles");
    if (this.roles == "true") {
      this.rol = false;
    } else this.rol = true;
  }
  listarempleaods() {
    const formData = new FormData();
    formData.append("ruta", "listarempleadosnoasignados");
    formData.append("id", this.id);
    this.http.post(this.api, formData).subscribe(res => {
      console.log(res);
      this.empleadosno = res;
    });
  }
  listar() {
    const formData = new FormData();
    formData.append("ruta", "listardestalles");
    formData.append("id", this.id);
    this.http.post(this.api, formData).subscribe(res => {
      console.log(res);
      this.invitados = res["invitados"];
      this.empleados = res["empleados"];
      this.evento = res["evento"];
    });
  }

  showDialog() {
    this.display = true;
  }

  listarFormularios() {
    const formData = new FormData();
    formData.append("ruta", "formularios");
    this.http.post(this.api, formData).subscribe(res => {
      console.log(res);
      this.categorias = res["categorias"];
      this.lideres = res["lideres"];
    });
  }

  actualizar() {
    this.display = false;
    console.log(this.evento);
    const formData = new FormData();
    formData.append("ruta", "actualizarevento");
    formData.append("nombre", this.evento.eveNombre);
    formData.append("ubicaion", this.evento.eveUbicacion);
    formData.append("categoria", this.evento.eveCategoria);
    formData.append("lider", this.evento.persona_perId);
    formData.append("id", this.id);
    this.http.post(this.api, formData).subscribe(res => {
      console.log(res);
      if (res["actualizacion"]) {
        this.listar();
        this.messageService.add({
          key: "tc",
          severity: "success",
          summary: "Exito !!",
          detail: "Datos Actualizados Exitosamente"
        });
      } else {
        this.messageService.add({
          key: "tc",
          severity: "error",
          summary: "Alerta",
          detail: "error al actualizar"
        });
      }
    });
  }
  delete() {
    const formData = new FormData();
    formData.append("ruta", "eliminarInvitado");
    formData.append("id", this.invitado["invId"]);
    this.http.post(this.api, formData).subscribe(res => {
      console.log(res);
      if (res["eliminacion"]) {
        this.displayDialog = false;
        this.listar();
        this.messageService.add({
          key: "tc",
          severity: "success",
          summary: "Exito !!",
          detail: "Registro Eliminado"
        });
      }
    });
  }

  onRowSelect(event) {
    this.close = true;
    this.invitado = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  onRowSelect2(event) {
    this.close2 = true;
    this.empleado = this.cloneCar(event.data);
    if (this.roles == "true") {
      this.displayDialog2 = true;
    }
  }

  cloneCar(c: any): any {
    let car = {};
    for (let prop in c) {
      if (prop == "invEstado") {
        if (c["invEstado"] == 0) {
          car["invEstado"] = false;
        } else {
          car["invEstado"] = true;
        }
      } else car[prop] = c[prop];
    }
    return car;
  }
  save() {
    if (this.newinvitado) {
      if (
        this.invitado["perNombre"] ||
        this.invitado["perApellido"] ||
        this.invitado["documento"] ||
        this.invitado["mesa"]
      ) {
        const formData = new FormData();
        formData.append("ruta", "invitadonuevo");
        formData.append("evento", this.id);
        formData.append("nombre", this.invitado["perNombre"]);
        formData.append("apellidos", this.invitado["perApellido"]);
        formData.append("documento", this.invitado["documento"]);
        formData.append("mesa", this.invitado["mesa"]);
        this.http.post(this.api, formData).subscribe(res => {
          console.log(res);
          if (res["inserto"]) {
            this.newinvitado = false;
            this.displayDialog = false;
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
          detail: "Formulario Vacio"
        });
      }
    } else {
      const formData = new FormData();
      if (this.invitado["invEstado"]) {
        this.invitado["invEstado"] = 1;
      } else {
        this.invitado["invEstado"] = 0;
      }
      formData.append("ruta", "actualizarinvitado");
      formData.append("evento", this.id);
      formData.append("id", this.invitado["perId"]);
      formData.append("nombre", this.invitado["perNombre"]);
      formData.append("apellidos", this.invitado["perApellido"]);
      formData.append("idp", this.invitado["invId"]);
      formData.append("estado", this.invitado["invEstado"]);
      this.http.post(this.api, formData).subscribe(res => {
        console.log(res);
        if (res["actualizacion"]) {
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

  showDialogToAdd() {
    this.invitado = {};
    this.close = false;
    this.newinvitado = true;
    this.displayDialog = true;
  }
  showDialogToAdd2() {
    this.close2 = false;
    this.displayDialog2 = true;
  }

  cancelar() {
    this.newinvitado = false;
    this.displayDialog = false;
  }
  empleaodenviar() {
    console.log(this.empleadoid);
    if (this.empleadoid != null) {
      const formData = new FormData();
      formData.append("ruta", "asignarempleado");
      formData.append("empleado", this.empleadoid);
      formData.append("evento", this.id);
      this.http.post(this.api, formData).subscribe(res => {
        console.log(res);
        if (res["inserto"]) {
          this.displayDialog2 = false;
          this.listar();
          this.listarempleaods();
          this.messageService.add({
            key: "tc",
            severity: "success",
            summary: "Exito !!",
            detail: "Registro insertado"
          });
        }
      });
    } else {
      this.messageService.add({
        key: "tc",
        severity: "error",
        summary: "Alerta",
        detail: "Formulario Vacio"
      });
    }
  }

  eliminarempleado() {
    const formData = new FormData();
    formData.append("ruta", "eliminarasigempleado");
    formData.append("id", this.empleado.inteId);
    this.http.post(this.api, formData).subscribe(res => {
      console.log(res);
      if (res["eliminacion"]) {
        this.displayDialog2 = false;
        this.listar();
        this.messageService.add({
          key: "tc",
          severity: "success",
          summary: "Exito !!",
          detail: "Registro eliminado"
        });
      }
    });
  }
}
