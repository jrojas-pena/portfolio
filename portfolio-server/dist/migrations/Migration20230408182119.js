"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230408182119 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230408182119 extends migrations_1.Migration {
    async up() {
        this.addSql('select 1');
    }
}
exports.Migration20230408182119 = Migration20230408182119;
//# sourceMappingURL=Migration20230408182119.js.map