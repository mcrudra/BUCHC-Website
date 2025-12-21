import { Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchPlayers } from "../services/api";

export default function TopPlayers() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const data = await fetchPlayers();
        setPlayers(data);
      } catch (error) {
        console.error("Error loading players:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPlayers();
  }, []);

  const rankStyle = (rank) => {
    if (rank === 1) return "bg-yellow-400 text-white";
    if (rank === 2) return "bg-gray-400 text-white";
    if (rank === 3) return "bg-orange-400 text-white";
    return "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Top Players</h2>
            <p className="text-sm text-gray-500 mt-2">
              Rankings based on Monthly Arena Tournament performance
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
            <p className="text-gray-600">Loading players...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="top-players" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Top Players</h2>
          <p className="text-sm text-gray-500 mt-2">
            Rankings based on Monthly Arena Tournament performance
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-12 bg-blue-600 text-white px-6 py-3 text-xl font-semibold">
            <div className="col-span-2">Rank</div>
            <div className="col-span-7">Player Name</div>
            <div className="col-span-3 text-right">Total Points</div>
          </div>
          {players.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              No players found. Add players from the admin panel.
            </div>
          ) : (
            players.map((player) => (
            <div
              key={player.rank}
              className="grid grid-cols-12 items-center px-6 py-6 border-b border-gray-300 last:border-b-0 hover:bg-gray-50"
            >
              <div className="col-span-2">
                <span
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold ${rankStyle(
                    player.rank
                  )}`}
                >
                  {player.rank}
                </span>
              </div>
              <div className="col-span-7 flex items-center gap-2">
                {player.rank <= 3 && (
                  <Trophy
                    size={14}
                    className={
                      player.rank === 1
                        ? "text-yellow-500"
                        : player.rank === 2
                          ? "text-gray-500"
                          : "text-orange-500"
                    }
                  />
                )}
                <span className="font-medium text-gray-800">{player.name}</span>
              </div>
              <div className="col-span-3 text-right">
                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                  {player.points} pts
                </span>
              </div>
            </div>
            ))
          )}
        </div>
        <p className="text-xs text-center text-gray-400 mt-4">
          Rankings are updated monthly based on tournament performance
        </p>
      </div>
    </section>
  );
}
