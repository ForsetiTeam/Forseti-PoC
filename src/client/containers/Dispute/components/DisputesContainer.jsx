import React, { Component } from 'react';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';

import Disputes from './Disputes';
import { DISPUTE_FILTER_MY, DISPUTE_FILTER_UNANSWERED, DISPUTE_FILTER_ANSWERED } from '../../../consts';

class DisputesContainer extends Component {
  static propTypes = {
    list: PropTypes.array,
    error: PropTypes.string,
    isLoading: PropTypes.bool,

    filter: PropTypes.string,
    filterParams: PropTypes.object,

    fetchDisputeList: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchDisputeList(this.props.filterParams);
  }

  componentWillReceiveProps(nextProps) {
    if (equal(this.props.filterParams, nextProps.filterParams)) return;
    this.props.fetchDisputeList(nextProps.filterParams);
  }

  getPageHeader() {
    switch (this.props.filter) {
      case DISPUTE_FILTER_MY:
        return {
          topic: 'My disputes',
          comment: 'Disputes you started'
        };
      case DISPUTE_FILTER_UNANSWERED:
        return {
          topic: 'Incoming disputes',
          comment: 'Disputes you about to solve'
        };
      case DISPUTE_FILTER_ANSWERED:
        return {
          topic: 'Closed disputes',
          comment: 'Disputes you solved'
        };
      default:
        return {};
    }
  }

  render() {
    return (
      <Disputes
        {...this.getPageHeader()}
        list={this.props.list}
        error={this.props.error}
        isLoading={this.props.isLoading}
        filter={this.props.filter}
      />
    );
  }
}

export default DisputesContainer;
