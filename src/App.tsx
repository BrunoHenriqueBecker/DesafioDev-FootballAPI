import { useEffect, useState } from "react";

interface Competition {
  id: string;
  name: string;
  emblem: string;
}

interface Team {
  id: string;
  name: string;
  crest: string; 
}

const API_URL = "/api/competitions"; 
const API_TOKEN = import.meta.env.VITE_API_TOKEN; 


function App() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL, {
      headers: { "X-Auth-Token": API_TOKEN },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.competitions) {
          setCompetitions(data.competitions);
        }
      })
      .catch((error) => console.error("Erro ao buscar competições:", error));
  }, []);

  const fetchTeams = (competitionId: string) => {
    setSelectedCompetition(competitionId); 
    fetch(`${API_URL}/${competitionId}/teams`, {
      headers: { "X-Auth-Token": API_TOKEN },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.teams) {
          setTeams(data.teams);
        }
      })
      .catch((error) => console.error("Erro ao buscar times:", error));
  };

  return (
    <div className="container">
      <h1>Competições de Futebol</h1>
      <ul className="competition-list">
        {competitions.map((comp) => (
          <li key={comp.id} className="competition-item" onClick={() => fetchTeams(comp.id)}>
            {comp.emblem && <img src={comp.emblem} alt={comp.name} width={50} />}
            {comp.name}
          </li>
        ))}
      </ul>

      {selectedCompetition && (
        <div>
          <h2>Times da Competição</h2>
          <ul className="team-list">
            {teams.map((team) => (
              <li key={team.id} className="team-item">
                {team.crest && <img src={team.crest} alt={team.name} width={50} />}
                {team.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
