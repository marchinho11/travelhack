import React from 'react';
import Header from '@/components/System/Header';

class Page extends React.Component {

  render() {
    return (
      <div className="maxSize pageWrapper">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
