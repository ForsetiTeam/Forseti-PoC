import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DisputesItem from './DisputesItem';

class Disputes extends Component {
  static propTypes = {
    list: PropTypes.array,
    fetchDisputeList: PropTypes.func,
    // filters
    owner: PropTypes.bool,
    status: PropTypes.string
  };

  componentDidMount() {
    this.props.fetchDisputeList(this.props.owner, this.props.status);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.owner === nextProps.owner && this.props.status === nextProps.status) return;
    this.props.fetchDisputeList(nextProps.owner, nextProps.status);
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
