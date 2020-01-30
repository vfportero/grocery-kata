import * as React from 'react';
import { ReactNode } from 'react';
import './Layout.scss';

interface Props {
    children: ReactNode,
}

interface State {
};

export default class Layout extends React.Component<Props, State> {
  state: State = {  };

  render () {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}