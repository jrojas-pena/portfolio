import { Migration } from '@mikro-orm/migrations';

export class Migration20230415220533 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "first_name" type text using ("first_name"::text);');
    this.addSql('alter table "user" alter column "first_name" drop not null;');
    this.addSql('alter table "user" alter column "last_name" type text using ("last_name"::text);');
    this.addSql('alter table "user" alter column "last_name" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "first_name" type text using ("first_name"::text);');
    this.addSql('alter table "user" alter column "first_name" set not null;');
    this.addSql('alter table "user" alter column "last_name" type text using ("last_name"::text);');
    this.addSql('alter table "user" alter column "last_name" set not null;');
  }

}
