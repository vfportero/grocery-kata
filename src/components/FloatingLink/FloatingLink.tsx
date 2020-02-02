import * as React from 'react';
import './FloatingLink.scss';
import { Link } from 'react-router-dom';

interface Props {
    href: string;
    label: string;
    icon: string;
}

export default class FloatingLink extends React.Component<Props> {


  render () {
    return (
        <div className="floating-link">
            <Link to={this.props.href}><span role="img" aria-label={this.props.label}>{this.props.icon}</span></Link>
        </div>
    );
  }
}