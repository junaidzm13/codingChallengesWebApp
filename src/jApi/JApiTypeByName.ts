import { ChallengeType } from '../coding-challenges/types/ChallengeType';
import { JournalEntryType } from '../journal/Journal';

export type JApiTypeByName = {
  getJournalEntries: {
    input?: undefined;
    output: Array<JournalEntryType>;
  };
  solveCodingChallenge: {
    input: { challengeType: ChallengeType; value: string };
    output: string;
  };
};

export type Data<T extends keyof JApiTypeByName> =
  | JApiTypeByName[T]['output']
  | undefined;
