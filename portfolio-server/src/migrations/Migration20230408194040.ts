import { Migration } from '@mikro-orm/migrations';

export class Migration20230408194040 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("username" varchar(255) not null, "password" text not null, constraint "user_pkey" primary key ("username"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
