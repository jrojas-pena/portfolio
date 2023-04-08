import { User } from '../entities/User';
import { MyContext } from 'src/types';
import {
  Resolver,
  Ctx,
  Arg,
  Mutation,
  InputType,
  Field,
  Query,
} from 'type-graphql';
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  // Create a user
  @Mutation(() => User)
  async createUser(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em }: MyContext,
  ): Promise<User | null> {
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);
    return user;
  }

  // Login a user
  @Query(() => User, { nullable: true })
  async login(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em }: MyContext,
  ): Promise<User | null> {
    const hashedPassword = await argon2.hash(options.password);
    // get user from database
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return null;
    }
    // compare password
    const valid = await argon2.verify(hashedPassword, options.password);
    if (!valid) {
      return null;
    }
    return user;
  }
}
