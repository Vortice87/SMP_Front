export class UserAccountDTO {

    constructor(
        public id: number,
        public name: string,
        public lastName: string,
        public username: string,
        public password: string,
        public profile: string,
        public requests: Array<Request>) {

    }

    public static createUserFromJson(entity: any): UserAccountDTO {
        return new UserAccountDTO(entity.id, entity.name,
            entity.lastName, entity.username, entity.password, entity.profile, entity.requests);
    }
}
