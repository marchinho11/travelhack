import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/services/common/constDictionary';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.loaderStore = this.props[StoresNames.LoaderStore];
  }

  render() {
    if (!this.loaderStore.getLoader()) return null;

    return (
      <div className="maxSize Loader">
        <CircularProgress size={80} />
      </div>
    );
  }
}

export default inject(StoresNames.LoaderStore, 'services')(observer(Loader));
