import { Migration } from '@mikro-orm/migrations';

export class Migration20230430184529 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "image_uri" text null;');

    this.addSql('alter table "user" add column "profile_picture" text null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop column "image_uri";');

    this.addSql('alter table "user" drop column "profile_picture";');
  }

}
