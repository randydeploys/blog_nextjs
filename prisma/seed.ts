import { PrismaClient, UserRole } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})


async function main() {
  console.log('Start seeding ...')

  // Clean up existing data
  // Delete in reverse order of dependency
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.category.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.user.deleteMany()

  // Create Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: 'password123',
      role: UserRole.ADMIN,
    },
  })

  const author = await prisma.user.create({
    data: {
      email: 'author@example.com',
      name: 'Jane Author',
      password: 'password123',
      role: UserRole.AUTHOR,
    },
  })

  const subscriber = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'John Doe',
      password: 'password123',
      role: UserRole.SUBSCRIBER,
    },
  })

  // Create Categories
  const techCategory = await prisma.category.create({
    data: {
      name: 'Technology',
      slug: 'technology',
    },
  })

  const lifeCategory = await prisma.category.create({
    data: {
      name: 'Lifestyle',
      slug: 'lifestyle',
    },
  })

  // Create Tags
  const nextjsTag = await prisma.tag.create({
    data: {
      name: 'Next.js',
      slug: 'nextjs',
    },
  })

  const prismaTag = await prisma.tag.create({
    data: {
      name: 'Prisma',
      slug: 'prisma',
    },
  })

  // Create Posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Getting Started with Next.js and Prisma',
      slug: 'getting-started-nextjs-prisma',
      description: 'A comprehensive guide to building full-stack apps with Next.js and Prisma.',
      content: 'This is the main content of the post. It explains how to set up the environment, define the schema, and query the database.',
      published: true,
      authorId: author.id,
      categories: {
        connect: [{ id: techCategory.id }],
      },
      tags: {
        connect: [{ id: nextjsTag.id }, { id: prismaTag.id }],
      },
    },
  })

  const post2 = await prisma.post.create({
    data: {
      title: 'My Morning Routine',
      slug: 'my-morning-routine',
      description: 'How I start my day for maximum productivity.',
      content: 'Waking up early is key. I start by drinking a glass of water, then I do some light exercise...',
      published: true,
      authorId: author.id,
      categories: {
        connect: [{ id: lifeCategory.id }],
      },
    },
  })

  // Create Comments
  await prisma.comment.create({
    data: {
      content: 'Great article! Very helpful.',
      postId: post1.id,
      authorId: subscriber.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'I learned a lot, thanks.',
      postId: post1.id,
      authorId: admin.id,
    },
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })