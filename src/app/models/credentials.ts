export class Credentials {

    public id: number;
    public username: string;
    public password: string;
    public profile: string;

    constructor(){
    }

    public static createUserFromJson(entity: any): Credentials

    {
        let credential: Credentials = new Credentials();

        credential.id = entity.id;
        credential.username = entity.username;
        credential.password = entity.password;
        credential.profile = entity.profile;

        return credential;
        
    }
}
