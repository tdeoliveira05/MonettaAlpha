import React from 'react'

import FooterComponent from '../components/FooterComponent.js'


export default class Footer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      act: false
    }

    this.handlePrivacyTerms=this.handlePrivacyTerms.bind(this)
    this.handleActivation = this.handleActivation.bind(this)
  }


  handlePrivacyTerms () {
    this.props.handlePageChange('PrivacyTerms');
  }

  handleActivation () {
    if (!this.state.act) {
    this.setState({act: true});
    } else {
    this.setState({act: false});
    }
  }
  render () {
    return (
      <div>
        <FooterComponent handlePrivacyTerms={this.handlePrivacyTerms} handleActivation={this.handleActivation} act={this.state.act} />
      </div>
    )
  }
}
