import React from 'react'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'

const RepositoryComponent = ({
  onTabChange,
  searchTitle,
  search,
  handleChange,
  handleSearch,
  minDate,
  minDateChange,
  maxDate,
  maxDateChange,
  loadAll,
  sidebar,
  container
}) => (
  <div>
    <div className="Repository">
      <div className="SearchBar">
        <div className="TitleMemberRadio">
          <RadioButtonGroup name="searchType" defaultSelected="title" onChange={onTabChange}>
            <RadioButton
              value="title"
              label="Title"
            />
            <RadioButton
              value="member"
              label="Member"
            />
          </RadioButtonGroup>
        </div>

        <div className="SearchParam">
          <TextField
            style={{margin: '0px 30px'}}
            floatingLabelText={searchTitle}
            name="titleSearch"
            underlineShow={true}
            fullWidth={true}
            value = {search}
            onChange = {handleChange}
            onKeyPress={(e) => {
              if(e.key==='Enter'){
                handleSearch
            }}}/>
            <div className="SearchDate">
              <DatePicker
                textFieldStyle={{width: '85px', margin: '0px 30px'}}
                hintText="After"
                value={minDate}
                onChange={minDateChange}
              />

              <p>to</p>

              <DatePicker
                textFieldStyle={{width: '85px', margin: '0px 30px'}}
                hintText="Before"
                value={maxDate}
                onChange={maxDateChange}
              />
            </div>
          </div>

          <div className="ActionButtons">
            <RaisedButton
              label="Search"
              primary={true}
              onClick={handleSearch}
            />

            <RaisedButton
              label="Refresh"
              secondary={true}
              onClick={loadAll}
            />

          </div>
      </div>


      <div className="ContentDisplay">
        {sidebar}
        {container}
      </div>
    </div>
  </div>
)

export default RepositoryComponent;
