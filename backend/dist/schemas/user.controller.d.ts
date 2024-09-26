import { UserService } from './user.service';
import { User } from '../schemas/user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    emailExists(email: string): Promise<{
        exists: boolean;
    }>;
}
