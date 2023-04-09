import { User } from '../entities/User';
import { MyContext } from 'src/types';
import {
  Resolver,
  Ctx,
  Arg,
  Mutation,
  InputType,
  Field,
  ObjectType,
} from 'type-graphql';
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  error?: FieldError[];
}

@Resolver()
export class UserResolver {
  // Create a user
  @Mutation(() => User)
  async createUser(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em }: MyContext,
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        error: [
          {
            field: 'username',
            message: 'Username must be at least 3 characters long',
          },
        ],
      };
    }

    if (options.password.length <= 3) {
      return {
        error: [
          {
            field: 'password',
            message: 'Password must be at least 3 characters long',
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === '23505') {
        return {
          error: [
            {
              field: 'username',
              message: 'Username already taken',
            },
          ],
        };
      }
    }
    return { user };
  }

  // Login a user
  @Mutation(() => UserResponse, { nullable: true })
  async login(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext,
  ): Promise<UserResponse> {
    // get user from database
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        error: [
          {
            field: 'username',
            message: 'That username does not exist',
          },
        ],
      };
    }

    // compare password
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        error: [
          {
            field: 'password',
            message: 'Incorrect password',
          },
        ],
      };
    }

    req.session!.userId = user.id;
    return { user };
  }
}
