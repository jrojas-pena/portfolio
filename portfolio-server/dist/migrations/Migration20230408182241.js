"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230408182241 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230408182241 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "post" alter column "body" type varchar(255) using ("body"::varchar(255));');
        this.addSql('alter table "post" alter column "body" drop not null;');
    }
    async down() {
        this.addSql('alter table "post" alter column "body" type varchar(255) using ("body"::varchar(255));');
        this.addSql('alter table "post" alter column "body" set not null;');
    }
}
exports.Migration20230408182241 = Migration20230408182241;
//# sourceMappingURL=Migration20230408182241.js.map