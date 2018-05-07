import React, { Component, PropTypes } from 'react';
import Pagniator from 'react-paginate';
require('./index.scss');

export default class Pagination extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    onChangePageSize: PropTypes.func.isRequired,
    onPageClick: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentWillReceiveProps (nextProps) {
    const { pageSize } = this.props;
    if (pageSize !== nextProps.pageSize) {
      this.handlePageClick(0);
    }
  }

  totalPage (totalCount, pageSize) {
    return Math.ceil(totalCount / pageSize);
  }

  handlePageClick (page) {
    const { onPageClick } = this.props;
    onPageClick(page + 1);
  }

  onChangePageSize (pageSize) {
    const { onChangePageSize } = this.props;
    if (pageSize) {
      onChangePageSize(parseInt(pageSize, 10));
    }
  }

  render () {
    const { currentPage, totalCount, pageSize } = this.props;
    return (
      <div className='pagination-container'>
        <Pagniator
          activeClassName='page-active'
          disableInitialCallback
          forcePage={parseInt(currentPage, 10) - 1}
          initialPage={0}
          marginPagesDisplayed={1}
          nextLabel='>'
          nextLinkClassName='btn'
          pageCount={this.totalPage(totalCount, pageSize)}
          pageLinkClassName='btn'
          pageRangeDisplayed={4}
          previousLabel='<'
          previousLinkClassName='btn'
          onPageChange={(page) => this.handlePageClick(page.selected)} />
        <div className='input-container'>
          <input
            className='form-control'
            min='1'
            style={{ width: '50px' }}
            type='number' value={pageSize}
            onChange={(e) => this.onChangePageSize(e.target.value)} />
          <span>Per Page</span>
        </div>
      </div>
    );
  }
}
