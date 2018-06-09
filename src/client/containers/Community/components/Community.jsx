import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// highlight code
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

// dispute table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// community pic
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/fontawesome-free-solid';

import { LayerPage, Page, Popup } from '../../Layer';

import SpinnerWaiter from '../../../components/SpinnerWaiter';
import ErrorRequest from '../../../components/ErrorRequest';

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

  render() {
    if (this.props.isLoading) return <SpinnerWaiter isLoading={this.props.isLoading} />;
    if (this.props.error) return <ErrorRequest error={this.props.error} />;

    const comm = this.props.community;

    if (!comm) return <div />;

    return (
      <LayerPage
        topic='Info about community'
        comment='Is atomic unit of domain experts community build on trust and reputation'
      >
        <Page isSingle>

          <div className='Community flex'>
            <FontAwesomeIcon icon={icons[comm.icon]} className='Community__image float-left'/>
            <div className='Community__info'>
              <div>
                <button className='btn m-1 btn-primary float-right' onClick={this.props.onJoin} disabled={this.props.isJoining}>
                  {comm.isJoined ? 'Leave' : 'Join'}
                </button>
                <h1>{comm.title}</h1>
              </div>
              <p className='frsMuted'>{comm.description}</p>
              <dl className='row frsMuted'>
                <dt className='col-2'>Pool address:</dt>
                <dd className='col text-truncate'>{comm.poolAddress}</dd>
                <div className='w-100'/>
                <dt className='col-2'>Solved dispute:</dt>
                <dd className='col'>{comm.disputesSolved}</dd>
                <div className='w-100'/>
                <dt className='col-2'>Active members:</dt>
                <dd className='col'>{comm.usersActive}</dd>
              </dl>
            </div>
          </div>

          <hr/>

          <div className='Community__subtitle clearfix'>
            <div className='float-right'>
              <Popup trigger={<button className='btn btn-primary'>Add dispute</button>}>
                <NewDisputeWndContainer onFetchCreateDispute={this.props.onCreateDispute}/>
              </Popup>
              <Link to={`/community/${comm.name}/dispute/new`} className='btn m-1 btn-info'>Add dispute</Link>
            </div>
            <h1>Recent solved disputes</h1>
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
      </LayerPage>
    );
  }
}

export default Community;
