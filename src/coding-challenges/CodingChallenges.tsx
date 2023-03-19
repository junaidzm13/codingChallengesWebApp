import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { useJApi } from '../jApi/useJApi';
import { SelectDropdown } from '../shared/SelectDropdown';
import { TextInput } from '../shared/TextInput';
import { ChallengeType } from './types/ChallengeType';

export const CodingChallenges: React.FC = () => {
  const [result, setResult] = React.useState<string | undefined>(undefined);
  const [text, setText] = React.useState('');
  const [challengeType, setChallengeType] = React.useState<ChallengeType>(
    ChallengeType.IS_PALINDROME
  );

  const { data } = useJApi('solveCodingChallenge', {
    challengeType: ChallengeType.IS_PALINDROME,
    value: 'racecar',
  });

  const onSend = async () => {
    const rest = await axios.post<string>(
      `http://localhost:8080/coding-challenge/${challengeType}`,
      { value: text }
    );
    setResult(`${rest.data}`);
  };

  return (
    <Wrapper>
      <h1>{'Coding challenges'}</h1>
      <TextInput value={text} onChange={setText} />
      <SelectDropdown
        onChange={setChallengeType}
        value={challengeType}
        options={[...options]}
      />
      <button onClick={onSend}>{'Send'}</button>
      <span>{`Result: ${result ?? `${data}` ?? 'no result'}`}</span>
    </Wrapper>
  );
};

const options = [
  { value: ChallengeType.LENGTH_OF_LAST_WORD, label: 'length of last word' },
  { value: ChallengeType.IS_PALINDROME, label: 'Is palindrome' },
] as const;

const Wrapper = styled.div`
  padding: 2em;
`;
