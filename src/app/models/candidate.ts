import { DocumentData } from './document-data';
import { Comment } from './comment';

export class Candidate {

    constructor(
        public candidateId: number,
        public requestId: number,
        public name: string,
        public createdDate: Date,
        public comments: Array<Comment>,
        public status: string,
        public documentBase64: string
    ) {
    }
}
