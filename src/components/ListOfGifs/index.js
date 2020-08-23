  
import React from 'react'
import Gif from '../Gif'
import './styles.css'

const ListOfGifs = ({gifs}) => {

    return <div className='ListOfGifs'>
        {
        gifs.map(gif =>
            <Gif
                key={gif.id}
                gif={gif}
            />
        )
        }
    </div>
}

export default ListOfGifs