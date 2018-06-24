// @flow

import axios from 'axios';
import type { Dispatch } from 'redux';
import * as types from './action-types';

const baseUrl: string = 'http://localhost:8357/';

const logInSuccess = (id: string, username: string) => ({
  type: types.LOGIN_SUCCESS,
  id,
  username,
});

const signUpSuccess = (id: string, username: string) => ({
  type: types.SIGNUP_SUCCESS,
  id,
  username,
});

export const logOutUser = () => {
  sessionStorage.removeItem('token');
  return { type: types.LOGOUT_USER };
};

const createQuestion = (id: string, question: string, date: string, answers: Array<string>) => ({
  type: types.CREATE_QUESTION,
  id,
  question,
  date,
  answers,
});

const createAnswer = (id: string, answer: string, count: number) => ({
  type: types.CREATE_ANSWER,
  id,
  answer,
  count,
});

const addVote = (id: string) => ({
  type: types.ADD_VOTE,
  id,
});

const addAnswer = (answerId: string, pollId: string) => ({
  type: types.ADD_ANSWER,
  answerId,
  pollId,
});

const grabMyPoll = (id: string, question: string, date: string, answers: Array<string>) => ({
  type: types.GRAB_MY_POLL,
  id,
  question,
  date,
  answers,
});

const grabSingle = (id: string, question: string, date: string, answers: Array<string>) => ({
  type: types.GRAB_SINGLE_POLL,
  id,
  question,
  date,
  answers,
});

const deleteSingle = (id: string) => ({
  type: types.DELETE_SINGLE,
  id,
});

/* eslint-disable func-names, no-console, no-underscore-dangle */

export const signUpUser = (username: string, password: string) => function (dispatch: Dispatch<*>) {
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

export const logInUser = (username: string, password: string) => function (dispatch: Dispatch<*>) {
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

// eslint-disable-next-line no-undef
export const createNewPoll = (poll: newPoll) => function (dispatch: Dispatch<*>) {
  const token = String(sessionStorage.getItem('token'));
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
      dispatch(createQuestion(p._id, p.question, p.date, answerIdArr));
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    });
};

export const grabAllPolls = () => function (dispatch: Dispatch<*>) {
  axios.get(`${baseUrl}poll/graball`)
    .then((response) => {
      const rdap = response.data.allPolls;
      rdap.forEach(p => dispatch(grabSingle(p._id, p.question, p.date, p.answers)));
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    });
};

export const grabSinglePoll = (pollid: string) => function (dispatch: Dispatch<*>) {
  axios.get(`${baseUrl}poll/grabsingle`, { params: { id: pollid } })
    .then((response) => {
      const spa = response.data.opAnswers;
      spa.forEach(a => dispatch(createAnswer(a._id, a.text, a.count)));
      const op = response.data.onePoll;
      dispatch(grabSingle(op._id, op.question, op.date, op.answers));
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    });
};

export const grabMyPolls = (userid: string) => function (dispatch: Dispatch<*>) {
  const token = String(sessionStorage.getItem('token'));
  const axiosConfig = {
    method: 'GET',
    url: `${baseUrl}poll/grabmaker`,
    params: { userid },
    headers: { Authorization: `Bearer ${token}` },
  };
  axios(axiosConfig)
    .then((response) => {
      const rdmp = response.data.myPolls;
      rdmp.forEach(p => dispatch(grabMyPoll(p._id, p.question, p.date, p.answers)));
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    });
};

export const castVote = (answerid: string) => function (dispatch: Dispatch<*>) {
  axios.put(`${baseUrl}poll/vote`, { id: answerid })
    .then(() => {
      dispatch(addVote(answerid));
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    });
};

export const addAltAnswer = (
  pollId: string,
  answerText: string,
  userId: string,
) => function (dispatch: Dispatch<*>) {
  const token = String(sessionStorage.getItem('token'));
  const axiosConfig = {
    method: 'POST',
    url: `${baseUrl}poll/alt`,
    data: { pollId, answerText, user_id: userId },
    headers: { Authorization: `Bearer ${token}` },
  };
  axios(axiosConfig)
    .then((response) => {
      const a = response.data;
      dispatch(createAnswer(a._id, a.text, 1));
      dispatch(addAnswer(a._id, pollId));
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    });
};

export const deletePoll = (pollId: string, userId: string) => function (dispatch: Dispatch<*>) {
  const token = String(sessionStorage.getItem('token'));
  const axiosConfig = {
    method: 'DELETE',
    url: `${baseUrl}poll/delete`,
    data: { pollId, user_id: userId },
    headers: { Authorization: `Bearer ${token}` },
  };
  axios(axiosConfig)
    .then(() => {
      dispatch(deleteSingle(pollId));
    })
    .catch((error) => {
      console.log('### ERROR: ', error);
    });
};


/* eslint-enable func-names, no-console, no-underscore-dangle */
