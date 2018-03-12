export class UserAccount {

    constructor(public id: number,
        public username: string,
        public password: string,
        public profile: string) {

    }

    public static createUserFromJson(entity: any): UserAccount {
        
        let user = new UserAccount(entity.id,entity.username,entity.password,entity.profile);
        return user;

    }
}
