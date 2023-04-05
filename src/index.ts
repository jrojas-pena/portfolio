import { MikroORM } from '@mikro-orm/core'
import { __dbpassword__, __dbuser__, __prod__ } from './constants'
import { Post } from './entities/Post'
import mikroConfig from './mikro-orm.config'

const main = async () => {
  const orm = await MikroORM.init(mikroConfig)

  const postData = {
    title: 'My Post Title',
    body: 'Lorem ipsum dolor sit amet.',
  }

  const post = new Post(postData.title, postData.body)
  post.createdAt = new Date()
  post.updatedAt = new Date()
  await orm.em.persistAndFlush(post)
}

main()
