import React, {useState, useEffect, useRef} from 'react'

export const useNearScreen = ({ distance = '100px' } = {}) => {
    const [isNearScreen, setShow] = useState(false)
    const fromRef = useRef()

    useEffect(() => {
        let observer
        const onChange = (entries, observer) => {
            const el = entries[0]
            if(el.isIntersecting){
                setShow(true)
                /* Desconectamos porque una vez está visible el área al que hemos accedido
                   ya no es necesario actualizar el state para hacerla visible */
                observer.disconnect() 
                /* observer.unobserve() También se puede usar, y así se puede reutilizar el observer */
            }
        }
        
        Promise.resolve(
            typeof IntersectionObserver !== 'undefined'
                ? IntersectionObserver
                : import('intersection-observer')
        ).then(() => {
            observer = new IntersectionObserver(onChange, {
                rootMargin: distance
            })

            observer.observe(fromRef.current)
        })

        return () => observer && observer.disconnect()
    })

    return {isNearScreen, fromRef}
}