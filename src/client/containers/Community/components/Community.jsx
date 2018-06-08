import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/fontawesome-free-solid';

import { LayerPage, Page } from '../../Layer';

import SpinnerWaiter from '../../../components/SpinnerWaiter';
import ErrorRequest from '../../../components/ErrorRequest';

class Community extends Component {
  static propTypes = {
    community: PropTypes.shape(),
    disputes: PropTypes.arrayOf(PropTypes.shape()),
    contractCode: PropTypes.string,

    isJoining: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.string
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
                <button className='btn m-1 btn-primary float-right' onClick={this.handleJoin} disabled={this.props.isJoining}>
                  {comm.isJoined ? 'Leave' : 'Join'}
                </button>
                <span className='Card__title'>{comm.title}</span>
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
              <Link to={`/community/${comm.name}/dispute/new`} className='btn m-1 btn-info'>Add dispute</Link>
            </div>
            <span className='Card__title'>Recent solved disputes</span>
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

          <div className='Community__subtitle Card__title'>Contract source code</div>
          <div className='Community__code'>
            <SyntaxHighlighter language='solidity' style={docco} showLineNumbers>{this.props.contractCode}</SyntaxHighlighter>
          </div>

        </Page>
      </LayerPage>
    );
  }
}

export default Community;
