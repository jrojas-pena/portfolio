import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';
import { Post } from './Post';

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

  @Field(() => String, { nullable: true })
  @Property({ type: 'text', nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  @Property({ type: 'text', nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  @Property({ type: 'text', nullable: true })
  profilePicture?: string;

  @OneToMany(() => Post, (post) => post.author)
  posts = new Collection<Post>(this);

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
