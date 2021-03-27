import React from 'react';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/services/common/constDictionary';
import { Redirect, withRouter } from 'react-router-dom';
import {Nav, Navbar, NavDropdown, FormControl, Button, Form} from "react-bootstrap";
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import {IconButton, MuiThemeProvider} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircle} from "@material-ui/icons";
import SlideMenu from "../SlideMenu";

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
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <div className={"ml-auto d-flex flex-row align-items-center"}>
            {this.store.currentUser.user_id && <div className={"d-flex flex-row align-items-center"}>
              <AccountCircle className={"mr-2"}/>
              <span>{this.store.currentUser.user_id}</span>
            </div>}
            <IconButton className={"ml-4 mr-4"} disableRipple={true} disableFocusRipple={true} onClick={() => {this.handleDrawerClick()}}>
              <MenuIcon/>
            </IconButton>
            <SlideMenu open={this.state.open} handleDrawerClick={() => this.handleDrawerClick()}/>
          </div>

        </div>
        <hr/>
      </>
    );
  }
}

export default withRouter(inject('services', StoresNames.FilterStore)(observer(Header)));
