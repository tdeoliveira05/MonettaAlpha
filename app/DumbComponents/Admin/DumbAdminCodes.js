import React from 'react'
import {withRouter} from 'react-router-dom'

const DumbAdminCodes = ({
  usedCodeList,
  availableCodeList,
  addCodes,
  removeCode,
  onChange,
  tempCodes,
  errorText
}) => (
  <div className = 'AdminCodesWrapper'>
    <div className = 'AdminCodesContent'>
      <h3 style = {{color: 'red'}}> {errorText} </h3>
      <div className = 'AdminCodesInputDiv'>
        <h1> Codes </h1>
        <h3> Add one or several codes: </h3>
        <textarea name = 'tempCodes' value = {tempCodes} onChange = {onChange}></textarea>
        <p> For multiple entries, separate codes with a comma (',') </p>
        <button style = {{height: '40px'}} onClick = {addCodes}> Add </button>
      </div>
      <div className = 'AdminCodesList'>
        <div className = 'AdminCodesListDiv'>
        <h2> Used codes </h2>
        {usedCodeList.map((codeItem, codeIndex) => {
          return (
            <div className = 'UsedCodePaper'>
              <h3> {codeItem.code} </h3>
              <p> {codeItem.username} </p>
            </div>
          )
        })}
        </div>
        <div className = 'AdminCodesListDiv'>
        <h2> Available Codes </h2>
        {availableCodeList.map((codeItem, codeIndex) => {
          return (
            <div>
              <div className = 'Divider'></div>
              <div className = 'AvailableCodePaper'>
                <h3> {codeItem.code} </h3>
                <button onClick = {() => removeCode(codeItem._id)}> Remove </button>
              </div>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  </div>
);


// To implement prop-types:
/*

import React        from 'react';
import PropTypes    from 'prop-types';

const DumbAdminCodes = (props) => {

  let propName = props.propName;

  return (
    <div>

    </div>
  );
};

DumbAdminCodes.propTypes = {
  propName:     PropTypes.type.isRequired,
};

*/

export default withRouter(DumbAdminCodes)
