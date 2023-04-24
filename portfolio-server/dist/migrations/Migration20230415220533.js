"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230415220533 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230415220533 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" alter column "first_name" type text using ("first_name"::text);');
        this.addSql('alter table "user" alter column "first_name" drop not null;');
        this.addSql('alter table "user" alter column "last_name" type text using ("last_name"::text);');
        this.addSql('alter table "user" alter column "last_name" drop not null;');
    }
    async down() {
        this.addSql('alter table "user" alter column "first_name" type text using ("first_name"::text);');
        this.addSql('alter table "user" alter column "first_name" set not null;');
        this.addSql('alter table "user" alter column "last_name" type text using ("last_name"::text);');
        this.addSql('alter table "user" alter column "last_name" set not null;');
    }
}
exports.Migration20230415220533 = Migration20230415220533;
//# sourceMappingURL=Migration20230415220533.js.map