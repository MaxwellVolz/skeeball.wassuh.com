import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '../materialComponents/CloseIcon';


const styles = {
  close: {
    width: "24px",
    height: "24px"
  },
};


export default class ConsecutiveSnackbars extends React.Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    open: false,
    messageInfo: {},
  };

  queue = [];

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  messageFromAbove(message) { 

    this.setState({ open: false });

    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    this.processQueue();
    
    // this.setState({
    //   messageInfo: {
    //     message: message,
    //     key: 0
    //   },
    //   open: true,
    // });


  }

  handleClick = message => () => {

    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { classes } = this.props;
    const { message, key } = this.state.messageInfo;
    return (
      <div>
        {/* <Button onClick={this.handleClick('message a')}>Show message A</Button>
        <Button onClick={this.handleClick('message b')}>Show message B</Button> */}
        <Snackbar
          key={key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              // UNDO
            // </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className="closeIcon"
              style={styles.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}
