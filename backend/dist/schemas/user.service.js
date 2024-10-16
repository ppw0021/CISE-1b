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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAllUsers() {
        return this.userModel.find().exec();
    }
    async emailExists(email) {
        const user = await this.userModel.findOne({ email }).exec();
        return !!user;
    }
    async validatePassword(email, passwordHash) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user)
            return false;
        return user.passwordHash === passwordHash;
    }
    async checkAdmin(email) {
        const user = await this.userModel.findOne({ email }).exec();
        if (user.isAdmin === null) {
            return false;
        }
        else {
            return user.isAdmin;
        }
    }
    async getEmailFromAuthToken(auth_token) {
        const user = await this.userModel.findOne({ auth_token }).exec();
        if (user === null) {
            return '';
        }
        else {
            return user.email;
        }
    }
    async checkMod(email) {
        const user = await this.userModel.findOne({ email }).exec();
        if (user.isMod === null) {
            return false;
        }
        else {
            return user.isMod;
        }
    }
    async checkAnalyst(email) {
        const user = await this.userModel.findOne({ email }).exec();
        if (user.isAnalyst === null) {
            return false;
        }
        else {
            return user.isAnalyst;
        }
    }
    async updateAuthTokenByEmail(email, authToken) {
        const updatedUser = await this.userModel.findOneAndUpdate({ email }, { $set: { authToken } }, { new: true, useFindAndModify: false }).exec();
        return updatedUser;
    }
    async createNewUser(email, passwordHash) {
        if (!email || !passwordHash) {
            console.log('Email and password required');
            return;
        }
        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
            console.log('Email exists');
            return;
        }
        try {
            const newUser = new this.userModel({ email, passwordHash, isAdmin: false, isAnalyst: false, isMod: false, authToken: "" });
            const savedUser = await newUser.save();
            return savedUser;
        }
        catch (error) {
            console.error('Error creating new user:', error);
            throw new Error('Internal server error');
        }
    }
    async deleteUser(authToken) {
        const deleted = await this.userModel.findOne({ authToken }).deleteOne().exec();
        return !!deleted;
    }
    async findUserByAuthToken(authToken) {
        return this.userModel.findOne({ authToken }).exec();
    }
    async toggleUserRole(authToken, role, status) {
        const roleMap = {
            admin: 'isAdmin',
            mod: 'isMod',
            analyst: 'isAnalyst',
        };
        const roleField = roleMap[role];
        if (!roleField) {
            throw new Error(`Invalid role: ${role}`);
        }
        const update = { [roleField]: status };
        console.log(`Toggling ${roleField} role for user to ${status} with authToken ${authToken}`);
        const updatedUser = await this.userModel.findOneAndUpdate({ authToken }, { $set: update }, { new: true }).exec();
        if (!updatedUser) {
            throw new Error('Failed to update user role');
        }
        console.log('Updated user:', updatedUser);
        return updatedUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map