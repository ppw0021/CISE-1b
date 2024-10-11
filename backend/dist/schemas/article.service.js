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
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const article_schema_1 = require("../schemas/article.schema");
let ArticleService = class ArticleService {
    constructor(articleModel) {
        this.articleModel = articleModel;
    }
    async findAll() {
        return this.articleModel.find().exec();
    }
    async create(createArticleDto) {
        const createdArticle = new this.articleModel(createArticleDto);
        return createdArticle.save();
    }
    async updateModerationStatus(id, moderated, status, researchType) {
        console.log(`Updating article ${id} with status: ${status}`);
        const updateData = { moderated, status };
        if (researchType) {
            updateData.researchType = researchType;
        }
        const updatedArticle = await this.articleModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedArticle) {
            console.log(`Article ${id} not found`);
            throw new common_1.NotFoundException('Article not found');
        }
        console.log(`Updated article: ${JSON.stringify(updatedArticle)}`);
        return updatedArticle;
    }
    async checkArticleExists(title) {
        const article = await this.articleModel.findOne({ title }).exec();
        return !!article;
    }
    async findUnmoderated() {
        return this.articleModel.find({ moderated: false }).exec();
    }
    async findByStatus(status) {
        return await this.articleModel.find({ status }).exec();
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(article_schema_1.Article.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ArticleService);
//# sourceMappingURL=article.service.js.map