import {renderHook} from '@testing-library/react-hooks'
import {useForm} from './hook'
import { act } from 'react-dom/test-utils'

const setup = params => renderHook(() => useForm(params))

test('should change keyword', () => {
     const {result} = setup()
     act(() => {
        result.current.updateKeyword('batman')
     })
     
     expect(result.current.keyword).toBe('batman')
})

test('should use initial values', () => {
    const {result} = setup({
        initialKeyword: 'matrix'
     })

     expect(result.current.initialKeyword).toBe('matrix')
})

test('should update correctly times when used twice', () => {
    const {result} = setup({
        initialKeyword: 'matrix'
     })

     act(() => result.current.updateKeyword('b'))
     act(() => result.current.updateKeyword('ba'))  

     expect(result.current.keyword).toBe('ba')
     expect(result.current.times).toBe(2)
})