import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
// import PropTypes    from 'prop-types';

import DumbAdminFeatures from '../../DumbComponents/Admin/DumbAdminFeatures.js'

class SmartAdminFeatures extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      targetType: 'notApproved',
      tempNotApprovedTitle: '',
      tempNotApprovedDescription: ''
    }

    this.createFeatureList = this.createFeatureList.bind(this)
    this.changeTargetType  = this.changeTargetType.bind(this)
    this.changeFeatureItem = this.changeFeatureItem.bind(this)
    this.onChange          = this.onChange.bind(this)
  }

  createFeatureList (targetType) {
    var featureList = []

    this.props.adminDocs.featureDocs.map((item) => {
      if (item.status === targetType) {
        featureList.push(item)
      }
    })

    return featureList
  }

  changeTargetType (typeVal) {
    this.setState({targetType: typeVal, tempNotApprovedTitle: '', tempNotApprovedDescription: ''})
  }

  onChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  changeFeatureItem (featureId, newStatus) {
    console.log('changeFeatureItem')
    console.log(featureId + ' -----> ' + newStatus)

    // confirm the action
    var confirmMe = confirm('Are you sure you want to move item to: ' + newStatus + ' ?')
    if (confirmMe) {

      this.props.adminDocs.featureDocs.map((featureItem) => {
        //search through the feature document array
        if (featureItem._id === featureId) {
          //use the one that matches the given featureID
          var featureDoc = featureItem

          //update it's status
          featureDoc.status = newStatus

          //If it is being approved, attach the final title and description to it
          if (newStatus === 'approved') {
            // update admin-set title and description
            featureDoc.title = this.state.tempNotApprovedTitle
            featureDoc.description = this.state.tempNotApprovedDescription

            //reset temp fields after using
            this.setState({tempNotApprovedTitle: '', tempNotApprovedDescription: ''})
          }

          //send it to server for replacement
          this.replaceFeatureDocument(featureDoc)
        }
      })
    }
  }

  replaceFeatureDocument (featureDocVal) {
    const self = this

    // send for replacement and upon sucess (.then block) force a refresh of  the state by calling this.setState()
    axios.post('http://localhost:8080/secure/featureDocument/overwrite', {
      featureDoc: featureDocVal
    })
    .then((results) => {
      // if successful, force a component refresh by calling this.setState()
      results.data.success ? this.setState() : alert('ERROR: ' + results.data.errorText)
    })
    .catch((error) => console.log(error))
  }





  render () {
    //---------------------------CONDITIONS-------------------------------------

    var featureList = this.createFeatureList(this.state.targetType)

    //---------------------------RETURN-----------------------------------------
    return(
      <div>
        <div className = 'AdminFeaturesNavBar'>
          <button onClick = {() => this.changeTargetType('notApproved')}> Not Approved </button>
          <button onClick = {() => this.changeTargetType('approved')}> Approved </button>
          <button onClick = {() => this.changeTargetType('removed')}> Removed </button>
          <button onClick = {() => this.changeTargetType('finished')}> Finished </button>
        </div>
        <DumbAdminFeatures
          featureList                = {featureList}
          targetType                 = {this.state.targetType}
          tempNotApprovedTitle       = {this.state.tempNotApprovedTitle}
          tempNotApprovedDescription = {this.state.tempNotApprovedDescription}
          changeFeatureItem          = {this.changeFeatureItem}
          onChange                   = {this.onChange}
        />
      </div>
    )
  }
}

export default withRouter(SmartAdminFeatures)
//-------------------------------EXPECTED PROP TYPES----------------------------
// SmartAdminFeatures.propTypes = {
//   propName: PropTypes.type,
  //Example: currentFolder: PropTypes.string.isRequired,
// };
