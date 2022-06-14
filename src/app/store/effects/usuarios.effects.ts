import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from 'rxjs';
import { cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosError } from '../actions/usuarios.actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(cargarUsuarios),
            mergeMap(
                () => this.usuarioService.getUsers()
                        .pipe(
                            map(users => cargarUsuariosSuccess({usuarios: users})),
                            catchError(err => of(cargarUsuariosError({payload: err})))
                        )
            )
        )
    );

}