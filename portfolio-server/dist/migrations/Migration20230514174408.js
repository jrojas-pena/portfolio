"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230514174408 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230514174408 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "post" alter column "id" type int using ("id"::int);');
        this.addSql('create sequence if not exists "post_id_seq";');
        this.addSql('select setval(\'post_id_seq\', (select max("id") from "post"));');
        this.addSql('alter table "post" alter column "id" set default nextval(\'post_id_seq\');');
    }
    async down() {
        this.addSql('alter table "post" alter column "id" type int using ("id"::int);');
        this.addSql('alter table "post" alter column "id" drop default;');
    }
}
exports.Migration20230514174408 = Migration20230514174408;
//# sourceMappingURL=Migration20230514174408.js.map