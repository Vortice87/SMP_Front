export class Candidate {

    constructor(
        public candidateId: number,
        public requestId: number,
        public name: string,
        public createdDate: Date,
        public filePath: string,
        public comment: Array<any>,
        public status: string,
        public fileName: string,
        public fileType: string,
        public fileData: string
    ) {
    }
}
