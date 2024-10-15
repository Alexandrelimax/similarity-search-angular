import { IUser } from "./iuser";
// UserSessionDto.ts
export class UserSessionDto {
    id: number;
    email: string;
    token: string;

    constructor(user: IUser) {
        this.id = user.id;
        this.email = user.email;
        this.token = user.token;
    }
}
