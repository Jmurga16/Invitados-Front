import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from "@angular/material/expansion";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { NavMenuComponent } from './modules/nav-menu/nav-menu.component';
import { ListaInvitadosComponent } from './modules/lista-invitados/lista-invitados.component';
import { FormInvitadosComponent } from './modules/form-invitados/form-invitados.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableExporterModule } from 'mat-table-exporter';
import { FormQrComponent } from './modules/form-qr/form-qr.component';
import { MantenimientoComponent } from './modules/mantenimiento/mantenimiento.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,    
    ListaInvitadosComponent,
    FormInvitadosComponent,
    FormQrComponent,
    MantenimientoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSelectModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatTableExporterModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
