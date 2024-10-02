import React from 'react';
import { Article } from './Article';
import { useRouter } from 'next/navigation';
interface IProp {
Article?: Article;
}
const ArticleCard = ({ Article }: IProp) => {
const router = useRouter();
if (Article == undefined) {
return null;
}
const onClick = () => {
router.push(`/show-Article/${Article._id}`)
};
return (<div className='card-container' onClick={onClick}>
    <img
    src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
    alt='Articles'
    height={200}
    />
    <div className='desc'>
    <h2>
    {Article.title}
    </h2>
    <h3>{Article.authors}</h3>
    </div>
    </div>
    );
    };
    export default ArticleCard;