import React from 'react';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/services/common/constDictionary';
import { Redirect, withRouter } from 'react-router-dom';
import {Nav, Navbar, NavDropdown, FormControl, Button, Form} from "react-bootstrap";
import {AccountCircle} from "@material-ui/icons";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.store = this.props[StoresNames.FilterStore];
    this.requestService = this.props.services.requestService;
    this.networkService = this.props.services.networkService;
  }
  
  handleDrawerClick() {
    if (this.state.open == false)
      this.setState({ open: true });
    else
      this.setState({ open: false });
  }

  render() {

    return (
      <>
        <div className={"d-flex flex-row align-items-center"}>
          <Navbar expand="lg">
            <Navbar.Brand>
              <img src={"https://www.tui.ru/images-new/svg/tui-logo.svg"} alt="logo"/>
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav" style={{transform: "translate(0, 8px)"}}>
              {/*<Form inline>*/}
              {/*  <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
              {/*  <Button variant="outline-primary">Search</Button>*/}
              {/*</Form>*/}
            </Navbar.Collapse>
          </Navbar>
          <div className={"ml-auto d-flex flex-row align-items-center"}>
            {this.store.currentUser.user_id && <div className={"d-flex flex-row align-items-center"}>
              <AccountCircle className={"mr-2"}/>
              <span>{this.store.currentUser.user_id}</span>
            </div>}
          </div>

        </div>
        <hr/>
      </>
    );
  }
}

export default withRouter(inject('services', StoresNames.FilterStore)(observer(Header)));
