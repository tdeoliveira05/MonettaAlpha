import React from 'react'
import {withRouter} from 'react-router-dom'
// import PropTypes    from 'prop-types';

import DumbAdminUsers from '../../DumbComponents/Admin/DumbAdminUsers.js'

class SmartAdminUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listType: 'normal'
    }

    this.createUserList = this.createUserList.bind(this)
  }

  createUserList () {
    // account for the first mount when the promise of adminDocs hasnt yet been passed down
    if (!this.props.adminDocs.userDocs) return []

    switch (this.state.listType) {
      case 'normal':
        return this.props.adminDocs.userDocs
        break

    }
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    var userList = this.createUserList()
    var meetingList = this.props.adminDocs.meetingDocs
    var userCount = 0
    if (this.props.adminDocs.userDocs) userCount = this.props.adminDocs.userDocs.length

    //---------------------------RETURN-----------------------------------------
    return(
      <div style = {{width: '100%', height: '100%'}}>

        <div className = 'AdminUsersNavBar'>
          <button> All users </button>
          <button> most recent users </button>
          <button> most active users </button>
        </div>

        <DumbAdminUsers
          userList                    = {userList}
          meetingList                 = {meetingList}
          userCount                   = {userCount}
          expandVoteHistory           = {this.expandVoteHistory}
          expandFeedbackHistory       = {this.expandFeedbackHistory}
          expandFeatureRequestHistory = {this.expandFeatureRequestHistory}
        />
      </div>
    )
  }
}

export default withRouter(SmartAdminUsers)
//-------------------------------EXPECTED PROP TYPES----------------------------
// SmartAdminUsers.propTypes = {
//   propName: PropTypes.type,
  //Example: currentFolder: PropTypes.string.isRequired,
// };
