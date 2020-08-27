  
import React from 'react'
import Gif from '../Gif'
import './styles.css'

const ListOfGifs = ({gifs}) => {

    console.log(gifs)

    return <div className='ListOfGifs'>
        {
        gifs.map(({title, id, url, ...restOfGif}) =>{
            return <Gif
                id={id}
                key={id}
                title={title}
                url={url}
                extraInfo={restOfGif}
            />
            }
        )
        }
    </div>
}

export default ListOfGifs