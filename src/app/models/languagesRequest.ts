export class LanguagesRequest {

    constructor(
        public id_lang: number,
        public language: string,
        public level: string,
        public reqdes: string,
        public currentIndex: number,
        public header: boolean  
    ) {

    }
}