import React from 'react'
import axios from 'axios'
import WatsonSpeech from 'watson-speech'
import Snackbar from 'material-ui/Snackbar'

import MeetingInfoComponent from '../components/MeetingInfoComponent.js'
import DashboardComponent from '../components/DashboardComponent.js'
import FileReviewComponent from '../components/FileReviewComponent.js'
import PrintingComponent from '../components/PrintingComponent.js'

export default class Meeting extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			start: false,
			stop: false,
			title: "",
			type: "",
			date: new Date(),
			location:"",
			members: [
				],
      lists: [{
        listName: 'Minutes',
        notes: []
      },
      {
        listName: 'Actions',
        notes: []
      },
      {
        listName: 'Decisions',
        notes: []
      }],
			minutes: [

			],
			actions: [],
			decisions: [],
      pane: 'Info',
      username: this.props.username,
      saved:false,
      transcript:'',
      isRecording:false,
      token:'',
      help: false,
      text: {
        decisions: '',
        actions: '',
        minutes: ''
      },
      startTime:0
		}

    this.changePane = this.changePane.bind(this)
    this.onChange = this.onChange.bind(this)
    this.save = this.save.bind(this)
    this.toPDF = this.toPDF.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.newMeeting = this.newMeeting.bind(this)
    this.itemAdd = this.itemAdd.bind(this)
    this.itemChange = this.itemChange.bind(this)
    this.itemDelete = this.itemDelete.bind(this)
    this.stream = this.stream.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
		this.handleKeyUp = this.handleKeyUp.bind(this)
    this.helpOpen = this.helpOpen.bind(this)
    this.helpClose = this.helpClose.bind(this)
    this.changeText = this.changeText.bind(this)
    this.enterText = this.enterText.bind(this)
	}
  componentDidMount() {
    	window.addEventListener("keydown", this.handleKeyDown);
    	window.addEventListener("keyup", this.handleKeyUp);
      const self = this;
      axios.get('http://localhost:3000/token')
  		.then(function (token) {
        self.setState({
          token:token.data
        })
      })
      .catch(function(error) {
        console.log(error);
      });
	}
  componentWillUnmount() {
	    window.removeEventListener("keydown", this.handleKeyDown);
	    window.removeEventListener("keyup", this.handleKeyUp);
	}
  handleKeyDown(event){
    if(event.key === 'Alt' && !this.state.isRecording && this.state.pane == 'Dashboard'){
      event.preventDefault();
      this.stream()
      this.setState({isRecording: true});
    }
  }
  handleKeyUp(event){
    if(event.key == 'Alt' && this.state.isRecording && this.state.pane == 'Dashboard'){
      event.preventDefault();
      this.setState({isRecording: false});
    }
  }

  onChange(event, newValue, chips){
    if(newValue === null){
      this.setState({
        members: chips
      })
    }
    else if(typeof(newValue)==='object'){
      this.setState({
        date: newValue
      })
    }
    else{
        this.setState({
          [event.target.name]: newValue
        })
    }
  }

  changePane (val) {
    this.setState({pane: val})
  }


  save(){
    const self = this;
		axios.post('http://localhost:3000/save',
			{
				title: self.state.title,
				type: self.state.type,
				date: self.state.date.getTime(),
				location:self.state.location,
				groups: self.state.groups,
				chair: self.state.chair,
				members:self.state.members,
				minutes: self.state.minutes,
				actions: self.state.actions,
				decisions: self.state.decisions,
        username: self.state.username
			}
			)
			.then(function(res) {
        self.setState({
          saved:true
        })
			})
			.catch(function(error) {
				console.log(error)
			})

      this.newMeeting()
      this.props.handleDirectToRepo('b', true)
      this.props.handlePromptFb()

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
  handleRequestClose(){
    this.setState({
      saved: false
    });
  }
  newMeeting(){
    this.setState({
			title: "",
			type: "",
			date: new Date(),
			location:"",
			groups: [],
			chair: "",
			members: [],
			minutes: [
			],
			actions: [],
			decisions: [],
      pane: 'Info'
    });
  }
  itemAdd(item, src){
    var newArray
    if(src==='decisions'){
      newArray = this.state.decisions
      newArray.unshift(item)
    }
    else if(src==='minutes'){
      newArray = this.state.minutes
      newArray.unshift(item)
    }
    else if(src==='actions'){
      newArray = this.state.actions
      var newItem = {phrase:item,assigned:'',date:''}
      newArray.unshift(newItem)
    }
    this.setState({[src]: newArray})
    this.setState({text: ''})
  }
  itemChange(item, index, src){
    var newArray
    if(src==='decisions'){
      newArray = this.state.decisions
      newArray[index] = item
    }
    else if(src==='minutes'){
      newArray = this.state.minutes
      newArray[index] = item
    }
    else if(src==='actions'){
      newArray = this.state.actions
      newArray[index].phrase = item
    }
    this.setState({
      [src]: newArray
    })
  }
  itemDelete(item, index, event, src){
    var newArray=[]
    if(src==='decisions')
      newArray = this.state.decisions
    else if(src==='minutes')
      newArray = this.state.minutes
    else if(src==='actions')
      newArray = this.state.actions
    newArray.splice(index,1)
		this.setState({
    	[src]: newArray
    });
	}
   helpOpen(){
     this.setState({help: true});
   }
   helpClose(){
     this.setState({help: false});
   }
  stream(){
    const self=this;
    let startTime = (new Date()).getTime()
		var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
      token: this.state.token,
      objectMode: true, // send objects instead of text
      format: true, // optional - performs basic formatting on the results such as capitals an periods
			keywords: ['Action','Decision','Matt'],
			keywords_threshold: 0.

    });

    stream.on('data', function(data) {

      var text = data.results[0].alternatives[0].transcript;
      self.setState({
        transcript:data.results[0].alternatives[0].transcript
      })
			if(data.results[0].final){
        self.setState({
          transcript:''
        })
				if(text.includes('Action') || text.includes('action')){
          self.itemAdd(text,'actions')
        } else if(text.includes('Decision') || text.includes('decision') || text.includes('decided') || text.includes('Decided') || text.includes('deciding') || text.includes('Decide') || text.includes('decide')) {
          self.itemAdd(text,'decisions')
        } else {
          self.itemAdd(text, 'minutes')
        }
			}

    });

    stream.on('error', function(err) {
        console.log(err);
    });
		window.addEventListener("keyup", stream.stop.bind(stream));
    window.addEventListener("keyup", function dictationTiming(){
      console.log(startTime)
      console.log((new Date()).getTime() - startTime)
      axios.post('http://localhost:3000/timesave',{username:self.state.username, time:(new Date()).getTime() - startTime}).then(function(res){
        console.log('res')
      }).catch(function(err){
        console.log(err)
      })
      window.removeEventListener("keyup",  dictationTiming)
    });


	}

  changeText (e) {
    var newstate = {};
    newstate[e.target.name] = e.target.value;
    this.setState({text: newstate});
  }

  enterText (name) {
    switch (name) {
      case 'minutes':
      return (
        this.itemAdd(this.state.text.minutes, 'minutes'),
        this.setState({text: {minutes: ''}})
      )

      case 'actions':
      return (
        this.itemAdd(this.state.text.actions, 'actions'),
        this.setState({text: {actions: ''}})
      )

      case 'decisions':
      return (
        this.itemAdd(this.state.text.decisions, 'decisions'),
        this.setState({text: {decisions: ''}})
      )
    }
  }


  render() {
      var data={
        title: this.state.title,
        type: this.state.type,
        date: this.state.date,
        location: this.state.location,
        lists: this.state.lists,
        members: this.state.members,
        minutes: this.state.minutes,
        actions: this.state.actions,
        decisions: this.state.decisions
      }
      switch (this.state.pane) {
      case 'Info':
        return (<div>
  					<MeetingInfoComponent
              onChange={this.onChange}
              changePane={this.changePane}
              data={data}
  					/><Snackbar
                  open={this.state.saved}
                  message="Saved to Repository"
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                /></div>);
      case 'Dashboard':
        return (<div>
            <DashboardComponent
              data={data}
              changePane={this.changePane}
              itemAdd={this.itemAdd}
              itemChange={this.itemChange}
              itemDelete={this.itemDelete}
              transcript={this.state.transcript}
              isRecording={this.state.isRecording}
              help={this.state.help}
              helpOpen={this.helpOpen}
              helpClose={this.helpClose}
              text={this.state.text}
              changeText={this.changeText}
              enterText={this.enterText}
            /><Snackbar
                  open={this.state.saved}
                  message="Saved to Repository"
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                /></div>);
      case 'Review':
        return (
          <div>
            <FileReviewComponent
              data={data}
              changePane={this.changePane}
              save={this.save}
              toPDF={this.toPDF}
              toEmail={() => this.props.prepareEmail(data)}
              handleRequestClose={this.handleRequestClose}
              newMeeting={this.newMeeting}
            />
            <PrintingComponent data={data}/>
            <Snackbar
                  open={this.state.saved}
                  message="Saved to My Meetings"
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                />
          </div>);

  	}
  }
}
