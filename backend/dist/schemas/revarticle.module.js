"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevArticleModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const revarticle_controller_1 = require("./revarticle.controller");
const revarticle_service_1 = require("./revarticle.service");
const revarticle_schema_1 = require("./revarticle.schema");
let RevArticleModule = class RevArticleModule {
};
exports.RevArticleModule = RevArticleModule;
exports.RevArticleModule = RevArticleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: revarticle_schema_1.RevArticle.name, schema: revarticle_schema_1.RevArticleSchema }]),
        ],
        controllers: [revarticle_controller_1.RevArticleController],
        providers: [revarticle_service_1.RevArticleService],
    })
], RevArticleModule);
//# sourceMappingURL=revarticle.module.js.map