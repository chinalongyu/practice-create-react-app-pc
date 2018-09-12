/**
 * @name createReducer
 *
 * @author fandand at 2018-09-11
 *
 * @desc reducer定义复用
 *
 */

export default (initialState, actionHandlers) => {
    return (state = initialState, action) => {
        const reduceFn = actionHandlers[action.type]
        if (!reduceFn) {
            return state
        }

        return {
            ...state,
            ...reduceFn(state, action)
        }
    }
}