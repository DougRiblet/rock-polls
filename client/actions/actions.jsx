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
  answers
});

const createAnswer = (id, answer) => ({
  type: types.CREATE_ANSWER,
  id,
  answer,
});

/* eslint-disable func-names, no-console */

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
    url: `${baseUrl}createpoll`,
    data: poll,
    headers: { Authorization: `Bearer ${token}` },
  };
  axios(axiosConfig)
    .then((response) => {
      const p = response.data.poll;
      const answerIdArr = p.answers.map(x => x._id);
      dispatch(createQuestion(p._id, p.question, answerIdArr));
      p.answers.forEach(y => dispatch(createAnswer(y._id, y.text)));
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    });
};

/* eslint-enable func-names, no-console */
