// import { EXAMPLE } from '../constants'
import { EXAMPLE } from 'appConstants'

function example(val) {
    return { type: EXAMPLE, payload: { title: val } }
}

export default function changeTitle(val) {
    return (dispatch, getState) => { dispatch(example(val)) }
}
