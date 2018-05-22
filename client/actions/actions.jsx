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

const createAnswer = (id, answer, count) => ({
  type: types.CREATE_ANSWER,
  id,
  answer,
  count,
});

const addVote = (id) => ({
  type: types.ADD_VOTE,
  id,
});

const addAnswer = (answerId, pollId) => ({
  type: types.ADD_ANSWER,
  answerId,
  pollId,
});

const grabPoll = (id, question, date) => ({
  type: types.GRAB_POLL,
  id,
  question,
  date,
});

const grabSingle = (id, question, date, answers) => ({
  type: types.GRAB_SINGLE,
  id,
  question,
  date,
  answers,
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
      p.answers.forEach(y => dispatch(createAnswer(y._id, y.text, 0)));
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

export const grabSinglePoll = (pollid) => function(dispatch: Dispatch<*>) {
  axios.get(`${baseUrl}poll/grabsingle`, { params: { id: pollid } })
    .then((response) => {
      const spa = response.data.opAnswers;
      spa.forEach(a => dispatch(createAnswer(a._id, a.text, a.count)));
      const op = response.data.onePoll;
      dispatch(grabSingle(op._id, op.question, op.date, op.answers));
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    })
}

export const castVote = (answerid) => function(dispatch: Dispatch<*>) {
  axios.put(`${baseUrl}poll/vote`, { id: answerid })
    .then((response) => {
      dispatch(addVote(answerid));
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    })
}

export const addAltAnswer = (pollId, newAnswer) => function(dispatch: Dispatch<*>) {
  axios.post(`${baseUrl}poll/alt`, { pollId, newAnswer })
    .then((response) => {
      const a = response.data;
      dispatch(createAnswer(a._id, a.answer, 1))
      dispatch(addAnswer(a._id, pollId));
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    })
}

/* eslint-enable func-names, no-console, no-underscore-dangle */
