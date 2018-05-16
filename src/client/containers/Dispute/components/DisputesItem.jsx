import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class DisputesItem extends Component {
  static propTypes = {
    dispute: PropTypes.any
  };

  render() {
    const dispute = this.props.dispute;

    return (
      <div className='col-6 d-inline-block'>
        <div className='border p-3 h-100'>
          <h3 className='text-center'>{dispute.title}</h3>
          <div className='clearfix'>
            <p className='mt-3'>{dispute.description}</p>
          </div>
          <div className='text-center mt-3'>
            <Link to={`/dispute/${dispute.id}`} className='btn btn-info'>More info</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default DisputesItem;
