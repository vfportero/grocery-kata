import * as React from 'react';
import './Layout.scss';

export default class Layout extends React.Component {

  render () {
    return (
        <div className="layout">
            <div className="background"></div>
            <div className="container">
                {this.props.children}
            </div>
        </div>
    );
  }
}