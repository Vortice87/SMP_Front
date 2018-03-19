import { ReqFunctional } from "./reqFunctional";
import { ReqTechnical } from "./reqTechnical";
import { LanguagesRequest } from "./languagesRequest";
import { Cv } from "./cv";
import { Provider } from "./provider";

export class Request {

    constructor(
        public id: number,
        public petitioner: string,
        public reason: string,
        public substitution: string,
        public suggestedService: string,
        public provider: Array<Provider>,
        public sugSerJust: string,
        public observations: string,
        public categoryFunc: string,
        public limitRate: number,
        public nResources: string,
        public profile: string,
        public technology: string,
        public startDate: Date,
        public endDate: Date,
        public area: string,
        public department: string,
        public management: string,
        public unity: string,
        public code: string,
        public descProject: string,
        public reqFuncts: Array<ReqFunctional>,
        public reqTechs: Array<ReqTechnical>,
        public descTask: string,
        public location: string,
        public floor: number,
        public place: string,
        public typeAccess: string,
        public platEquip: string,
        public contact: string,
        public mobile: string,
        public reasonDotation: string,
        public languages: Array<LanguagesRequest>,
        public guards: string,
        public cvs: Array<Cv>
    ) {

    }
}