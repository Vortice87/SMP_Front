export class Cv {

    constructor(
        public cvId: number,
        public requestId: number,
        public candidate: string,
        public createdDate: Date,
        public filePath: string,
        public comment: Array<string>,
        public status: string,
        public fileName: string,
        public fileType: string,
        public fileData: string
    ) {
    }
}
