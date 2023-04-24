"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230415220411 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230415220411 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" add column "first_name" text , add column "last_name" text ;');
    }
    async down() {
        this.addSql('alter table "user" drop column "first_name";');
        this.addSql('alter table "user" drop column "last_name";');
    }
}
exports.Migration20230415220411 = Migration20230415220411;
//# sourceMappingURL=Migration20230415220411.js.map