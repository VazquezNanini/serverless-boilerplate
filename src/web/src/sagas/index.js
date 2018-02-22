import * as Actions from 'actionTypes';
import { call, put, fork, takeLatest } from 'redux-saga/effects';

type ResultsAction = {
  query: string
};

const fetchResults = query => {
  return fetch(`/api/results/query?${query}`, {
    accept: 'application/json'
  })
    .then(data => data.json())
    .catch(error => error);
};

/**
 * Saga that fetches results and dispatches an action to add it.
 *
 * @param {Object} action - action that is being processed by the saga.
 * @return {Generator} current task.
 */
export function* watchResultsFetch(action: ResultsAction): Generator<*, *, *> {
  try {
    const results = yield call(fetchResults, action.query);
    delete results.initialForm;
    yield put({
      type: Actions.ADD_RESULTS,
      results
    });
  } catch (error) {
    yield put({ type: Actions.ADD_RESULTS_FAILED, error });
  }
}

/**
 * Watches all {FETCH_RESULTS} actions.
 *
 * @return {Generator} - watcher for FETCH_RESULTS action.
 */
export function* watchResultsRequests() {
  yield takeLatest(Actions.FETCH_RESULTS, watchResultsFetch);
}

/**
 * Root saga containing all sagas used in the application.
 *
 * @return {Generator} compilation of all sagas.
 */
export default function* rootSaga() {
  yield [fork(watchResultsRequests)];
}
