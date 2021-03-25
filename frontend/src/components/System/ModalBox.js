import React from 'react';
import { Modal } from 'rsuite';

// export default class ModalBox extends React.Component {
//
//   render() {
//     return (
//       <div id="somedialog" className={this.props.openDialog ? 'dialog dialog--open' : 'dialog'}>
//         <div className="dialog__overlay" onClick={() => this.props.closeDialog()} />
//         <div className="dialog__content">
//           {this.props.children}
//         </div>
//       </div>
//     );
//   }
// }

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: false,
      show: false
    };
  }

  render() {
    return (
      <Modal show={this.props.openDialog} onHide={() => this.props.closeDialog()}>
        {this.props.children}
      </Modal>
    );
  }
}
