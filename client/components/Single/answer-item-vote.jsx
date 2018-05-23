// @flow

import React from 'react';

const AnswerItemVote = ({ aId, aInfo, handleVote }) => {
  const handleClick = () => handleVote(aId);
  return (
    <li>
      <button className='answer-item-vote' onClick={handleClick} >
        { aInfo.answer } -  { aInfo.count }
      </button>
    </li>
  );
};

export default AnswerItemVote;
