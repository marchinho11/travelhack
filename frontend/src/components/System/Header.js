import React from 'react';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import logo from '@icons/favicon.svg';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/services/common/constDictionary';
import { Redirect, withRouter } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

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
      <div className="header">
        <div className="headerLine">
          <div>
            <a
              className="logo"
              onClick={() => {
                this.props.history.push('/home');
              }}
            >
              <img src={logo} alt="logo" />
              <span className="logo">БизнесАтом</span>
            </a>
            <div className="form-group mb-0">
              <input type="text" className="form-control" placeholder="Search.." />
              <IconButton>
                <SearchIcon style={{ color: 'white' }} />
              </IconButton>
            </div>
          </div>
          <div>
            <IconButton onClick={() => { this.props.history.push('/home/account'); }}>
              <PersonIcon style={{ color: 'white' }} />
            </IconButton>
            <IconButton onClick={() => { localStorage.clear(); window.location.reload(); }}>
              <ExitToAppIcon style={{ color: 'white' }} />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(inject('services')(observer(Header)));
