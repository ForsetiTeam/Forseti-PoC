import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LayerPage, Page } from '../../Layer';
import DisputesItem from './DisputesItem';

import SpinnerWaiter from '../../../components/SpinnerWaiter';
import ErrorRequest from '../../../components/ErrorRequest';

class Disputes extends Component {
  static propTypes = {
    topic: PropTypes.string,
    comment: PropTypes.string,

    list: PropTypes.array,
    error: PropTypes.string,
    isLoading: PropTypes.bool,
    filter: PropTypes.string
  };

  renderPage() {
    if (this.props.error) return <div className='noPage'><ErrorRequest error={this.props.error}/></div>;
    if (this.props.isLoading) return <div className='noPage'><SpinnerWaiter isLoading={this.props.isLoading}/></div>;
    if (!this.props.list.length) return <div className='noPage'>There are no disputes yet</div>;
    return (
      <Page>
        {this.props.list.map(dispute => (
          <DisputesItem key={dispute.id} dispute={dispute}/>
        ))}
      </Page>);
  }

  render() {
    return (
      <LayerPage
        topic={this.props.topic}
        comment={this.props.comment}
      >
        {this.renderPage()}
      </LayerPage>
    );
  }
}

export default Disputes;
