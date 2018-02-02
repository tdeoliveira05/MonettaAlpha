import React from 'react'
import {withRouter, NavLink} from 'react-router-dom'

import logoWhite from '../../assets/images/MonettaLogo2.png'
import settingsIcon from '../../assets/images/settingsIcon.svg'

// Retrieves the view width and view height
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
//console.log(w + 'px width')


// Set styles for active/Inactive features
const inactiveStyle = {
  textDecoration: 'none',
  color: 'rgb(140,140,140)',
  fontWeight: 'bold',
  backgroundColor: 'Transparent',
  height: '100%',
  width: '110px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: '5px',
  paddingRight: '5px'
}

const activeStyle = {
  textDecoration: 'none',
  color: 'rgb(110,110,110)',
  height: '100%',
  width: '110px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgb(232,232,232)',
  paddingLeft: '5px',
  paddingRight: '5px'
}

// mobile media
if (w < 760) {
  activeStyle.minWidth = '300px'
  activeStyle.width = '100%'
  activeStyle.margin = '5px 0px 5px 0px'
  activeStyle.height = '25px'
  activeStyle.paddingLeft = '0'
  activeStyle.paddingRight = '0'

  inactiveStyle.minWidth = '300px'
  inactiveStyle.width = '100%'
  inactiveStyle.margin = '5px 0px 5px 0px'
  inactiveStyle.height = '25px'
  inactiveStyle.paddingLeft = '0'
  inactiveStyle.paddingRight = '0'
}


// Setting Profile div style
const profileStyle = {
  textDecoration: 'none',
  color: 'rgb(110,110,110)',
  fontWeight: 'bold',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgb(232,232,232)',
}

// Mobile media
if (w < 760) {
  profileStyle.minWidth = '300px'
  profileStyle.width = '100%'
  profileStyle.margin = '5px 0px 5px 0px'
  profileStyle.height = '25px'
}


// Active + inactive styles for help button
const inactiveHelpStyle = {
  textDecoration: 'none',
  color: 'rgb(140,140,140)',
  fontWeight: 'bold',
  backgroundColor: 'Transparent',
  height: '100%',
  width: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '5px',
  marginRight: '5px',
  paddingLeft: '5px',
  paddingRight: '5px'
}

const activeHelpStyle = {
  textDecoration: 'none',
  color: 'rgb(110,110,110)',
  height: '100%',
  width: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgb(232,232,232)',
  marginLeft: '5px',
  marginRight: '5px',
  paddingLeft: '5px',
  paddingRight: '5px'
}

if (w < 760) {
  activeHelpStyle.minWidth = '300px'
  activeHelpStyle.width = '100%'
  activeHelpStyle.margin = '5px 0px 5px 0px'
  activeHelpStyle.height = '25px'
  activeHelpStyle.paddingLeft = '0'
  activeHelpStyle.paddingRight = '0'

  inactiveHelpStyle.minWidth = '300px'
  inactiveHelpStyle.width = '100%'
  inactiveHelpStyle.margin = '5px 0px 5px 0px'
  inactiveHelpStyle.height = '25px'
  inactiveHelpStyle.paddingLeft = '0'
  inactiveHelpStyle.paddingRight = '0'
}


//Dumb component render
const DumbNavigationBar = ({}) => (
  <div className = 'NavBarWrapper'>
    <div className = 'NavBarLeftDiv'>
      <div className ='NavBarLeftLogo'>
        <img src = {logoWhite} height = {30} width = {30} style = {{padding: '10px'}}/>
      </div>
      <div className = 'NavBarLeftButtons'>
        <NavLink exact to = '/' activeStyle = {activeStyle} style = {inactiveStyle}>
          Dashboard
        </NavLink>
        <NavLink to = '/meeting' activeStyle = {activeStyle} style = {inactiveStyle}>
          Team Meeting
        </NavLink>
        <NavLink to = '/storage' activeStyle = {activeStyle} style = {inactiveStyle}>
          Document Storage
        </NavLink>
        <NavLink to = '/data' activeStyle = {activeStyle} style = {inactiveStyle}>
          Productivity Data
        </NavLink>
        <NavLink to = '/yourmonetta' activeStyle = {activeStyle} style = {inactiveStyle}>
          Your Monetta
        </NavLink>
      </div>
    </div>
    <div className = 'NavBarRightDiv'>
      <div className = 'NavBarRightButtons'>
        <div style = {profileStyle}>
          {localStorage.fullName}
        </div>

        <NavLink to = '/help' activeStyle = {activeHelpStyle} style = {inactiveHelpStyle}>
          Help
        </NavLink>
      </div>
      <NavLink to = '/settings'>
        <img src = {settingsIcon} height = {20} style = {{padding: '10px'}}/>
      </NavLink>
    </div>
  </div>
)

export default withRouter(DumbNavigationBar)
