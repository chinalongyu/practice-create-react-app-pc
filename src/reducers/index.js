import { combineReducers } from 'redux'

import { createReducer } from 'utils/createReducer'
import { EXAMPLE } from 'constants'

const example = createReducer(
    { title: "项目构建成功" },
    {
        [EXAMPLE]: (state, action) => {
            return state.merge({ title: action.payload.title })
        }
    })

const rootReducer = combineReducers({ example })

export default rootReducer
