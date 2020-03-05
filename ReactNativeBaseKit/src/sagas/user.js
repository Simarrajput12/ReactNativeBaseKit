import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
  LOGIN,
  LOGOUT,
  loginFailure,
  loginRequested,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  logoutRequested,
  getMoviesRequested,
  getMoviesFailure,
  getMoviesSuccess,
  GET_MOVIES,
} from '../actions/user-actions-types';
import httpClient from './http-client';


export function* login({
  payload: {
    data,callback,
  },
}) {
  yield put(loginRequested());
  const payload = {
    data,
    method: 'post',
    url: 'http://fakerestapi.azurewebsites.net/api/Users',
  };
  const {
    result, error,
  } = yield call(httpClient, payload);
  if (error) {
    yield put(loginFailure(error));
    if (callback && error.message === 'Kindly verify your email first to login.') {
      callback();
    }
  } else {
    yield put(loginSuccess(result));
  }
}


export function* logout() {
  yield put(logoutRequested());
  const token = yield select(({ user: { userDetails: { ID} } }) => ID);
  const payload = {
    data: { ID: token },
    method: 'put',
    url: '/api/Users',
  };
  const {
    result, error,
  } = yield call(httpClient, payload);

  if (error) {
    yield put(logoutFailure(error));
  } else {
    yield put(logoutSuccess());
    yield put(ToastActionsCreators.displayInfo(result.message));
  }
}

export function* getMovies() {
  yield put(getMoviesRequested());

  const {error, result} = yield call(httpClient, {
    baseURL: 'https://facebook.github.io/react-native/',
    method: 'get',
    url: 'movies.json',
  });

  if (error) {
    yield put(getMoviesFailure(error));
  } else {
    yield put(getMoviesSuccess(result.movies));
  }
}

function* User() {
  yield all([
    takeLatest(GET_MOVIES, getMovies),
    takeLatest(LOGIN, login),
    takeLatest(LOGOUT, logout),
  ]);
}

export default User;
