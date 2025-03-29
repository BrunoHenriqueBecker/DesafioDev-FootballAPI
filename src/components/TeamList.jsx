import { useEffect, useState } from "react";
import { getTeamsByCompetition } from "../services/footballApi";

const TeamList = ({ competitionId, onBack }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (competitionId) {
      const fetchTeams = async () => {
        const data = await getTeamsByCompetition(competitionId);
        setTeams(data);
      };
      fetchTeams();
    }
  }, [competitionId]);

  return (
    <div className="p-4">
      <button onClick={onBack} className="mb-4 p-2 bg-gray-500 text-white rounded">
        Voltar
      </button>
      <h2 className="text-2xl font-bold">Times</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {teams.map((team) => (
          <div key={team.id} className="p-4 bg-green-500 text-white rounded shadow">
            {team.crest ? <img src={team.crest} alt={team.name} className="w-16 h-16 mx-auto" /> : null}
            <p>{team.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
