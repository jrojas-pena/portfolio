import { Resolver, Query, Field } from 'type-graphql';
import { Post } from '../entities/Post';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  @Field(() => [Post])
  async posts(): Promise<Post[]> {
    return Post.find();
  }
}
