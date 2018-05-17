// @flow

import axios from 'axios';
import type { Dispatch } from 'redux';
import * as types from './action-types';

const baseUrl = 'http://localhost:8357/';

const logInSuccess = (id, username) => ({
  type: types.LOGIN_SUCCESS,
  id,
  username,
});

const signUpSuccess = (id, username) => ({
  type: types.SIGNUP_SUCCESS,
  id,
  username,
});

export const logOutUser = () => {
  sessionStorage.removeItem('token');
  return { type: types.LOGOUT_USER };
};

const createQuestion = (id, question, answers) => ({
  type: types.CREATE_QUESTION,
  id,
  question,
  answers,
});

const createAnswer = (id, answer) => ({
  type: types.CREATE_ANSWER,
  id,
  answer,
});

const grabPoll = (id, question, date) => ({
  type: types.GRAB_POLL,
  id,
  question,
  date,
});

/* eslint-disable func-names, no-console, no-underscore-dangle */

export const signUpUser = (username, password) => function (dispatch: Dispatch<*>) {
  axios.post(`${baseUrl}auth/signup`, {
    username,
    password,
  })
    .then((response) => {
      dispatch(signUpSuccess(response.data.id, response.data.username));
      sessionStorage.setItem('token', response.data.token);
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    });
};

export const logInUser = (username, password) => function (dispatch: Dispatch<*>) {
  axios.post(`${baseUrl}auth/signin`, {
    username,
    password,
  })
    .then((response) => {
      dispatch(logInSuccess(response.data.id, response.data.username));
      sessionStorage.setItem('token', response.data.token);
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    });
};

export const createNewPoll = poll => function (dispatch: Dispatch<*>) {
  const token = sessionStorage.getItem('token');
  const axiosConfig = {
    method: 'POST',
    url: `${baseUrl}poll/create`,
    data: poll,
    headers: { Authorization: `Bearer ${token}` },
  };
  axios(axiosConfig)
    .then((response) => {
      const p = response.data.poll;
      const answerIdArr = p.answers.map(x => x._id);
      p.answers.forEach(y => dispatch(createAnswer(y._id, y.text)));
      dispatch(createQuestion(p._id, p.question, answerIdArr));
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    });
};

export const grabAllPolls = () => function (dispatch: Dispatch<*>) {
  axios.get(`${baseUrl}poll/graball`)
    .then((response) => {
      const rdap = response.data.allPolls;
      rdap.forEach(p => dispatch(grabPoll(p._id, p.question, p.date)));
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    });
};

/* eslint-enable func-names, no-console, no-underscore-dangle */
