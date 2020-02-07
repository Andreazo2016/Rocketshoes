import { all } from 'redux-saga/effects'

import cartSaga from './Cart/saga'


export default function* rootSaga() {
  yield all([
    cartSaga,
  ]);
}
