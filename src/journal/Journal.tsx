import React from 'react';
import styled from 'styled-components';
import { colors } from '../shared/colors';
import { useJApi } from '../jApi/useJApi';

export type JournalEntryType = {
  id: number;
  content: string;
  title: string;
};

export const Journal: React.FC = () => {
  const { data } = useJApi('getJournalEntries', undefined);

  return (
    <div>
      <h1>{'Journal'}</h1>
      <EntriesWrapper>
        {(data ?? []).map(entry => (
          <JournalEntry {...entry} key={entry.id} />
        ))}
      </EntriesWrapper>
    </div>
  );
};

const EntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const JournalEntry = styled((props: JournalEntryType) => {
  const { title, content, id, ...rest } = props;
  return (
    <div {...rest} title={`${id}`}>
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );
})`
  background-color: ${colors.gray1};
  padding: 1em;
  margin: 0em 5em;
`;
