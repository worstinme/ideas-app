import React, { Component } from 'react'
import CreateIdea from './containers/CreateIdea'
import IdeaList from './components/IdeaList'

import './style/main.css'
import Nav from './components/Nav'
import FooterNav from './components/FooterNav'
import Pagination from './components/Pagination'

class App extends Component {
  render () {
    return (
      <div>
        <div className="container">
          <h1>База идей</h1>
          <Nav/>
          <div className="idea-block">
            <CreateIdea/>
            <IdeaList/>
          </div>
          <Pagination/>

        </div>
        <FooterNav/>
      </div>
    )
  }
}

export default App
