import { useEffect, useState } from "react";
import "./App.css";

interface Competition {
  id: string;
  name: string;
  emblem: string;
}

interface Team {
  id: string;
  name: string;
  crest: string;
  tla?: string;
}

const API_URL = "/api/competitions";
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

function App() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [teams, setTeams] = useState<{ [key: string]: Team[] }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [expandedLeague, setExpandedLeague] = useState<string | null>(null);

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

  const toggleTeams = (competitionId: string) => {
    if (expandedLeague === competitionId) {
      setExpandedLeague(null);
    } else {
      setExpandedLeague(competitionId);
      
      if (!teams[competitionId]) {
        setLoading(prev => ({ ...prev, [competitionId]: true }));
        
        fetch(`${API_URL}/${competitionId}/teams`, {
          headers: { "X-Auth-Token": API_TOKEN },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.teams) {
              setTeams((prev) => ({ ...prev, [competitionId]: data.teams }));
            }
          })
          .catch((error) => console.error("Erro ao buscar times:", error))
          .finally(() => setLoading(prev => ({ ...prev, [competitionId]: false })));
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Competições de Futebol</h1>
        <p className="subtitle">Explore os principais campeonatos e seus times</p>
      </div>
      
      <ul className="leagues-list">
        {competitions.map((comp) => (
          <li key={comp.id} className="league-item">
            <div 
              className="league-header" 
              onClick={() => toggleTeams(comp.id)}
            >
              {comp.emblem ? (
                <img 
                  src={comp.emblem} 
                  alt={comp.name} 
                  className="league-logo" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50?text=🏆';
                  }}
                />
              ) : (
                <div className="league-logo">🏆</div>
              )}
              <span className="league-name">{comp.name}</span>
            </div>
            
            {expandedLeague === comp.id && (
              <div className="teams-container">
                {loading[comp.id] ? (
                  <div className="loading">Carregando times...</div>
                ) : teams[comp.id] ? (
                  <ul className="teams-list">
                    {teams[comp.id].map((team) => (
                      <li key={team.id} className="team-item">
                        {team.crest ? (
                          <img 
                            src={team.crest} 
                            alt={team.name} 
                            className="team-logo"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/30?text=⚽';
                            }}
                          />
                        ) : (
                          <div className="team-logo">⚽</div>
                        )}
                        <span className="team-name">{team.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-state">Nenhum time encontrado</div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;