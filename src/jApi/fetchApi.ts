import { JApiTypeByName, Data } from './JApiTypeByName';
import axios from 'axios';

export async function fetchResponse<T extends keyof JApiTypeByName>(
  name: T,
  input: JApiTypeByName[T]['input']
): Promise<Data<T>> {
  const props = fetchPropsByName[name](input);
  const url = `http://localhost:8080/${props.url}`;

  if (props.requestType === 'get') {
    const response = await axios.get<Data<T>>(url);
    return response.data;
  } else {
    const response = await axios.post<Data<T>>(url, props.requestBody);
    return response.data;
  }
}

type FetchProps =
  | {
      requestType: 'get';
      url: string;
    }
  | {
      requestType: 'post';
      url: string;
      requestBody: Record<string, any> | Array<any>;
    };

const fetchPropsByName: Record<
  keyof JApiTypeByName,
  (input: any) => FetchProps
> = {
  getJournalEntries: () => ({ requestType: 'get', url: 'journal' }),
  solveCodingChallenge,
};

function solveCodingChallenge(
  input: JApiTypeByName['solveCodingChallenge']['input']
): FetchProps {
  return {
    requestType: 'post',
    url: `coding-challenge/${input.challengeType}`,
    requestBody: input.value,
  };
}
