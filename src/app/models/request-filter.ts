export class RequestFilter {


    constructor(
        public perfil: string,
        public solicitante: number,
        public tecnologia: string,
        public descripcion: string,
        public fechaDesde: Date,
        public fechaHasta: Date,
        public estado: string
    ) {
    }

}
