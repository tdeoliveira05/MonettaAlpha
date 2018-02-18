import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
// import PropTypes    from 'prop-types';

import DumbAdminCodes from '../../DumbComponents/Admin/DumbAdminCodes.js'

class SmartAdminCodes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tempCodes: '',
      errorText: ''
    }

    this.createCodeList = this.createCodeList.bind(this)
    this.addCodes       = this.addCodes.bind(this)
    this.removeCode     = this.removeCode.bind(this)
    this.onChange       = this.onChange.bind(this)
    this.updateCodeDocs = this.updateCodeDocs.bind(this)
  }

  componentDidMount () {
    const self = this
    var errorClear = setInterval(function () {
      if (self.state.errorText !== '') self.setState({errorText: ''})
    }, 10000)
  }

  createCodeList() {
    var fullCodeList = {
      used: [],
      available: []
    }

    this.props.adminDocs.codeDocs.map((codeItem, codeIndex) => {
      // if code is not currently in use, push it into fullCodeList.available
      if (!codeItem.used) fullCodeList.available.push(codeItem)
    })

    this.props.adminDocs.userDocs.map((userItem, userIndex) => {
      // search through the user documents to find used codes
      fullCodeList.used.push({
        code: userItem.codeUsed,
        username: userItem.username
      })
    })
    return fullCodeList
  }

  onChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  addCodes () {
    // if it is empty dont run the function
    if (this.state.tempCodes === '') {
      this.setState({errorText: 'code cant be empty'})
      return
    } else {
      this.setState({errorText: ''})
    }
    var options = {}
    //parse this.state.tempCodes and remove whitespace and create an array from the commas
    var tempCodes = this.state.tempCodes

    // replace whitespaces with nothing, undo all capitalization, and split the array by comma
    options.add = tempCodes.replace(' ', '').toLowerCase().split(',')


    // map through code documents to make sure there are no duplicates
    var errors = false
    this.props.adminDocs.codeDocs.map ((codeItem) => {
      if (options.add.includes(codeItem.code)) {
          this.setState({errorText: 'One of these codes are already available/used'})
          errors = true
          console.log('error found')
      }
    })

    // if no duplicates were found, submit the new code docs
    if (!errors) {
      this.setState({tempCodes: ''})
      this.updateCodeDocs (options)
    }
  }

  removeCode (codeId) {
    // send this document's id for removal
    console.log('removing ---> ' + codeId)
    this.updateCodeDocs ({remove: codeId})
  }

  updateCodeDocs (options) {
    /*
    options: {
      add: [...codeDoc],
      remove: [...codeId]
    }
    */
    this.setState({errorText: ''})

    const self = this

    socket.emit('/secure/admin/updateCodeDocs', options)

    socket.on('response/secure/admin/updateCodeDocs', function () {
      self.props.getAllAdminDocs()
    })
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    var fullCodeList = this.createCodeList()

    //---------------------------RETURN-----------------------------------------
    return(
      <div style = {{width: '100%', height: '100%'}}>
        <DumbAdminCodes
          usedCodeList      = {fullCodeList.used}
          availableCodeList = {fullCodeList.available}
          addCodes          = {this.addCodes}
          removeCode        = {this.removeCode}
          onChange          = {this.onChange}
          tempCodes         = {this.state.tempCodes}
          errorText         = {this.state.errorText}
        />
      </div>
    )
  }
}

export default withRouter(SmartAdminCodes)
//-------------------------------EXPECTED PROP TYPES----------------------------
// SmartAdminCodes.propTypes = {
//   propName: PropTypes.type,
  //Example: currentFolder: PropTypes.string.isRequired,
// };
