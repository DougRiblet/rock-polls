// @flow

import React from 'react';

type Props = {
  createNewPoll: (poll: newPoll) => mixed,
  user_id: string,
  username: string,
};

type State = {
  username: string,
  password: string,
};