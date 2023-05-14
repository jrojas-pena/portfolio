"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230430184529 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230430184529 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "post" add column "image_uri" text null;');
        this.addSql('alter table "user" add column "profile_picture" text null;');
    }
    async down() {
        this.addSql('alter table "post" drop column "image_uri";');
        this.addSql('alter table "user" drop column "profile_picture";');
    }
}
exports.Migration20230430184529 = Migration20230430184529;
//# sourceMappingURL=Migration20230430184529.js.map