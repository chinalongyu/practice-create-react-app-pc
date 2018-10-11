import React from 'react'
import Footer from './Footer'
import AddTodoForm from 'containers/AddTodoForm'
import VisibleTodoList from 'containers/VisibleTodoList'

const App = () => (
    <div>
        <AddTodoForm />
        <VisibleTodoList />
        <Footer />
    </div>
)

export default App