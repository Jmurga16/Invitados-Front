import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  mobileQuery: MediaQueryList;

  @Output() salida: EventEmitter<any> = new EventEmitter();

  isExpanded = true;
  showSubmenu: boolean = false;
  showSubSubMenu: boolean = false;
  isShowing = false;

  listaNav = [
    { id: 1, name: 'Lista de Invitados', route: 'invitados', icon: 'groups', subMenu: 0, mostrar: false },
    { id: 2, name: 'Lista de Graduados', route: 'graduados', icon: 'school', subMenu: 0, mostrar: false },
    /* { id: 3, name: 'Lector QR', route: 'lector-qr', icon: 'qr_code_scanner', subMenu: 0, mostrar: false },     */
  ];

  listaSubNav = [
    { idHijo: 1, idPadre: 2, name: 'SubAlmacen1', route: 'zonas', icon: 'false' },
  ];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {


  }

  fnSalir() {
    this.router.navigate(['/', 'login']);
    console.log('cerrar')
  }

  fnRuteo(ruta: string) {

    let sRuta = `/${ruta}`
    this.router.navigateByUrl(sRuta);

  }

  fnMostrar(index: number) {

    let bEstado: boolean;

    if (this.listaNav[index].mostrar) {
      bEstado = false;
    }
    else {
      bEstado = true;
    }

    this.listaNav[index].mostrar = bEstado

  }

}
