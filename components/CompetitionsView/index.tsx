import { useContestInfo } from 'hooks/useContestInfo';
import { getMedal, guessCompetitionName } from 'utils/utils';

import { AuditorLink } from 'components/AuditorLink';

import { CompetitionsContainer, CompetitionsList } from './styled';

export const CompetitionsView = () => {
  const { data } = useContestInfo();
  return (
    <CompetitionsContainer>
      <p>Contests</p>
      <CompetitionsList>
        <div>
          {data?.competitionResults?.reverse().map((x, i) => (
            <div key={i}>
              {x.id} {guessCompetitionName(x.id)}{' '}
              <div>
                {x.top
                  // .sort((a, b) => b.amount - a.amount)
                  .slice(0, 3)
                  .map((u, place) => (
                    <div key={place}>
                      {getMedal(place)}{' '}
                      <AuditorLink address={u.address}></AuditorLink> –{' '}
                      {u.amount.toLocaleString()}{' '}
                    </div>
                  ))}
              </div>
              <br />
            </div>
          ))}
        </div>
      </CompetitionsList>
    </CompetitionsContainer>
  );
};
