"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const notification_service_1 = require("./notification.service");
const crypto = require("crypto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers() {
        return this.userService.findAllUsers();
    }
    async emailExists(email) {
        const exists = await this.userService.emailExists(email);
        return { exists };
    }
    async getEmailFromToken(body) {
        const { auth_token } = body;
        const response = await this.userService.getEmailFromAuthToken(auth_token);
        return { response };
    }
    generateToken() {
        return crypto.randomBytes(16).toString('hex');
    }
    async validateUser(body) {
        notification_service_1.NotificationService.createNotification("example@gmail.com", "This is a test notification");
        const { email, passwordHash } = body;
        const exists = await this.userService.emailExists(email);
        let isAdmin = false;
        let isMod = false;
        let isAnalyst = false;
        let authToken = "";
        if (!exists) {
            console.log(`No matching email for ${email}`);
            return { exists, valid: false, isAdmin: false, isMod: false, isAnalyst: false, authToken };
        }
        isAdmin = await this.userService.checkAdmin(email);
        isMod = await this.userService.checkMod(email);
        isAnalyst = await this.userService.checkAnalyst(email);
        const isValid = await this.userService.validatePassword(email, passwordHash);
        if (isValid) {
            authToken = this.generateToken();
            const updatedUser = await this.userService.updateAuthTokenByEmail(email, authToken);
            if (updatedUser) {
                console.log(`User ${email} logged in with password hash ${passwordHash}, authToken is ${authToken}`);
                return { exists, valid: isValid, isAdmin, isMod, isAnalyst, authToken };
            }
            else {
                console.log("Failed to write to database, check Mongo or schema");
                authToken = "";
                return { exists, valid: false, isAdmin, isMod: false, isAnalyst: false, authToken };
            }
        }
        console.log(`User ${email} used the wrong password`);
        return { exists, valid: isValid, isAdmin, isMod, isAnalyst, authToken };
    }
    async registerUser(body) {
        const { email, passwordHash } = body;
        const exists = await this.userService.emailExists(email);
        if (exists) {
            console.log(`Email already exists for ${email}`);
            return { alreadyExists: exists, success: false, isAdmin: false, authToken: "" };
        }
        const newUser = await this.userService.createNewUser(email, passwordHash);
        let authToken = this.generateToken();
        const updatedUser = await this.userService.updateAuthTokenByEmail(email, authToken);
        if (newUser.email != null) {
            return { alreadyExists: false, success: true, isAdmin: false, authToken: authToken };
        }
        else {
            return { alreadyExists: false, success: false, isAdmin: false, authToken: "" };
        }
    }
    async deleteUserByToken(authToken) {
        console.log(`Deleting user with authToken ${authToken}`);
        const deleted = await this.userService.deleteUser(authToken);
        if (deleted) {
            console.log(`Deleted user with authToken ${authToken}`);
        }
        return { success: deleted };
    }
    async toggleUserRole(body) {
        const { authToken, role, status } = body;
        const user = await this.userService.findUserByAuthToken(authToken);
        if (!user) {
            return { success: false };
        }
        const updatedUser = await this.userService.toggleUserRole(authToken, role, status);
        if (updatedUser) {
            console.log(`Toggled ${role} role for user with authToken ${authToken}`);
            return { success: true };
        }
        return { success: false };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('exists'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "emailExists", null);
__decorate([
    (0, common_1.Post)('emailfromtoken'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getEmailFromToken", null);
__decorate([
    (0, common_1.Post)('validate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateUser", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Delete)(':authToken'),
    __param(0, (0, common_1.Param)('authToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserByToken", null);
__decorate([
    (0, common_1.Put)('toggleRole'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "toggleUserRole", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map