import React from 'react'
import logoWhite from '../../assets/images/MonettaLogo2.png'
import settingsIcon from '../../assets/images/settingsIcon.svg'
import {NavLink} from 'react-router-dom'

const inactiveStyle = {
  textDecoration: 'none',
  color: 'rgb(140,140,140)',
  fontWeight: 'bold',
  backgroundColor: 'Transparent',
  height: '100%',
  width: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: '3px'
}

const activeStyle = {
  textDecoration: 'none',
  color: 'rgb(110,110,110)',
  fontWeight: 'bold',
  height: '100%',
  width: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgb(242,242,242)',
  borderBottom: '2px solid #ffac4d',
  paddingBottom: '0'
}

const profileStyle = {
  textDecoration: 'none',
  color: 'rgb(110,110,110)',
  fontWeight: 'bold',
  height: '100%',
  width: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgb(242,242,242)',
  borderBottom: '2px solid #6699ff'
}

const DumbNavigationBar = ({}) => (
  <div className = 'NavBarWrapper'>
    <div className = 'NavBarLeftDiv'>
      <div className ='NavBarLeftLogo'>
        <img src = {logoWhite} height = {30} width = {30}/>
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
      </div>
    </div>
    <div className = 'NavBarRightDiv'>
      <div className = 'NavBarRightButtons'>
        <div style = {profileStyle}>
          {localStorage.fullName}
        </div>

        <NavLink to = '/help' activeStyle = {activeStyle} style = {inactiveStyle}>
          Help
        </NavLink>
      </div>
      <NavLink to = '/settings'>
        <img src = {settingsIcon} height = {20} style = {{padding: '10px'}}/>
      </NavLink>
    </div>
  </div>
)

export default DumbNavigationBar
