import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import MicrophoneImage from '../assets/images/microphone.png'
import BottomDivider from '../assets/images/dividerbottom.svg'
import TopDivider from '../assets/images/dividertop.svg'
import Paper from 'material-ui/Paper'

import RepoFeature from '../assets/images/RepoFeature.png'
import ReportFeature from '../assets/images/ReportFeature.png'
import IntegrationsFeature from '../assets/images/IntegrationsFeature.png'

import block2contentimage1 from '../assets/images/AIunderstanding.png'
import block2contentimage2 from '../assets/images/AIexample.png'

import AlphaUsers1 from '../assets/images/alphausers1.png'
import AlphaUsers2 from '../assets/images/alphausers2.png'
import AlphaUsers3 from '../assets/images/alphausers3.png'
import AlphaUsers4 from '../assets/images/alphausers4.png' 





const HomeComponent = ({handleAlphaActivation, alphaActivation, changeTempUsername, tempUsername, formUsername, handleLogSigActivate}) => (
  <div className="LandingPage">

    <div className='block1wrapper'>
      <div className='block1'>
        <div className='block1content'>

          <div className='block1top'>
            <h1> Take your team meetings a step further with the power of voice recognition technology. </h1>
            <p> Monetta helps your team keep track of everything happening in your daily meetings in the easiest way possible, by letting you use your voice to take notes. </p>
            <div className='block1input'>
              <input type='text' value={tempUsername} onChange={changeTempUsername} placeholder='Enter your email here' className='block1inputtxt'/>
              <input type='submit' value='Get started for free' onClick={() => handleLogSigActivate('alphaEmail')} className='block1inputsubmit' />
            </div>
          </div>

          <div className='block1microphone' >
            <img src={MicrophoneImage}  height='100%' />
          </div>


        </div>
      </div>

    </div>
    <img src={BottomDivider} style={{width: '100%', display: 'flex'}}/>

    <div className='block2wrapper'>
      <div className='block2'>
        <div className='block2content'>
          <h1>Use Monetta as your team{"\'"}s own assistant. Tell Monetta what information you want recorded and it will do the rest!</h1>
          <p> Monetta{"\'"}s brain is made up of complex AI algorithms that work together to break down what was said to organize the extracted content </p>
          <div className='block2contentimage1'>
            <img src={block2contentimage1} />
          </div>
          <div className='block2contentimage2'>
            <img src={block2contentimage2} />
            <div className='block2contentimage2txt'>
              <h1> Monetta automatically creates your meeting minutes so you don{"\'"}t have to! </h1>
              <p> Using the extracted content of your speech, Monetta can create meeting minutes and automatically send them out by email or store in our Monetta{"\'"} secure document storage. </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img src={TopDivider} style={{width: '100%', display: 'flex'}} />

    <div className='block3wrapper'>
      <div className='block3'>
        <h1> Monetta also distributes the content to wherever it needs to go </h1>
        <div className='block3content'>


          <Paper zDepth={2} rounded={true} style={{borderRadius: '10px'}} className='block3paper'>
            <div className='block3paperdiv'>
              <h2> Searchable Team Storage </h2>
              <img src={RepoFeature} />
            </div>
            <p> Monetta stores all your meeting minutes your team storage, giving you and your team powerful search capabilities to find what you are looking for.</p>
          </Paper>

          <Paper zDepth={2} style={{borderRadius: '10px'}}  className='block3paper'>
            <div className='block3paperdiv'>
              <h2> Automatic Reporting </h2>
              <img src={ReportFeature} />
            </div>
            <p>Monetta can automatically send out monthly or weekly reports to other employees to stay up-to-date without having to attend the meetings themselves.</p>
            </Paper>

          <Paper zDepth={2} style={{borderRadius: '10px'}}  className='block3paper'>
            <div className='block3paperdiv'>
              <h2> Software Integrations </h2>
              <img src={IntegrationsFeature}/>
            </div>
            <p>Monetta updates the other software you use with the action items given to you, schedules events you agreed to and organizes other important content.</p>
          </Paper>

        </div>
      </div>
    </div>
    <img src={BottomDivider} style={{width: '100%', display: 'flex'}}/>

    <div className='block4wrapper'>
      <div className='block4'>
        <div className='block4content'>
          <h1> Our Alpha Users know that this could change it all </h1>
          <div className='block4images'>
            <img src={AlphaUsers1} />
            <img src={AlphaUsers2} />
            <img src={AlphaUsers3} />
            <img src={AlphaUsers4} />
          </div>
        </div>
      </div>
    </div>
    <img src={TopDivider} style={{width: '100%', display: 'flex'}}/>

    <div className='block5wrapper'>
      <div className='block5'>
        <div className='block5content'>

        <h2> Join the effort and help us design a software perfect for you. </h2>
        <RaisedButton label='Become an Alpha User' primary={true} onClick={() => handleLogSigActivate('alphaEmail')} style={{width: '200px', margin: '10px'}} />


        </div>
      </div>
    </div>

  </div>
)

export default HomeComponent;
