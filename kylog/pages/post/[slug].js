import React from 'react'

import { getPosts, getPostDetails } from '../../services'

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm } from '../../components'

//Naming the file like this allows us to use dynamic routing. If the users input a text in the searchbar, Next js will
//allow us to interpret the text as if it was a slug embedded in our website
const PostDetails = ( { post } ) => {
  return (
    <div className='container mx-auto px-10 pb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>

            <div className='col-span-1 lg:col-span-8'>
                <PostDetail post = { post }/>
                <Author author = { post.author }/>
                <CommentsForm slug = { post.slug }/>
                <Comments slug = { post.slug }/>
            </div>

            <div className='col-span-1 lg:col-span-4'>
                <div className='relative lg:sticky top-8'>
                    <PostWidget slug = { post.slug } categories = { post.categories.map(category => category.slug) }/>
                    <Categories />
                </div>
            </div>

        </div>
    </div>
  )
}

export default PostDetails

export async function getStaticProps({ params }) {

    const data = await getPostDetails(params.slug)
    return {
      props:  { post: data }
    }
  
}

export async function getStaticPaths() {
    const post = await getPosts();

    return {
        paths: post.map(({ node: { slug }}) => ({ params: { slug }})),
        fallback: false
    }
}