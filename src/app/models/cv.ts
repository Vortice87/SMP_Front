export class Cv {

    constructor(
        public cvId: number,
        public requestId: number,
        public name: string,
        public createdDate: Date,
        public comment: string,
        public status: string
    ) {
    }
}
