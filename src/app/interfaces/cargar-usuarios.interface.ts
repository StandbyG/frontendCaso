import { Usuario } from '../models/usuario.model';

export interface CargarUsuario {
    [x: string]: any;
    total: number;
    users: Usuario[];
}