import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
// import PropTypes    from 'prop-types';

import SmartAdminUsers from './SmartAdmin/SmartAdminUsers.js'
import SmartAdminCodes from './SmartAdmin/SmartAdminCodes.js'
import SmartAdminFeatures from './SmartAdmin/SmartAdminFeatures.js'
import SmartAdminData from './SmartAdmin/SmartAdminData.js'

class SmartAdmin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      panelDisplay: 'users',
      adminDocs: {},
      search: ''
    }

    this.changePanelDisplay = this.changePanelDisplay.bind(this)
    this.getAllAdminDocs    = this.getAllAdminDocs.bind(this)
    this.createPanelDisplayComponent = this.createPanelDisplayComponent.bind(this)
  }

  componentWillMount () {
    this.getAllAdminDocs()
  }

  changePanelDisplay (target) {
    this.setState({panelDisplay: target})
  }

  getAllAdminDocs () {

    axios.post('http://localhost:8080/secure/admin/getDocs')
    .then((docObject) => {
      /*
        docObject.body = {
          userDocs: [...],
          featureDocs: [...],
          meetingDocs: [...]
        }
      */
      this.setState({adminDocs: docObject.data})

    })
    .catch((error) => {
      console.log(error)
    })

  }

  onChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  createPanelDisplayComponent () {
    switch (this.state.panelDisplay) {
      case 'users':
        return (
          <SmartAdminUsers
            adminDocs = {this.state.adminDocs}
            search = {this.state.search}
            onChange = {this.onChange}
          />
        )
        break

      case 'meetings':
        return (
          <SmartAdminMeetings
            adminDocs = {this.state.adminDocs}
          />
        )
        break

      case 'features':
        return (
          <SmartAdminFeatures
            adminDocs = {this.state.adminDocs}
          />
        )
        break

      case 'data':
        return (
          <SmartAdminData
            adminDocs = {this.state.adminDocs}
          />
        )
        break

      case 'codes':
        return (
          <SmartAdminCodes
            adminDocs = {this.state.adminDocs}
            getAllAdminDocs = {this.getAllAdminDocs}
          />
        )
        break

    }
  }


  render () {
    //---------------------------CONDITIONS-------------------------------------

    var panelDisplayComponent = this.createPanelDisplayComponent()


    // Highlight the active button

    var activeStyle = {
      users: {},
      meetings: {},
      features: {},
      data: {},
      codes: {}
    }

    activeStyle[this.state.panelDisplay] = {
      boxShadow: '0px 1px 20px rgba(0,0,0,0.1)',
      borderLeft: '100px solid rgb(220, 220, 220)',
      borderRight: '100px solid rgb(220, 220, 220)',
      fontSize: '1.4em',
      color: 'black'

    }

    //---------------------------RETURN-----------------------------------------
    return(
      <div>
        <div className = 'AdminPanelNavBar'>
          <button onClick = {() => this.changePanelDisplay('users')} style = {activeStyle.users}> Users </button>
          <button onClick = {() => this.changePanelDisplay('codes')} style = {activeStyle.codes}> Codes </button>
          <button onClick = {() => this.changePanelDisplay('features')} style = {activeStyle.features}> Features </button>
          <button onClick = {() => this.changePanelDisplay('data')} style = {activeStyle.data}> Data </button>
        </div>
        {panelDisplayComponent}
      </div>
    )
  }
}

export default withRouter(SmartAdmin)
//-------------------------------EXPECTED PROP TYPES----------------------------
// SmartAdmin.propTypes = {
//   propName: PropTypes.type,
  //Example: currentFolder: PropTypes.string.isRequired,
// };
