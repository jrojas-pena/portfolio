import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';
import { User } from './User';

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field(() => User)
  @ManyToOne({ primary: true })
  author!: User;

  @Field(() => String)
  @Property()
  title!: string;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  body?: string;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date(), type: 'date' })
  updatedAt = new Date();

  @Field(() => String, { nullable: true })
  @Property({ type: 'text', nullable: true })
  imageUri?: string;

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }
}
