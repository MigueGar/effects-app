import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions/usuario.actions';

@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType(cargarUsuario),
            mergeMap(
                (action) => this.usuarioService.getUserById(action.id)
                        .pipe(
                            map(user => cargarUsuarioSuccess({usuario: user})),
                            catchError(err => of(cargarUsuarioError({payload: err})))
                        )
            )
        )
    );

}