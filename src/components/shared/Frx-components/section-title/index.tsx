import React, { Component } from 'react';
import './styles.scss';

class SectionTitle extends Component<any, any> {
  render() {
    return ( 
      <div className="section-title" {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default SectionTitle;