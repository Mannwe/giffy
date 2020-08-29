import {useReducer} from 'react'

const ACTIONS = {
    UPDATE_KEYWORD: 'update_keyword',
    UPDATE_RATING: 'update_rating'
}

const ACTIONS_REDUCERS = {
    [ACTIONS.UPDATE_KEYWORD]: (state, action) => ({
        ...state,
        keyword: action.payload,
        times: state.times + 1
    }),
    [ACTIONS.UPDATE_RATING]: (state, action) => ({
        ...state,
        rating: action.payload
    })
}

export const useForm = ({
    initialKeyword = '', 
    initialRating = 'g'
} = {}) => {
    const [state, dispatch] = useReducer(REDUCER, {
        keyword: decodeURIComponent(initialKeyword),
        rating: decodeURIComponent(initialRating),
        times: 0
    })

    console.log(state)

    const {keyword, rating, times} = state

    return{
        keyword,
        rating,
        times,
        updateKeyword: keyword => 
            dispatch({ type: ACTIONS.UPDATE_KEYWORD, payload: keyword }),
        updateRating: rating => 
            dispatch({ type: ACTIONS.UPDATE_RATING, payload: rating })
    }
}

const REDUCER = (state, action) => {
    const actionReducer = ACTIONS_REDUCERS[action.payload]
    return actionReducer ? actionReducer(state, action) : state
}