import React, {useState, useEffect, useRef, useCallback} from 'react'

export const useNearScreen = ({ distance = '100px', externalRef, once = true } = {}) => {
    const [isNearScreen, setShow] = useState(false)
    const fromRef = useRef()

    useEffect(() => {
        let observer

        const element = externalRef ? externalRef.current : fromRef.current
        const onChange = (entries, observer) => {
            const el = entries[0]
            if(el.isIntersecting){
                setShow(true)
                /* Desconectamos porque una vez está visible el área al que hemos accedido
                   ya no es necesario actualizar el state para hacerla visible */
                /* observer.unobserve() También se puede usar, y así se puede reutilizar el observer */
                once && observer.disconnect() 
            }else{
                !once && setShow(false)
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

            if(element) observer.observe(element)
        })

        return () => observer && observer.disconnect()
    })

    return {isNearScreen, fromRef}
}