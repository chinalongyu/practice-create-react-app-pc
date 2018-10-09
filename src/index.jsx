import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from 'reducers/index'
import App from 'components/App'

// HtmlWebpackPlugin 插件不会创建 元素
const rootEl = document.createElement('div')
rootEl.id = 'root'
document.body.appendChild(rootEl)

let store = createStore(todoApp)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)