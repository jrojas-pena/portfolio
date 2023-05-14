import { Migration } from '@mikro-orm/migrations';

export class Migration20230514163457 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "post" add column "author_id" int not null default 1;',
    );
    this.addSql(
      'alter table "post" alter column "id" type int using ("id"::int);',
    );
    this.addSql('alter table "post" drop constraint "post_pkey";');
    this.addSql(
      'alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;',
    );
    this.addSql('alter table "post" alter column "id" drop default;');
    this.addSql(
      'alter table "post" add constraint "post_pkey" primary key ("id", "author_id");',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop constraint "post_author_id_foreign";');

    this.addSql(
      'alter table "post" alter column "id" type int using ("id"::int);',
    );
    this.addSql('alter table "post" drop constraint "post_pkey";');
    this.addSql('alter table "post" drop column "author_id";');
    this.addSql('create sequence if not exists "post_id_seq";');
    this.addSql(
      'select setval(\'post_id_seq\', (select max("id") from "post"));',
    );
    this.addSql(
      'alter table "post" alter column "id" set default nextval(\'post_id_seq\');',
    );
    this.addSql(
      'alter table "post" add constraint "post_pkey" primary key ("id");',
    );
  }
}
