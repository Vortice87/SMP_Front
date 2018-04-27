export class LanguagesRequest {

    constructor(
        public langId: number,
        public language: string,
        public level: string,
        public reqdes: string,
        public requestId: number,
        public currentIndex: number,
        public header: boolean  
    ) {

    }
}