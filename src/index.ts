import { MikroORM } from '@mikro-orm/core'
import { __dbpassword__, __dbuser__, __prod__ } from './constants'
import { Post } from './entities/Post'

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: 'portfolio',
    user: __dbuser__,
    password: __dbpassword__,
    type: 'postgresql',
    debug: !__prod__,
  })

  const postData = {
    title: 'My Post Title',
    body: 'Lorem ipsum dolor sit amet.',
  }

  const post = new Post(postData.title, postData.body)
  post.createdAt = new Date()
  post.updatedAt = new Date()
}

main()
