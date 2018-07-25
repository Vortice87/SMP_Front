import { ReqTechnical } from './reqTechnical';
import { Cv } from './cv';
import { UserAccountDTO } from './userAccountDTO';

export class RequestDTO {

    constructor(
        public id: number,
        public petitionerId: number,
        public profile: string,
        public nResources: string,
        public startDate: Date,
        public descTask: string,
        public reqTechs: Array<ReqTechnical>,
        public cvs: Array<Cv>
    ) { }
}
