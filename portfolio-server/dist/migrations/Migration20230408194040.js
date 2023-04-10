"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230408194040 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230408194040 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("username" varchar(255) not null, "password" text not null, constraint "user_pkey" primary key ("username"));');
    }
    async down() {
        this.addSql('drop table if exists "user" cascade;');
    }
}
exports.Migration20230408194040 = Migration20230408194040;
//# sourceMappingURL=Migration20230408194040.js.map