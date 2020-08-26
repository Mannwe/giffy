import React, { useRef, useEffect, useCallback } from 'react'

import Spinner from 'components/Spinner'
import ListOfGifs from 'components/ListOfGifs'
import { useGifs } from 'hooks/useGifs'
import { useNearScreen } from 'hooks/useNearScreen'
import debounce from 'just-debounce-it'

const SearchResults = ({params}) => {

    const {keyword} = params
    const {loading, gifs, setPage} = useGifs({keyword})
    const externalRef = useRef()
    //const { isNearScreen } = useNearScreen({externalRef: loading ? null : externalRef })
    const { isNearScreen } = useNearScreen({
        externalRef: loading ? null : externalRef,
        once: false
    })
    //const handleNextPage = () => setPage(prevPage => prevPage + 1)
    //const handleNextPage = () => console.log('next page')

    const debounceHandleNextPage = useCallback(debounce(
        () => setPage(prevPage => prevPage + 1), 200
    ), [])

    useEffect(() => {
        console.log(isNearScreen)
        if(isNearScreen) debounceHandleNextPage()
    }, [isNearScreen, debounceHandleNextPage])

    return <>
        {loading
            ? <Spinner />
            : <>
                <h3 className='App-title'>{decodeURI(keyword)}</h3>
                <ListOfGifs gifs={gifs} />
                <div id='visor' ref={externalRef}></div>
            </>
        }
        <br/>
    </>
}

export default SearchResults