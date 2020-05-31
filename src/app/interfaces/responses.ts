import { Evento } from './evento';

export interface EventosResponse {
  eventos: Evento[];
  error?: string;
}

export interface EventoResponse {
  evento: Evento;
}

/*export interface EventoDeleteResponse {
  ok?: boolean;
  id: number;
  error?: string;
}*/


export interface LoginResponse {
  accessToken: string;
}
