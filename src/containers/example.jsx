import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from 'actions/example'

class Example extends Component {
    constructor(props) {
        super(props);
    }

    showModal(e) {
        e.preventDefault(); // 修复 Android 上点击穿透 this.props.actions.changeTitle("React世界欢迎您") 
    }

    render() {
        return (
            <div>
                <input
                    readOnly
                    onClick={this.showModal.bind(this)}
                    value={this.props.example.title}
                    style={{ width: '100%', height: '50px', border: 0, background: "#CCCCCC" }} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    // return { example: state.example.toJS() }
    return { example: state.example }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Example)
