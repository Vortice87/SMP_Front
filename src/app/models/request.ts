import { ReqTechnical } from './reqTechnical';
import { Candidate } from './Candidate';
import { UserAccountDTO } from './userAccountDTO';

export class RequestDTO {

    constructor(
        public id: number,
        public petitioner: UserAccountDTO,
        public creationDate: Date,
        public profile: string,
        public resources: string,
        public startDate: Date,
        public status: string,
        public descTask: string,
        public reqTechs: Array<ReqTechnical>,
        public candidates: Array<Candidate>
    ) { }
}
