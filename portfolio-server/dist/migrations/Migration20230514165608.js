"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230514165608 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230514165608 extends migrations_1.Migration {
    async up() {
        this.addSql('select 1');
    }
}
exports.Migration20230514165608 = Migration20230514165608;
//# sourceMappingURL=Migration20230514165608.js.map