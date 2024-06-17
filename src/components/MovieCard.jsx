import React, {useRef, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMovie, toggleLikeMovie, toggleDisLikeMovie } from '../redux'
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline'
import { HandThumbUpIcon as ThumbUpSolid, HandThumbDownIcon as ThumbDownSolid} from '@heroicons/react/24/solid'

export default function MovieCard(props) {

    const dispatch = useDispatch()
    const [width, setWidth] = useState({});
    const [toggleLike, setToggleLike] = useState(false)
    const [toggleDisLike, setToggleDisLike] = useState(false)
    const likeRef = useRef()
    const dislikeRef = useRef()
    const ratioContainerRef = useRef()

    
    const calculateRatio = (totalWidth, likes, dislikes) => {
       return new Promise((resolve, reject) => {
            let total =  likes + dislikes
            let likesPercentage =  (likes/total) * 100
            let likesWidth = totalWidth * likesPercentage * 0.01
            let dislikesWidth = totalWidth - likesWidth
            if(totalWidth-likesWidth === dislikesWidth){
                resolve ([likesWidth, dislikesWidth])
            }else{
                reject("error")
            }
        })
    }

    const toggleButton= ( buttonType) => {
        if(buttonType === 'like'){
            dispatch(toggleLikeMovie({id: props.movie.id, toggleLike: toggleLike}))
            setToggleLike(!toggleLike)
        }
        else{
            dispatch(toggleDisLikeMovie({id: props.movie.id, toggleDisLike: toggleDisLike}))
            setToggleDisLike(!toggleDisLike)
        }
    }

    useEffect(() => {
        const ratioContainerWidth = ratioContainerRef.current.clientWidth
        calculateRatio(ratioContainerWidth, props.movie.likes, props.movie.dislikes)
        .then((res)=>{
            setWidth({"likesWidth":res[0],"dislikesWidth":res[1]})
        })
    }, [props.movie.likes, props.movie.dislikes]);



  return (
    <div className="card w-60 glass rounded-lg mx-6 my-10">
        <div>
            <button className='w-1/6 py-1 absolute right-0 bg-red-600 rounded-lg' onClick={(e)=>{
                dispatch(deleteMovie(props.movie.id))
            }}>x
            </button>

        </div>
        <figure>
            <img src={`src/assets/images/${(props.movie.title).replace(/ /g,'').toLowerCase()}.jpeg`}
                className='bg-auto h-auto w-full rounded-lg'
            />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{props.movie.title}</h2>
            <p>{props.movie.category}</p>
            <div className='my-4 flex h-2 rounded-md' ref={ratioContainerRef} >
                <div className='bg-lime-500' ref={likeRef} style={{width:width.likesWidth+'px'}} ></div>
                <div className='bg-rose-600' ref={dislikeRef} style={{width:width.dislikesWidth+'px'}}></div>
            </div>
            <div className=' w-3/4 rounded-md bg-gray-100 flex justify-around p-2 '>
                <button onClick={() => toggleButton('like')}>
                    {toggleLike ? <ThumbUpSolid className="h-6 w-6"/> : <HandThumbUpIcon className="h-6 w-6"/>}
                </button>
                <span className='ml-1'>{props.movie.likes}</span>
                <span className='mx-2'> | </span>
                <button onClick={()=>toggleButton('dislike')}>
                    {toggleDisLike ? <ThumbDownSolid className="h-6 w-6"/> : <HandThumbDownIcon className="h-6 w-6"/>}
                </button>
            </div>
        </div>
    </div>
    

  )
}

//test