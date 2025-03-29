import { useEffect, useState } from "react";
import { getCompetitions } from "../services/footballApi";

const CompetitionList = ({ onSelectCompetition }) => {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      const data = await getCompetitions();
      setCompetitions(data);
    };
    fetchCompetitions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Competições</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {competitions.map((comp) => (
          <button
            key={comp.id}
            onClick={() => onSelectCompetition(comp.id)}
            className="p-4 bg-blue-500 text-white rounded shadow hover:bg-blue-700"
          >
            {comp.emblem ? <img src={comp.emblem} alt={comp.name} className="w-16 h-16 mx-auto" /> : null}
            <p>{comp.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompetitionList;
