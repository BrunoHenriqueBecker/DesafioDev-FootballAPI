import axios from "axios";

const API_URL = "https://api.football-data.org/v4";
const API_TOKEN = "c710e33b71fe486c949abef77404ed69";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "X-Auth-Token": API_TOKEN },
});

// Função para buscar competições
export const getCompetitions = async () => {
  try {
    const response = await api.get("/competitions");
    return response.data.competitions;
  } catch (error) {
    console.error("Erro ao buscar competições", error);
    return [];
  }
};

// Função para buscar times de uma competição
export const getTeamsByCompetition = async (competitionId) => {
  try {
    const response = await api.get(`/competitions/${competitionId}/teams`);
    return response.data.teams;
  } catch (error) {
    console.error("Erro ao buscar times", error);
    return [];
  }
};
