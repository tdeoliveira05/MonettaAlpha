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
