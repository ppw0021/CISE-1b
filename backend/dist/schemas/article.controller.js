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
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const article_service_1 = require("./article.service");
const create_article_dto_1 = require("./dto/create-article.dto");
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    async checkArticleExists(title) {
        const exists = await this.articleService.checkArticleExists(title);
        return { exists };
    }
    async findAll() {
        return this.articleService.findAll();
    }
    async create(createArticleDto) {
        return this.articleService.create(createArticleDto);
    }
    async moderateArticle(id, moderated, status, researchType) {
        return this.articleService.updateModerationStatus(id, moderated, status, researchType);
    }
    async acceptArticle(id) {
        return this.articleService.updateModerationStatus(id, true, 'accepted');
    }
    async denyArticle(id) {
        console.log(`Denying article with ID: ${id}`);
        return this.articleService.updateModerationStatus(id, true, 'denied');
    }
    async findUnmoderated() {
        return this.articleService.findUnmoderated();
    }
    async getModeratedArticles(status) {
        return await this.articleService.findByStatus(status);
    }
    async update(id, updateArticleDto) {
        return this.articleService.update(id, updateArticleDto);
    }
};
exports.ArticleController = ArticleController;
__decorate([
    (0, common_1.Get)('exists'),
    __param(0, (0, common_1.Query)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "checkArticleExists", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/moderate'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('moderated')),
    __param(2, (0, common_1.Body)('status')),
    __param(3, (0, common_1.Body)('researchType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, String, Array]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "moderateArticle", null);
__decorate([
    (0, common_1.Patch)(':id/accept'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "acceptArticle", null);
__decorate([
    (0, common_1.Patch)(':id/deny'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "denyArticle", null);
__decorate([
    (0, common_1.Get)('/unmoderated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findUnmoderated", null);
__decorate([
    (0, common_1.Get)('moderated'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getModeratedArticles", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "update", null);
exports.ArticleController = ArticleController = __decorate([
    (0, common_1.Controller)('article'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
//# sourceMappingURL=article.controller.js.map