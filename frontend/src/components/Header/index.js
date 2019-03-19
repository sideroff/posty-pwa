import React from 'react'
import { connect } from 'react-redux'

import './Header.css'

class Header extends React.Component {

  render() {
    return (
      <header className={`header ${this.props.networkStatus}`} >
        <div>
          posty-pwa
      </div>

        <div>
          App is currently {this.props.networkStatus}.
        </div>
      </ header >
    )
  }
}

export default connect(state => ({
  networkStatus: state.flags.networkStatus
}))(Header)