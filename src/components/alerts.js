import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class AlertDialog extends React.Component {
  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Welcome to Skeeball"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              There will be bugs! 
              <br/><br/>
              Create a ball with [1].
              <br/>
              Shoot with [Spacebar].
              <br/>
              Change camera with [3].
                <br/>
                Orbit with the mouse.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button> */}
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Start!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;