import React from 'react'

const Printing = ({data}) => (
  <div id='printable' className="printing">
    <div className='printWrapper'>

      <div style={{
        textAlign: 'center',
        marginTop: '10px',
        marginBottom: '0px',
        padding: '0px',
        borderBottom: '2px solid black',
        width: '100%'
      }}>

        <h1 style={{margin: '5px', padding: '0'}}>{data.title}</h1>
      </div>

      <div style={{width: '100%', textAlign: 'center', margin: '0px', padding: '0px'}}>
        <p style={{marginTop: '5px', padding: '0px'}}> {data.type} Summary </p>
      </div>

      <div style={{
        width: '100%',
        textAlign: 'center',
        marginBottom: '10px',
        marginTop: '0px',
        padding: '0px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}>

      <ul style={{padding: '2px', textAlign: 'left'}}>
          <strong>
            <li style ={{listStyle: 'none', marginBottom: '8px'}}> {(new Date(data.date)).toDateString()} </li>
            <li style={{listStyle: 'none'}}> {data.location}</li>
          </strong>
        </ul>

        <ul style={{padding: '2px', textAlign: 'right'}}>
          {data.members.map((member,index) => <li style={{listStyle: 'none'}} key={index}>{member}</li>)}
        </ul>

      </div>

      <div style={{marginTop: '0px', padding: '0px'}}>
        <div >
          <h2>Decisions</h2>
          <ol style={{listStyleType: 'upper-roman'}}>
            {data.decisions.map((item,index) => <li style={{padding: '2px'}} key={index}>{item}</li>)}
          </ol>
        </div>

        <div >
          <h2>Action Items</h2>
          <ol style={{listStyleType: 'number'}}>
            {data.actions.map((item,index) => <li style={{padding: '2px'}} key={index}>{item.phrase}</li>)}
          </ol>
        </div>

        <div style={{marginTop: '100px'}}>
          <h2 style={{width: '100%', textAlign: 'center'}}>General Notes</h2>
          <ol style={{listStyleType: 'square'}}>
            {data.minutes.map((item,index) => <li style={{padding: '2px'}} key={index}>{item}</li>)}
          </ol>
        </div>
      </div>

    </div>
  </div>
)
export default Printing
