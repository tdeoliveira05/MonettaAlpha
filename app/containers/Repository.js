import React from 'react'
import _, { clone,merge } from 'lodash'
import axios from 'axios'
import {List, ListItem} from 'material-ui/List'

import FileDisplayComponent from '../components/FileDisplayComponent.js'
import PrintingComponent from '../components/PrintingComponent.js'
import RepositoryComponent from '../components/RepositoryComponent.js'

export default class Repository extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: this.props.username,
			search: '',
      searchType: 'title',
      results: [],
      progress: '',
      meetingRes: null,
      minDate: null,
      maxDate: null,
      start: false,
			stop: false
		}

    this.toPDF = this.toPDF.bind(this)
    this.loadAll = this.loadAll.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.onTabChange = this.onTabChange.bind(this)
    this.selectResult = this.selectResult.bind(this)
    this.minDateChange = this.minDateChange.bind(this)
    this.maxDateChange = this.maxDateChange.bind(this)
    this.deleteMeeting = this.deleteMeeting.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.updateRefresh = this.updateRefresh.bind(this)


  }

  updateRefresh() {
    if (this.props.code == 'refresh') {
      this.loadAll();
      this.props.handleRefresh()
    }
  }


  componentDidMount(){
    this.loadAll()
    this.state = this.state || {};
    this.state.isPrinting = false;

    // Run a media query through the matchMedia API
    const query = window.matchMedia('print')
    const queryListener = function(m) {
      this.setState({isPrinting: m.matches});
    }.bind(this)

    query.addListener(queryListener);
  }


  toEmail() {
    const self = this
    var data = self.state.meetingRes
    axios.post('/emailMonettaMinutes',{
      title: data.title,
  		type: data.type,
  		location: data.location,
  		date: data.date,
  		members: data.members,
  		decisions: data.decisions,
  		actions: data.actions,
  		minutes: data.minutes,
      recipients: self.state.recipients
    }).then(function(result){
      self.setState({recipientsTemp: '', recipients: [], snackOpen: true})
      self.handleRecipientsAct()
    }).catch(function(err){
      console.log(err)
    })
  }



  toPDF(){
    var content = document.getElementById("printable");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  }
  loadAll(){
    const self = this;
      self.setState({
        progress: 'loading'
      });
  		axios.post('https://monettatech.com/search',
  			{
  				search:'',
          searchType:'title',
          username:this.state.username,
          minDate:0,
          maxDate:2147483647000
  			}
  			)
  			.then(function(res) {
          if(res.data.length==0){
            self.setState({
              progress:'noResult',
              results: [],
              meetingRes:null
            })
          } else{
            self.setState({
              results:res.data.reverse(),
              progress:'edit'
            });
          }
  			})
  			.catch(function(error) {
  				console.log(error)
  			})

  }
  handleChange(e){
    this.setState({
      search: e.target.value
    });
  }
  handleKeyPress(e){
    if(e.key==='Enter'){
      this.search();
    }
  }
  onTabChange(e,value) {
    this.setState({
      searchType: value
    });

  }
  selectResult(rank) {
    this.setState({
      meetingRes:this.state.results[rank]
    });
  }
  minDateChange(e,date) {
    this.setState({
      minDate: date
    })
  }
  maxDateChange(e,date) {
    this.setState({
      maxDate: date
    })
  }
  deleteMeeting() {
    const self = this;
    axios.post('https://monettatech.com/delete',
      {
        id:self.state.meetingRes._id
      }).then(function(res){
        self.setState({
          meetingRes: null
        })
        self.loadAll()
      }).catch(function(err){
        console.log(err)
      })
  }
  handleSearch() {
    const self = this;
    self.setState({
      progress: 'loading',
      meetingRes: null,
      results: []
    });
    var minDate = this.state.minDate ? new Date(this.state.minDate).getTime() : 0;
    var maxDate = this.state.maxDate ? new Date(this.state.maxDate).getTime() : 2147483647000;
  		axios.post('https://monettatech.com/search',
  			{
  				search:self.state.search,
          searchType:this.state.searchType,
          username:self.state.username,
          minDate:minDate,
          maxDate:maxDate
  			}
  			)
  			.then(function(res) {
          if(res.data.length==0){
            self.setState({
              progress:'noResult',
              results:[]
            })
          } else{
            self.setState({
              results:res.data.reverse(),
              progress:'done'
            });
          }
  			})
  			.catch(function(error) {
  				console.log(error)
  			})
  }

  handleRecipientsAct () {
    this.setState({recipientsOpen: !this.state.recipientsOpen})
  }

  itemAdd(){
    var newArray = this.state.recipients
    newArray.unshift(this.state.recipientsTemp)
    this.setState({recipients: newArray, recipientsTemp: ''})
  }

  itemChange(item, index){
    var newArray = this.state.recipients
    newArray[index] = item
    this.setState({recipients: newArray})
  }

  itemDelete(index){
    var newArray = this.state.recipients
    newArray.splice(index,1)
		this.setState({recipients: newArray});
	}

  changeText (e) {
    this.setState({recipientsTemp: e.target.value});
  }

  render(){
    let sidebar = null;
    let container = null;
    let searchTitle = null;
    //Define SIDEBAR CONTENT
    if(this.state.results !== [] && Array.isArray(this.state.results)) {
        sidebar = (
        <List className="meetingList">

          {this.state.results.map((result,index) =>
            <ListItem
              primaryText={result.title}
              secondaryText={(new Date(result.date)).toDateString()}
              onClick={()=>this.selectResult(index)}
              key={index}/>
          )}
        </List>
      )}
    else
      sidebar = (
        <List className="meetingList">
            <ListItem
              primaryText={'No Items Found.'}
              key={Math.random()}
            />
        </List>
      )
    //Define CONTIAINER CONTENT
    var Undefined
    if(this.state.meetingRes != null && this.state.meetingRes != Undefined) {
      container = (
        <div className="displayContainer">
          <FileDisplayComponent
          data={this.state.meetingRes}
          toEmail={() => this.props.prepareEmail(this.state.meetingRes)}
          toPDF={this.toPDF}
          deleteMeeting={this.deleteMeeting}
          />
          <PrintingComponent data={this.state.meetingRes}/>
        </div>
      )}
    else
      {container= (<div className="displayContainer"><h5>Nothing Selected.</h5></div>)}
    //Define search title
    if(this.state.searchType == 'title')
      searchTitle = 'Title Search'
    else
      searchTitle = 'Member Search'

    this.updateRefresh();

    return(
      <div>
        <RepositoryComponent
          onTabChange = {this.onTabChange}
          search = {this.state.search}
          searchTitle = {searchTitle}
          handleChange = {this.handleChange}
          handleSearch = {() => this.handleSearch(this.state.searchType)}
          minDate = {this.state.minDate}
          minDateChange = {this.minDateChange}
          maxDate = {this.state.maxDate}
          maxDateChange = {this.maxDateChange}
          loadAll = {this.loadAll}
          sidebar = {sidebar}
          container = {container}
          />
      </div>
    )
  }
}
