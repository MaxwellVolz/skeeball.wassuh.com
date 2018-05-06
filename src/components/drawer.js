import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './drawerItems';


const styles = {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  };
  
export default class RightDrawer extends React.Component {
    state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
    };
  
    toggleDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };
  
    render() {
      const { classes } = this.props;

      const sideList = (
        <div className="listClass">
          <List>{mailFolderListItems}</List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
        </div>
      );

      return (
        <div>
          <Button onClick={this.toggleDrawer('right', true)} style={{marginTop: '10px',color:'white'}}>Controls</Button>

          <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

