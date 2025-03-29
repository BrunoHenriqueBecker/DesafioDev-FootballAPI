import { useState } from "react";
import CompetitionList from "./components/CompetitionList";
import TeamList from "./components/TeamList";

function App() {
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Futebol API</h1>
      {!selectedCompetition ? (
        <CompetitionList onSelectCompetition={setSelectedCompetition} />
      ) : (
        <TeamList competitionId={selectedCompetition} onBack={() => setSelectedCompetition(null)} />
      )}
    </div>
  );
}

export default App;
