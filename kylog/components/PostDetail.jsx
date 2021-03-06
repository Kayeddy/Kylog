import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import * as AiIcons from 'react-icons/ai'

const PostDetail = ({ post }) => {

    const getContentFragment = (index, text, obj, type) => {

        let modifiedText = text;
    
        if (obj) {
          if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
          }
    
          if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
          }
    
          if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
          }
        }
    
        switch (type) {

          case 'paragraph':
            return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;

          case 'heading-one':
            return <h1 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h1>;

          case 'heading-two':
            return <h2 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h2>;
      
          case 'heading-three':
            return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      
          case 'heading-four':
            return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;

          case 'heading-five':
            return <h5 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h5>;

          case 'heading-six':
            return <h6 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h6>;

          case 'image':
            return (
              <img
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
              />
            );

          case 'bulleted-list':
            return <ul key= {index} className = 'mb-8'> { modifiedText.map((item, i) => <React.Fragment key= { i }> <li><p> { console.log(item) } </p></li> </React.Fragment>)} </ul>;

          case 'code-block':
            return <span key= {index} className = 'bg-gray-400 mb-5'> { modifiedText.map((item, i) => <React.Fragment key= { i }> <p> { item } </p> </React.Fragment>)} </span>;

          default:
            return modifiedText;
        }

    }

  return (
   <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
        <div className='relative overflow-hidden shadow-md mb-6'>
            <img src= { post.featuredImage.url } alt= { post.title } className = 'object-top h-full w-full'/>
        </div>

        <div className='px-4 lg:px-0'>
            <div className='flex items-center mb-8 w-full'> 
                <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
                    <div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>

                        {post.authors.map((author) => (
                            <div key= { author.id } className = 'flex align-center'>
                              <img src= {author.photo.url} alt= { author.name } width= '30px' height= '30px' className='align-middle rounded-full' />
                              <p className='inline align-middle text-gray-700 ml-2 text-lg'>
                              <Link href = { `/author/${author.id}` } alt = { author.name }>
                                { author.name }
                              </Link>
                              </p>
                            </div>
                        ))}
                    
                    </div>

                    <div className='flex font-medium text-gray-700 text-center justify-center items-center'>
                        <AiIcons.AiFillCalendar className='inline h-7 mr-1'/>
                        <span>
                            {
                                moment(post.createdAt).format('MMM DD, YYYY')
                            }
                        </span>
                    </div>

                </div>
            </div>
            <h1 className='mb-8 text-3xl font-semibold'>
                {
                    post.title
                }
            </h1>
            { post.content.raw.children.map((typeObj, index) => {
                const children = typeObj.children.map((child, childIndex) => getContentFragment(childIndex, child.text, child))

                return getContentFragment(index, children, typeObj, typeObj.type)
            })}
        </div>
   </div>
  )
}

export default PostDetail