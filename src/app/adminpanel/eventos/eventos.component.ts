import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-eventos",
  templateUrl: "./eventos.component.html",
  styleUrls: ["./eventos.component.scss"]
})
export class EventosComponent implements OnInit {
  api = "https://sonicdb.000webhostapp.com/Controlador_eventos.php";
  display: boolean = false;
  seachear = {
    buscar: "",
    accion: "buscar"
  };
  categorias: any = [];
  lideres: any = [];
  eventos: any = [];
  evento: any = {
    categoria: "",
    eventoNombre: "",
    fecha: "",
    hora: "",
    Ubicacion: "",
    nombre: "",
    apellidos: "",
    documento: "",
    lider: ""
  };
  roles: string;
  constructor(
    private route: Router,
    private http: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listarEventos();
    this.listarFormularios();
    this.roles = localStorage.getItem("roles");
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
  listarEventos() {
    const formData = new FormData();
    formData.append("ruta", "listarEventos");
    this.http.post(this.api, formData).subscribe(res => {
      console.log(res);
      this.eventos = res;
    });
  }
  buscar() {}
  showDialog() {
    this.display = true;
  }
  Crear() {
    if (
      this.evento.eventoNombre == "" ||
      this.evento.fecha == "" ||
      this.evento.hora == "" ||
      this.evento.Ubicacion == "" ||
      this.evento.nombre == "" ||
      this.evento.apellidos == "" ||
      this.evento.documento == "" ||
      this.evento.lider == ""
    ) {
      this.messageService.add({
        key: "tc",
        severity: "error",
        summary: "Alerta",
        detail: "campos vacios"
      });
    } else {
      if (/^([0-9])*$/.test(this.evento.documento)) {
        this.display = false;
        let fecha = this.evento["fecha"] + " " + this.evento["hora"] + ":00";
        const formData = new FormData();
        formData.append("ruta", "insertarEvento");
        formData.append("eventonombre", this.evento.eventoNombre);
        formData.append("fecha", fecha);
        formData.append("ubicacion", this.evento.Ubicacion);
        formData.append("categoria", this.evento.categoria);
        formData.append("lider", this.evento.lider);
        formData.append("nombre", this.evento.nombre);
        formData.append("apellidos", this.evento.apellidos);
        formData.append("documento", this.evento.documento);
        this.http.post(this.api, formData).subscribe(res => {
          console.log(res);
          if (res["inserto"] == 1) {
            this.messageService.add({
              key: "tc",
              severity: "success",
              summary: "Exito !!",
              detail: "Evento Creado Exitosamente"
            });
            this.route.navigate(["/adminpanel/Evento", res["resultado"]]);
          } else {
            this.messageService.add({
              key: "tc",
              severity: "error",
              summary: "error",
              detail: "Error al Crear el evento"
            });
          }
        });
      } else {
        this.messageService.add({
          key: "tc",
          severity: "error",
          summary: "Alerta",
          detail: "Datos no validos"
        });
      }
    }
  }
  eliminar(id) {
    this.confirmationService.confirm({
      message: "Seguro Que Desea ELIMINAR Este evento",
      header: "Confirmacion",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        const formData = new FormData();
        formData.append("ruta", "eliminarevento");
        formData.append("id", id);
        this.http.post(this.api, formData).subscribe(res => {
          console.log(res);
          if (res["eliminacion"]) {
            this.listarEventos();
            this.messageService.add({
              key: "tc",
              severity: "success",
              summary: "Exito !!",
              detail: "Registro eliminado"
            });
          }
        });
      },
      reject: () => {}
    });
  }
}
