import React, { Component } from 'react';
import PropTypes from 'prop-types';

// highlight code
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
delete docco.hljs.overflowX;
docco.hljs.overflow = 'initial';
docco.hljs.marginBottom = 0;

// dispute table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// community pic
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/fontawesome-free-solid';

import { LayerPage, Page, Popup } from '../../Layer';

import SpinnerWaiter from '../../../components/SpinnerWaiter';
import ErrorRequest from '../../../components/ErrorRequest';
import EtherscanLink from '../../../components/EtherscanLink';

import { NewDisputeWndContainer } from '../../Dispute';

class Community extends Component {
  static propTypes = {
    community: PropTypes.shape(),
    disputes: PropTypes.arrayOf(PropTypes.shape()),
    contractCode: PropTypes.string,

    isJoining: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.string,

    onJoin: PropTypes.func,
    onCreateDispute: PropTypes.func
  };

  renderPage() {
    if (this.props.isLoading) return <div className='noPage'><SpinnerWaiter isLoading={this.props.isLoading} /></div>;
    if (this.props.error) return <div className='noPage'><ErrorRequest error={this.props.error} /></div>;

    const comm = this.props.community;

    if (!comm) return <div className='noPage'>Community not found</div>;


    return (
      <Page isSingle>
        <div className='Community'>
          <FontAwesomeIcon icon={icons[comm.icon]} className='Community__image d-none d-sm-block float-left mr-3'/>
          <div>
            <div className='d-flex align-items-start'>
              <h1 className='flex-grow-1'>{comm.title}</h1>
              <div>
                <SpinnerWaiter isLoading={this.props.isJoining}/>
                <button className='btn m-1 btn-primary' onClick={this.props.onJoin} disabled={this.props.isJoining}>
                  {comm.isJoined ? 'Leave' : 'Join'}
                </button>
              </div>
            </div>
            <p className='text-muted'>{comm.description}</p>
            <dl className='row text-muted ml-0'>
              <dt style={{ width: '150px' }}>Pool address:</dt>
              <dd className='col text-truncate'><EtherscanLink address={comm.poolAddress} /></dd>
              <div className='w-100'/>
              <dt style={{ width: '150px' }}>Solved dispute:</dt>
              <dd className='col'>{comm.disputesSolved}</dd>
              <div className='w-100'/>
              <dt style={{ width: '150px' }}>Active members:</dt>
              <dd className='col'>{comm.usersActive}</dd>
            </dl>
          </div>
        </div>

        <hr/>

        <div className='Community__subtitle d-flex align-items-start'>
          <h1 className='flex-grow-1'>Recent solved disputes</h1>
          <Popup trigger={<button className='btn btn-primary'>Add dispute</button>}>
            <NewDisputeWndContainer onFetchCreateDispute={this.props.onCreateDispute}/>
          </Popup>
        </div>
        <div>
          <ReactTable
            data={this.props.disputes}
            columns={[
              {
                Header: 'Date',
                accessor: 'date',
                width: 100
              },
              {
                Header: 'Contract address',
                accessor: 'disputeAddress'
              },
              {
                Header: 'Respondent address',
                accessor: 'respondentAddress'
              },
              {
                Header: 'Applicant address',
                accessor: 'applicantAddress'
              },
              {
                Header: 'Trans. sum',
                id: 'transactionSum',
                accessor: dispute => `${dispute.transactionSum} Eth`,
                width: 100
              },
              {
                Header: 'Winner',
                id: 'win',
                accessor: dispute => dispute.win ?
                  <span className='badge badge-success'>Respondent</span>
                  :
                  <span className='badge badge-danger'>Applicant</span>,
                width: 100
              }
            ]}
            minRows={0}
            style={{
              border: 0
            }}
            className='-striped -highlight'
            showPagination={false}
            sortable={false}
          />
        </div>

        <hr/>

        <h1 className='Community__subtitle'>Contract source code</h1>
        <div className='Community__code'>
          <SyntaxHighlighter language='solidity' style={docco} showLineNumbers>{this.props.contractCode}</SyntaxHighlighter>
        </div>

      </Page>
    );
  }

  render() {
    return (
      <LayerPage
        topic='Info about community'
        comment='Is atomic unit of domain experts community build on trust and reputation'
      >
        {this.renderPage()}
      </LayerPage>
    );
  }
}

export default Community;
