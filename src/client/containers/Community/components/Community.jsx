import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/fontawesome-free-solid';

import { LayerPage } from '../../Layer';
import Page from '../../../components/Page';

import SpinnerWaiter from '../../../components/SpinnerWaiter';
import ErrorRequest from '../../../components/ErrorRequest';

class Community extends Component {
  static propTypes = {
    communityName: PropTypes.string,
    community: PropTypes.shape(),
    isJoining: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    isMetamaskLoaded: PropTypes.bool,

    fetchCommunity: PropTypes.func,
    fetchCommunityJoin: PropTypes.func
  };

  componentDidMount() {
    if (this.props.isMetamaskLoaded) {
      this.props.fetchCommunity(this.props.communityName);
    }
  }

  componentWillUpdate(newProps) {
    if (!this.props.isMetamaskLoaded && newProps.isMetamaskLoaded) {
      this.props.fetchCommunity(this.props.communityName);
    }
  }

  handleJoin = () => {
    this.props.fetchCommunityJoin(this.props.community);
  };

  render() {
    if (this.props.isLoading) return <SpinnerWaiter isLoading={this.props.isLoading} />;
    if (this.props.error) return <ErrorRequest error={this.props.error} />;

    const comm = this.props.community;

    if (!comm) return <div />;

    const data = [
      {
        id: 1,
        date: '12.05.2018',
        disputeAddress: '0x2fb5ea25faa8a3f13ad54facda7783dcf79976c9',
        respondentAddress: '0x88373c8ce5213bfd1530c83e409b4bc024586202',
        applicantAddress: '0x3134409b4b88583373c8ce5206202bfed15c0c82',
        transactionSum: 5,
        win: true
      },
      {
        id: 2,
        date: '14.05.2018',
        disputeAddress: '0xaa8a3f16c9fac2fb53ad547997ea25fda7783dcf',
        respondentAddress: '0x3bfd102458620253088373c8ce521c83e409b4bc',
        applicantAddress: '0xb4b8852bfed15c0c8283373c8ce5206203134409',
        transactionSum: 7,
        win: true
      },
      {
        id: 3,
        date: '14.05.2018',
        disputeAddress: '0xd547997eaa3f1625fda7783dcfaa8c9fac2fb53a',
        respondentAddress: '0x373c8ce521c10245862025308883e409b4bc3bfd',
        applicantAddress: '0x206203134409b4b885ed15c0c8283373c8ce52bf',
        transactionSum: 3,
        win: false
      },
      {
        id: 4,
        date: '21.05.2018',
        disputeAddress: '0x1625fdacfaa8c9f7783dd54fac2fb53a7997eaa3',
        respondentAddress: '0x025308883373c862e409b4bc3bfd8ce521c10245',
        applicantAddress: '0x344083373c8ce52bf9b4b885ed15c0c822062031',
        transactionSum: 9,
        win: true
      },
      {
        id: 5,
        date: '24.05.2018',
        disputeAddress: '0xdacfaa8c9fb53a7997eaa3f7783dd54f1625fac2',
        respondentAddress: '0xbc1c102450253088833bfd8ce52373c862e409b4',
        applicantAddress: '0x528ce9b4b885ed15c0c822062031bf344083373c',
        transactionSum: 12,
        win: false
      },
      {
        id: 6,
        date: '28.05.2018',
        disputeAddress: '0x8a3f13ad54facda7783dcf79976c92fb5ea25faa',
        respondentAddress: '0x9b4bc02458620288373c8ce5213bfd1530c83e40',
        applicantAddress: '0x6202bfed15c0c823134409b4b88583373c8ce520',
        transactionSum: 5,
        win: true
      },
      {
        id: 7,
        date: '29.05.2018',
        disputeAddress: '0x47997ea25fda7783dcfaa8a3f16c9fac2fb53ad5',
        respondentAddress: '0x3088373c8ce521c83e409b4bc3bfd10245862025',
        applicantAddress: '0x62031fed15c0c82834409b4b8852b3373c8ce520',
        transactionSum: 8,
        win: false
      }
    ];

    const contractCode = `
pragma solidity ^0.4.18;

contract ERC20Basic {
  function totalSupply() public view returns (uint256);
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}

contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) public view returns (uint256);
  function transferFrom(address from, address to, uint256 value) public returns (bool);
  function approve(address spender, uint256 value) public returns (bool);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  /**
   * @dev The Ownable constructor sets the original \`owner\` of the contract to the sender
   * account.
   */
  function Ownable() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}


library SafeMath {

  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  /**
  * @dev Substracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}
contract Pool {

  using SafeMath for uint256;

  modifier onlyPoolMaster() {
    require(msg.sender == poolMaster);
    _;
  }

  struct Member {
  uint256 reputationPoints;
  address ethAddress;
  }

  address public poolMaster;
  uint256 public depositStake;
  uint256 public membersLimit;
  string public name;

  mapping (uint256 => Member) public membersById;
  mapping (address => uint256) public membersByAddress;
  //mapping (uint256 => Member) public pendingMembers;
  uint256 public membersCount;
  //uint256 public pendingCount;
  //Member[] pendingMembers;

  function Pool(address _poolMaster, uint256 _depositStake, string _name) public {
    name = _name;
    poolMaster = _poolMaster;
    depositStake = _depositStake;
    membersLimit = depositStake.div(1 ether);
  }

  function becomeNewMember() public  {
    //pendingMembers[pendingCount + 1] = Member(1 , msg.sender);
    //pendingCount += 1;
    membersCount += 1;
    membersById[membersCount] = Member(1 , msg.sender);
    membersByAddress[msg.sender] = 1;
  }

  function leavePool() public {
    uint256 idToDelete;
    idToDelete = membersByAddress[msg.sender];
    delete membersByAddress[msg.sender];
    delete membersById[idToDelete];
  }

  /**
  function confirmNewMember(uint256 id) public onlyPoolMaster {
    membersId[membersCount + 1] =  pendingMembers[id];
    membersCount += 1;
    delete pendingMembers[id];
    pendingCount -= 1;
  }
  */

  function getMembersReputation(uint256 _id) public view returns(uint256) {
    return membersById[_id].reputationPoints;
  }

  function getMembersAddress(uint256 _id) public view returns(address) {
    return membersById[_id].ethAddress;
  }


}

contract PoolFactory {

  mapping (uint => address) public pools;
  uint256 public poolsCount;
  //uint256 depositValue;
  ERC20 public forsToken;


  event NewPoolCreating(address newPool, address newPoolsMaster);


  function PoolFactory(address _token) public {
    forsToken = ERC20(_token);
    //depositValue = _depositValue;
  }


  function createPool(uint256 _depositStake, string _name) public {
    // require()
    address newPool = new Pool(msg.sender, _depositStake, _name);
    poolsCount += 1;
    pools[poolsCount] = newPool;
    forsToken.transferFrom(msg.sender, newPool, _depositStake);
    NewPoolCreating(newPool, msg.sender);
  }
}`;

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
              data={data}
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
            <SyntaxHighlighter language='solidity' style={docco} showLineNumbers>{contractCode}</SyntaxHighlighter>
          </div>

        </Page>
      </LayerPage>
    );
  }
}

export default Community;
