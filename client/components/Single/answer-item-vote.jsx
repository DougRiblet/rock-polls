// @flow

import React from 'react';

const AnswerItemVote = ({ aId, aInfo, handleVote }) => {
  const handleClick = () => handleVote(aId);
  return <li
    className='answer-item-vote'
    onClick={handleClick}
    >
      { aInfo.answer } -  { aInfo.count }
    </li>
};

export default AnswerItemVote;
