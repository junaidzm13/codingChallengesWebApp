export enum ChallengeType {
  LENGTH_OF_LAST_WORD = 'LENGTH_OF_LAST_WORD',
  IS_PALINDROME = 'IS_PALINDROME',
  REMOVE_ELEMENT = 'REMOVE_ELEMENT',
}

type ChallengeInfo = {
  label: string;
  numberOfInputs: number;
};

export const challengeInfoByType: Record<ChallengeType, ChallengeInfo> = {
  [ChallengeType.LENGTH_OF_LAST_WORD]: {
    label: 'length of last word',
    numberOfInputs: 1,
  },
  [ChallengeType.IS_PALINDROME]: {
    label: 'is palindrome',
    numberOfInputs: 1,
  },
  [ChallengeType.REMOVE_ELEMENT]: {
    label: 'remove element',
    numberOfInputs: 2,
  },
};
