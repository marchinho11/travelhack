import React from 'react';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/services/common/constDictionary';
import { Redirect, withRouter } from 'react-router-dom';
import {Nav, Navbar, NavDropdown, FormControl, Button, Form} from "react-bootstrap";
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import {IconButton, MuiThemeProvider} from "@material-ui/core";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
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
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <IconButton className={"ml-auto mr-4"} style={{transform: "translate(0, 8px)"}} disableRipple={true} disableFocusRipple={true} onClick={() => {this.handleDrawerClick()}}>
            <MenuIcon/>
          </IconButton>
          <Drawer anchor={"right"} open={this.state.open} onClose={() => this.handleDrawerClick()}>
            <MenuItem>Menu Item 1</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
        </div>
        <hr/>
      </>
    );
  }
}

export default withRouter(inject('services')(observer(Header)));
