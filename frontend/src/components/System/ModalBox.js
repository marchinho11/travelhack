import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {DialogContent} from "@material-ui/core";

const styles = (theme) => ({
  layout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});


class ModalBox extends React.PureComponent {
  render() {
    const classes = this.props.classes;
    return (
      <Dialog maxWidth="lg" onClose={() => this.props.closeDialog()} aria-labelledby="customized-dialog-title" open={this.props.show}>
        <DialogContent>
          {this.props.children}
        </DialogContent>
      </Dialog>
    );
  }
}

// @ts-ignore
export default withStyles(styles)(observer(ModalBox));
