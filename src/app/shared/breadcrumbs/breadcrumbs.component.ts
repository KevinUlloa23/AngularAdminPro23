import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public tituloSubs$: Subscription;


  constructor( private router: Router, private route: ActivatedRoute ) {
    this.getArgumentosRuta()
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {

    this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event:ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event:ActivationEnd) => event.snapshot.data )
    ).subscribe( ({ titulo }) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo} ` ;
});


  }

}
