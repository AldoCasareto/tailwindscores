import Image from 'next/image';
import { convertCompilerOptionsFromJson } from 'typescript';
import Row from './components/Row';

export default async function Page() {
  const response = await fetch(
    'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/66/schedule'
  );
  const data = await response.json();
  const events = data.events.map((event: { competitions: { competitors: any[] }[] }) => {
    const competitors = event.competitions[0].competitors.map((competitor) => {
      return {
        id: competitor.id,
        name: competitor.team.displayName,
        logo: competitor.team.logos[0].href,
        score: competitor.score,
        winner: competitor.winner,
      };
    });
    const favoriteTeam = competitors.find((competitor) => competitor.id === '66');
    const adversaryTeam = competitors.find((competitor) => competitor.id !== '66');
    return {
      date: event.competitions[0].date,
      name: adversaryTeam?.name,
      logo: adversaryTeam?.logo,
      score:
        favoriteTeam?.score &&
        `${adversaryTeam?.score.displayValue}-${favoriteTeam?.score.displayValue}`,
      winner: favoriteTeam?.winner,
    };
  });

  console.log(`competitors = `, events);

  return (
    <>
      {events.map(
        (event: { name: string; logo: string; score: string; win: boolean; date: string }) => (
          <Row
            key={event.name}
            name={event.name}
            logo={event.logo}
            score={event.score}
            win
            date={event.date}
          />
        )
      )}
    </>
  );
}
