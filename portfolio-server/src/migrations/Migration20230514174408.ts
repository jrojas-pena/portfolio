import { Migration } from '@mikro-orm/migrations';

export class Migration20230514174408 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" alter column "id" type int using ("id"::int);');
    this.addSql('create sequence if not exists "post_id_seq";');
    this.addSql('select setval(\'post_id_seq\', (select max("id") from "post"));');
    this.addSql('alter table "post" alter column "id" set default nextval(\'post_id_seq\');');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "post" alter column "id" drop default;');
  }

}
