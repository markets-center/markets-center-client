import React from 'react'
import ReactStars from 'react-rating-stars-component'


export default function Review({ rating, text }) {
    return (
        <div>
            <ReactStars
                size={20}
                edit={false}
                color={'#adb5bd'}
                activeColor={'#f1c40f'}
                isHalf={true}
                emptyIcon={<i className='fa fa-star' />}
                halfIcon={<i className='fa fa-star-half-alt' />}
                filledIcon={<i className='fa fa-star' />}
                value={rating}
            />
            <span>{text && text}</span>
        </div>
    )
}
