import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "adminpanel",
  templateUrl: "./adminpanel.component.html",
  styleUrls: ["./adminpanel.component.scss"]
})
export class AdminpanelComponent {
  constructor(private auth: AuthService, private route: Router) {}
  activeTab = "dash";
  usuario;
  roles;
  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.roles = localStorage.getItem("roles");
  }

  lo() {
    this.auth.logout();
    this.route.navigate(["/"]);
  }
}
