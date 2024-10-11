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
exports.RevArticleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const revarticle_schema_1 = require("./revarticle.schema");
let RevArticleService = class RevArticleService {
    constructor(revArticleModel) {
        this.revArticleModel = revArticleModel;
    }
    async create(revArticle) {
        const createdRevArticle = new this.revArticleModel(revArticle);
        return createdRevArticle.save();
    }
    async findAll() {
        return this.revArticleModel.find().exec();
    }
    async findOne(id) {
        return this.revArticleModel.findById(id).exec();
    }
    async remove(id) {
        return this.revArticleModel.findByIdAndDelete(id).exec();
    }
    async addRating(articleNameIncoming, ratingIncoming) {
        if (ratingIncoming == 1) {
            const result = await this.revArticleModel.findOneAndUpdate({ title: articleNameIncoming }, { $inc: { one_star_reviews: 1 } }, { new: true });
            console.log(`Rating: ${ratingIncoming} result: ${result}`);
            return result ? true : false;
        }
        else if (ratingIncoming == 2) {
            const result = await this.revArticleModel.findOneAndUpdate({ title: articleNameIncoming }, { $inc: { two_star_reviews: 1 } }, { new: true });
            console.log(`Rating: ${ratingIncoming} result: ${result}`);
            return result ? true : false;
        }
        else if (ratingIncoming == 3) {
            const result = await this.revArticleModel.findOneAndUpdate({ title: articleNameIncoming }, { $inc: { three_star_reviews: 1 } }, { new: true });
            console.log(`Rating: ${ratingIncoming} result: ${result}`);
            return result ? true : false;
        }
        else if (ratingIncoming == 4) {
            const result = await this.revArticleModel.findOneAndUpdate({ title: articleNameIncoming }, { $inc: { four_star_reviews: 1 } }, { new: true });
            console.log(`Rating: ${ratingIncoming} result: ${result}`);
            return result ? true : false;
        }
        else {
            const result = await this.revArticleModel.findOneAndUpdate({ title: articleNameIncoming }, { $inc: { five_star_reviews: 1 } }, { new: true });
            console.log(`Rating: ${ratingIncoming} result: ${result}`);
            return result ? true : false;
        }
    }
};
exports.RevArticleService = RevArticleService;
exports.RevArticleService = RevArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(revarticle_schema_1.RevArticle.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RevArticleService);
//# sourceMappingURL=revarticle.service.js.map