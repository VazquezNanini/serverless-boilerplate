// @flow
import React, { Component } from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import * as Actions from 'actionTypes';

import styles from 'rootContainers/Home.scss';

const publicUrl = process.env.PUBLIC_URL || '';

/**
 * <Home /> component.
 * @param {string} param - param
 * @return {class} returns home instance
 */
export class Home extends Component<*, *> {
  /**
   * MapStateToProps implementation.
   * @return {object} new state object
   * @param {object} state object
   */
  static mapStateToProps(state: Object) {
    return {
      results: state.results
    };
  }

  /**
   * ComponentWillMount it fetches the makes.
   * @return {void}
   */
  componentWillMount() {
    this.props.dispatch({
      type: Actions.FETCH_RESULTS
    });
  }

  /**
   * Renders the Home component.
   *
   * @return {JSX} - rendered Home page.
   */
  render(): Element<*> {
    return (
      <div className={styles}>
        It Works!
        {publicUrl && (<div>cdn: {publicUrl}</div>)}
      </div>
    );
  }
}

export default connect(Home.mapStateToProps)(Home);
