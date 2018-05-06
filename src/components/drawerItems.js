import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from '../materialComponents/CloseIcon';
import DraftsIcon from '../materialComponents/CloseIcon';
import StarIcon from '../materialComponents/CloseIcon';
import SendIcon from '../materialComponents/CloseIcon';
import MailIcon from '../materialComponents/CloseIcon';
import DeleteIcon from '../materialComponents/CloseIcon';
import ReportIcon from '../materialComponents/CloseIcon';

export const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Move Ball: [W] [A] [S] [D]" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Jump: [SPACE]" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Move Generator: [🡹] [🡻] [🡸] [🡺]" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Generate Balls: [CTRL]" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="Camera: [1] [2]" />
    </ListItem>

    {/* <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem> */}
  </div>
);