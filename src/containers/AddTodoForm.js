import { connect } from 'react-redux'
import { addTodoItem } from 'actions'
import AddTodo from 'components/AddTodo'

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: value => {
            dispatch(addTodoItem(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)