// @flow

import React from 'react';

type Props = {
  handleVote: (string) => mixed,
  aId: string,
  aInfo: { answer: string, count: number},
};

const AnswerItemVote = ({ aId, aInfo, handleVote }: Props) => {
  const handleClick = () => handleVote(aId);
  return (
    <li>
      <button className='answer-item-vote' onClick={handleClick} >
        { aInfo.answer }
      </button>
    </li>
  );
};

export default AnswerItemVote;
