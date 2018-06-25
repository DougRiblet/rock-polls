// @flow

import React from 'react';

type Props = {
  allPolls: Object,
  allAnswers: Object,
  pollid: string,
};

const DisplayResults = ({ allPolls, allAnswers, pollid }: Props) => {
  const getDisplay = () => {
    const { answers } = allPolls[pollid];
    if (answers) {
      return answers.map((aId) => {
        if (allAnswers[aId]) {
          const aObj = allAnswers[aId];
          aObj.id = aId;
          return aObj;
        }
        return null;
      })
        .filter(y => y)
        .sort((a, b) => a.count < b.count)
        .map(a => <li key={a.id}>{a.answer} - {a.count}</li>);
    }
    return '';
  };
  return (
    <ul>
      { getDisplay() }
    </ul>
  );
};

export default DisplayResults;
