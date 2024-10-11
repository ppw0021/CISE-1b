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
exports.RevArticleController = void 0;
const common_1 = require("@nestjs/common");
const revarticle_service_1 = require("./revarticle.service");
const revarticle_schema_1 = require("./revarticle.schema");
let RevArticleController = class RevArticleController {
    constructor(revArticleService) {
        this.revArticleService = revArticleService;
    }
    async create(revArticle) {
        return this.revArticleService.create(revArticle);
    }
    async findAll() {
        return this.revArticleService.findAll();
    }
    async findOne(id) {
        return this.revArticleService.findOne(id);
    }
    async remove(id) {
        return this.revArticleService.remove(id);
    }
    async addRating(body) {
        const { articleName, rating } = body;
        console.log(`Article Name: ${articleName} and rating: ${rating}`);
        return this.revArticleService.addRating(articleName, rating);
    }
};
exports.RevArticleController = RevArticleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [revarticle_schema_1.RevArticle]),
    __metadata("design:returntype", Promise)
], RevArticleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RevArticleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RevArticleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RevArticleController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('addrating'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RevArticleController.prototype, "addRating", null);
exports.RevArticleController = RevArticleController = __decorate([
    (0, common_1.Controller)('revarticle'),
    __metadata("design:paramtypes", [revarticle_service_1.RevArticleService])
], RevArticleController);
//# sourceMappingURL=revarticle.controller.js.map