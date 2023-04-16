import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  @Property({ type: 'number', unique: true })
  id!: number;

  @Field(() => String)
  @Property({ type: 'text', unique: true })
  username!: string;

  @Field(() => String)
  @Property({ type: 'text' })
  password!: string;

  @Field(() => String)
  @Property({ type: 'text', nullable: true })
  firstName?: string;

  @Field(() => String)
  @Property({ type: 'text', nullable: true })
  lastName?: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
