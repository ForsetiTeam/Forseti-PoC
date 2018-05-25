import React, { Component } from 'react';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';

import DisputesItem from './DisputesItem';

class Disputes extends Component {
  static propTypes = {
    list: PropTypes.array,
    fetchDisputeList: PropTypes.func,
    filter: PropTypes.object
  };

  componentDidMount() {
    this.props.fetchDisputeList(this.props.filter);
  }

  componentWillReceiveProps(nextProps) {
    if (equal(this.props.filter, nextProps.filter)) return;
    this.props.fetchDisputeList(nextProps.filter);
  }

  render() {
    if (!this.props.list.length) return <div>No entries</div>;

    return (
      <div className='d-flex flex-wrap'>
        {this.props.list.map(dispute =>
          <DisputesItem key={dispute.id} dispute={dispute}/>
        )}
      </div>
    );
  }
}

export default Disputes;
