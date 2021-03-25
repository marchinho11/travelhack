import { ArrowBackOutlined } from '@material-ui/icons';
import React from 'react';
import { withRouter } from 'react-router-dom';
import ColorConfig from '@styles/Config';

class NotFound extends React.Component {
  render() {
    return (
      <div className="maxSize Auth notFound">
        <a className="goBack" onClick={() => { this.props.history.push('/'); }}>
          <ArrowBackOutlined style={{ color: ColorConfig.black }} fontSize="large" />
        </a>
        <form>
          <h1>
            404!
          </h1>
          <span className="logo">Извините, такой страницы не существует</span>
          <div className="inputForm">
            <button type="button" onClick={() => this.props.history.push('/home')}>Перейти на главную страницу</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(NotFound);
