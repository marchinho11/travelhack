import React from 'react';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import logo from '@icons/favicon.png';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/services/common/constDictionary';
import { Redirect, withRouter } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import {Nav, Navbar, NavDropdown, FormControl, Button, Form} from "react-bootstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.requestService = this.props.services.requestService;
    this.networkService = this.props.services.networkService;
  }

  componentDidMount() {
  }

  render() {

    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <img src={"https://www.tui.ru/images-new/svg/tui-logo.svg"} alt="logo"/>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav" style={{transform: "translate(0, 8px)"}}>
            <Nav className="mr-auto"/>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <hr/>
      </>


      // <div className="header">
      //   <div className="headerLine">
      //     <div>
      //       <a
      //         className="logo"
      //         onClick={() => {
      //           this.props.history.push('/home');
      //         }}
      //       >
      //
      //         <span className="logo">БизнесАтом</span>
      //       </a>
      //       <div className="form-group mb-0">
      //         <input type="text" className="form-control" placeholder="Search.." />
      //         <IconButton>
      //           <SearchIcon style={{ color: 'white' }} />
      //         </IconButton>
      //       </div>
      //     </div>
      //     <div>
      //       <IconButton onClick={() => { this.props.history.push('/home/account'); }}>
      //         <PersonIcon style={{ color: 'white' }} />
      //       </IconButton>
      //       <IconButton onClick={() => { localStorage.clear(); window.location.reload(); }}>
      //         <ExitToAppIcon style={{ color: 'white' }} />
      //       </IconButton>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default withRouter(inject('services')(observer(Header)));
