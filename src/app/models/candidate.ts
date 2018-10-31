import { DocumentData } from './document-data';

export class Candidate {

    constructor(
        public candidateId: number,
        public requestId: number,
        public name: string,
        public createdDate: Date,
        public comment: Array<any>,
        public status: string,
        public documentBase64: string
    ) {
    }
}
