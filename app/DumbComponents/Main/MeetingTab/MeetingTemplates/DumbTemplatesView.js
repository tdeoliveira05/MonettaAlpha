import React from 'react'
import {withRouter} from 'react-router-dom'

const DumbTemplateView = ({
  templateList,
  history,
  templateView,
  activeTemplateIndex
}) => (
  <div className = 'MeetingTemplatesWrapper'>
    <div className = 'MeetingTemplatesContent'>
      <div className = 'MeetingTemplatesContentLeft'>
        <h2 style = {{margin: '0'}}> Custom Meeting Templates </h2>
        <div className = 'MeetingTemplateContentCards' style = {{height: '40px', boxSizing: 'border-box', margin: '20px 0px 20px 0px'}}>
          <button
            style = {{backgroundColor: '#ffac4d', color: 'white', width: '100%', borderRadius: '10px', fontWeight: 'bold', height: '100%'}}
            onClick = {() => history.push('/meeting/templates/create')}
          >
            Create a new template
          </button>
        </div>
        <div className = 'MeetingTemplatesContentCardList'>
          {templateList.map((templateItem, templateIndex) => {
              // highlight the activated template
              var activeStyle = {}
              if (templateIndex === activeTemplateIndex) activeStyle = {backgroundColor: '#6699ff', color: 'white'}

              return (
                <div className = 'MeetingTemplateContentCards'>
                  <button onClick = {() => history.push('/meeting/templates/' + templateItem.templateId)} style = {activeStyle}>
                    {templateItem.title}
                  </button>
                </div>
              )
          })}
        </div>
      </div>
      <div className = 'MeetingTemplatesContentRight'>
        {templateView}
      </div>
    </div>
  </div>
);


// To implement prop-types:
/*

import React        from 'react';
import PropTypes    from 'prop-types';

const DumbTemplateView = (props) => {

  let propName = props.propName;

  return (
    <div>

    </div>
  );
};

DumbTemplateView.propTypes = {
  propName:     PropTypes.type.isRequired,
};

*/

export default withRouter(DumbTemplateView)
