import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    emailExists(email: string): Promise<{
        exists: boolean;
    }>;
    validateUser(body: {
        email: string;
        passwordHash: string;
    }): Promise<{
        exists: boolean;
        valid: boolean;
    }>;
}
