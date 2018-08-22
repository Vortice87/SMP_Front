export class Cv {

    constructor(
        public cvId: number,
        public requestId: number,
        public candidate: string,
        public createdDate: string,
        public filePath: string,
        public comment: string,
        public status: string,
        public fileName: string,
        public fileType: string,
        public fileData: string
    ) {
    }
}
