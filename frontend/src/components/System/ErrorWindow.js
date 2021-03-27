import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import ModalBox from '@/components/System/ModalBox';

export default class ErrorWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      className: 'dialog',
      statusCode: 404,
      description: '',
    };
    this.closeDialog = this.closeDialog.bind(this);
    window.onerror = (msg, url, lineNo, columnNo, error) => { this.errorListener(error); };
    window.onunhandledrejection = e => { console.log(false); this.errorListener(e.reason); };
    // window = e => { this.errorListener(e); };
  }

  errorListener(e) {
    this.setState({
      message: e.message,
      openDialog: true,
    });
  }

  closeDialog() {
    this.setState({
      message: '',
      openDialog: false,
    });
  }

  getErrorWindow() {
    return (
      this.state.openDialog && (
        <ModalBox show={this.state.openDialog} closeDialog={this.closeDialog}>
          <div className="errorWindow">
            <div>
              <ErrorIcon color="error" fontSize="large" />
              <label className="logo">Error</label>
            </div>
            <span className="logo">{this.state.message}</span>
            <button onClick={() => this.closeDialog()}>Закрыть</button>
          </div>
        </ModalBox>
      )
    );
  }

  render() {
    return (
      <div className="maxSize">
        {this.getErrorWindow()}
        {this.props.children}
      </div>
    );
  }
}
