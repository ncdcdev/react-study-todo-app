import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export default props => {
  return (
    <div>
      <Dialog
        fullWidth={props.fullWidth}
        maxWidth={props.maxWidth}
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    </div>
  );
};
