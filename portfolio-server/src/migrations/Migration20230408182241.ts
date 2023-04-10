import { Migration } from '@mikro-orm/migrations';

export class Migration20230408182241 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" alter column "body" type varchar(255) using ("body"::varchar(255));');
    this.addSql('alter table "post" alter column "body" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" alter column "body" type varchar(255) using ("body"::varchar(255));');
    this.addSql('alter table "post" alter column "body" set not null;');
  }

}
