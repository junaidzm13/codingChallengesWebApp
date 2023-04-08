import React from 'react';
import styled from 'styled-components';
import { useJApiClient } from '../jApi/useJApi';
import { objectKeys } from '../shared/objectKeys';
import { SelectDropdown } from '../shared/SelectDropdown';
import { TextInput } from '../shared/TextInput';
import { challengeInfoByType, ChallengeType } from './types/ChallengeType';

export const CodingChallenges: React.FC = () => {
  const [result, setResult] = React.useState<string | undefined>(undefined);
  const [inputs, setInputs] = React.useState(
    generateEmptyInputs(ChallengeType.IS_PALINDROME)
  );
  const [challengeType, setChallengeType] = React.useState<ChallengeType>(
    ChallengeType.IS_PALINDROME
  );
  const jApiClient = useJApiClient();

  const onSend = async () => {
    const rest = await jApiClient.resolver('solveCodingChallenge', {
      challengeType,
      value: inputs,
    });
    setResult(rest.data);
  };

  const onChallengeTypeChange = (t: ChallengeType) => {
    setInputs(generateEmptyInputs(t));
    setChallengeType(t);
  };

  return (
    <Wrapper>
      <h1>{'Coding challenges'}</h1>
      <TextInputs state={inputs} setState={setInputs} />
      <SelectDropdown
        onChange={onChallengeTypeChange}
        value={challengeType}
        options={[...options]}
      />
      <button onClick={onSend}>{'Send'}</button>
      <span>{`Result: ${result ?? 'no result'}`}</span>
    </Wrapper>
  );
};

const TextInputs: React.FC<{
  state: Array<string>;
  setState: (state: Array<string>) => void;
}> = props => {
  const { state, setState } = props;

  const onChange = (index: number) => (text: string) => {
    const newState = [...state];
    newState[index] = text;
    setState([...newState]);
  };

  return (
    <>
      {state.map((text, i) => (
        <TextInput
          key={i}
          value={text}
          onChange={onChange(i)}
          placeholder={`Input ${i + 1}`}
        />
      ))}
    </>
  );
};

const options = objectKeys(challengeInfoByType).map(t => ({
  label: challengeInfoByType[t].label,
  value: t,
}));

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 20em;
  padding: 2em;
`;

const generateEmptyInputs = (t: ChallengeType) => {
  return generateStringArray(challengeInfoByType[t].numberOfInputs);
};

const generateStringArray = (size: number): Array<string> => {
  return Array.from(Array(size)).map(_ => '');
};
