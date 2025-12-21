import { Trophy, Medal } from "lucide-react";
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

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="text-yellow-500" size={24} />;
    if (rank === 2) return <Medal className="text-gray-400" size={24} />;
    if (rank === 3) return <Medal className="text-orange-600" size={24} />;
    return null;
  };

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
    return 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div id="top-players" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 text-4xl md:text-5xl mb-4">Top Players</h2>
            <p className="text-gray-600 text-lg">
              Rankings based on Monthly Arena Tournament performance
            </p>
          </div>
          <div className="text-center text-gray-600">Loading players...</div>
        </div>
      </div>
    );
  }

  return (
    <div id="top-players" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 text-4xl md:text-5xl mb-4">Top Players</h2>
          <p className="text-gray-600 text-lg">
            Rankings based on Monthly Arena Tournament performance
          </p>
        </div>

        {/* Ranking Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Table Header - Desktop */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-7">Player Name</div>
            <div className="col-span-3 text-right">Total Points</div>
          </div>

          {/* Table Rows */}
          {players.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              No players found. Add players from the admin panel.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {players.map((player, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 px-8 py-6 hover:bg-blue-50 transition-colors ${player.rank <= 3 ? 'bg-blue-50/50' : ''
                    }`}
                >
                  {/* Rank */}
                  <div className="col-span-1 md:col-span-2 flex items-center justify-center md:justify-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(
                        player.rank
                      )}`}
                    >
                      <span className="text-lg">{player.rank}</span>
                    </div>
                    {getRankIcon(player.rank)}
                  </div>

                  {/* Player Name */}
                  <div className="col-span-1 md:col-span-7 flex items-center justify-center md:justify-start">
                    <span className="text-gray-900 text-lg">{player.name}</span>
                  </div>

                  {/* Points */}
                  <div className="col-span-1 md:col-span-3 flex items-center justify-center md:justify-end">
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
                      <span className="text-lg">{player.points} pts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Note */}
        <div className="mt-8 text-center text-gray-600">
          <p>Rankings are updated monthly based on tournament performance</p>
        </div>
      </div>
    </div>
  );
}
