export class Comment {

    constructor(
        public commentId: number,
        public description: string,
        public creationDate: Date,
        public candidateId: number) { }
}
