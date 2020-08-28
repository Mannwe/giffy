import { useGifs } from 'hooks/useGifs'
import { useState, useEffect } from 'react'
import getSingleGif from 'services/getSingleGif'

const useSingleGif = ({ id }) => {
    const {gifs} = useGifs()
    const gifFromCache = gifs.find(singleGif => singleGif.id === id)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const [gif, setGif] = useState(gifFromCache)

    useEffect(() => {        
        if(!gif){
            setIsLoading(true)
            console.log(gif)
            getSingleGif({id})
            .then(gif => {
                setIsLoading(false)
                setGif(gif)
            })
            .catch(err => {
                setIsLoading(false)
                setIsError(true)
            })
        }
    }, [gif, id])

    return {gif, isLoading, isError}
}

export default useSingleGif