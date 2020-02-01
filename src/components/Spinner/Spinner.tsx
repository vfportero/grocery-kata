import * as React from 'react';
import './Spinner.scss';

interface Props {
}

interface State {
};

export default class Spinner extends React.Component<Props, State> {
  state: State = {  };

  render () {
    return (
        <div className="spinner"></div>
    );
  }
}