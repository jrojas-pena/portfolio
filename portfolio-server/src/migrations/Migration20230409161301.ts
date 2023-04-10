import { Migration } from '@mikro-orm/migrations';

export class Migration20230409161301 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "id" serial;');
    this.addSql('alter table "user" alter column "username" type text using ("username"::text);');
    this.addSql('alter table "user" drop constraint "user_pkey";');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "username" type varchar(255) using ("username"::varchar(255));');
    this.addSql('alter table "user" drop constraint "user_username_unique";');
    this.addSql('alter table "user" drop constraint "user_pkey";');
    this.addSql('alter table "user" drop column "id";');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("username");');
  }

}
