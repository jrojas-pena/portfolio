import { User } from '../entities/User';
import { Post } from '../entities/Post';
import { MyContext } from 'src/types';
import { Resolver, Query, Ctx, Int, Arg, Mutation } from 'type-graphql';

@Resolver()
export class PostResolver {
  // Get all posts
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  // Get a single post
  @Query(() => Post, { nullable: true })
  post(
    @Arg('id', () => Int) id: number,
    @Ctx() { em }: MyContext,
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  // Create a post
  @Mutation(() => Post)
  async createPost(
    @Arg('title') title: string,
    @Arg('body') body: string,
    @Ctx() { em, req }: MyContext,
  ): Promise<Post | null> {
    if (!req.session.userId) {
      return null;
    }
    const user = (await em.findOne(User, { id: req.session.userId })) as User;
    const post = em.create(Post, {
      title,
      body,
      createdAt: '',
      updatedAt: '',
      author: user,
      imageUri: '',
    });
    await em.persistAndFlush(post);
    return post;
  }

  // Update a post
  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id') id: number,
    @Arg('title', () => String, { nullable: true }) title: string,
    @Arg('body', () => String, { nullable: true }) body: string,
    @Ctx() { em }: MyContext,
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }
    if (typeof title !== 'undefined') {
      post.title = title;
      post.updatedAt = new Date();
    }
    if (typeof body !== 'undefined') {
      post.body = body;
      post.updatedAt = new Date();
    }
    await em.persistAndFlush(post);
    return post;
  }

  // Delete a post
  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id') id: number,
    @Ctx() { em }: MyContext,
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Post, { id });
    } catch {
      return false;
    }
    return true;
  }
}
