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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
let Post = class Post {
    constructor(title, body) {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.title = title;
        this.body = body;
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User),
    (0, core_1.ManyToOne)({ primary: true }),
    __metadata("design:type", User_1.User)
], Post.prototype, "author", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", Object)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ onUpdate: () => new Date(), type: 'date' }),
    __metadata("design:type", Object)
], Post.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "imageUri", void 0);
Post = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [String, String])
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map