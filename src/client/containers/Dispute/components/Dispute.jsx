import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { request, downloadFile } from '../../../redux/actions/utils/axios';
import apiRoutes from '../../../redux/apiRoutes';

class Dispute extends Component {
  static propTypes = {
    id: PropTypes.string,
    dispute: PropTypes.shape,
    currentUser: PropTypes.shape,
    documentLink: PropTypes.string,
    fetchDispute: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchDispute(this.props.id);
  }

  handleDownloadDocument = e => {
    e.preventDefault();
    request('get', apiRoutes.disputeDocument(this.props.id)).then(response => downloadFile(response));
  };

  isArbiter() {
    return this.props.dispute.author !== this.props.currentUser.id;
  }

  render() {
    const dispute = this.props.dispute;

    if (!dispute) return <div>No entry or no access</div>;
    return (
      <div>
        <h3 className='text-center'>{dispute.title}</h3>
        <div className='row justify-content-center m-3'>
          <div className='col-6'>
            <p>Author: {dispute.author}</p>
            <p>Community: {dispute.community}</p>
            <p>Description: {dispute.description}</p>
            <p>Arbiters count: {dispute.arbitersNeed}</p>
            {dispute.document &&
              <p><a href='#' onClick={this.handleDownloadDocument}>Download document</a></p>
            }
          </div>
        </div>
        {this.isArbiter() &&
          <div className='text-center'>
            <button className='btn m-1'>Resolve</button>
          </div>
        }
      </div>
    );
  }
}

export default Dispute;
