/* REUSABLE DUMB DIALOG Component

example of a smart component usage of this component:

render () {
  <ReusableDumbDialog
    dialogToggle         = {this.state.dialogToggle}
    dialogToggleFunction = {this.dialogToggleFunction}
    dialogComponent      = {dialogComponent}
    />
}

dialogToggle is a simple boolean {true || false} stored in the state of the parent component
dialogToggleFunction is a simple function in the parent component that alternates the dialogToggle boolean
dialogComponent is the child component to be rendered inside the pop up dialog componenet

*/

import React from 'react'
import Dialog from 'material-ui/Dialog'


const ReusableDumbDialog = ({dialogToggle, dialogToggleFunction, dialogComponent}) => (
  <div>
    <Dialog style = {{width: '100%'}} autoScrollBodyContent={true} modal={false} open={dialogToggle} onRequestClose={() => dialogToggleFunction()}>
      {dialogComponent}
    </Dialog>
  </div>
)

export default ReusableDumbDialog
