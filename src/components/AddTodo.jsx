import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class AddTodo extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }
    onSubmit = (e) => {
        e.preventDefault()
        if (!this.input.value.trim()) {
            return
        }
        this.props.onSubmit(this.input.value)
        this.input.value = ''
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input ref={node => {
                        this.input = node
                    }} />
                    <button type="submit">
                        Add Todo
                    </button>
                </form>
            </div>
        )
    }
}