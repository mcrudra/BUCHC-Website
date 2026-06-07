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
    if (rank === 1)
      return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    if (rank === 2)
      return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    if (rank === 3)
      return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
    return "bg-white/10 text-slate-200";
  };

  if (loading) {
    return (
      <div id="top-players" className="chess-section py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="chess-section-title text-3xl sm:text-4xl md:text-5xl mb-4">
              Top Players
            </h2>
            <p className="chess-section-subtitle text-base sm:text-lg px-4">
              Rankings based on Monthly Arena Tournament performance
            </p>
          </div>
          <div className="text-center chess-text-muted text-sm sm:text-base">
            Loading players...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="top-players" className="chess-section py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="chess-section-title text-3xl sm:text-4xl md:text-5xl mb-4">
            Top Players
          </h2>
          <p className="chess-section-subtitle text-base sm:text-lg px-4">
            Rankings based on Monthly Arena Tournament performance
          </p>
        </div>

        {/* Ranking Table */}
        <div className="chess-panel rounded-2xl overflow-hidden">
          {/* Table Header - Desktop */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white px-8 py-4 border-b border-white/10">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-7">Player Name</div>
            <div className="col-span-3 text-right">Total Points</div>
          </div>

          {/* Table Rows */}
          {players.length === 0 ? (
            <div className="p-8 text-center chess-text-muted">
              No players found.
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {players.map((player, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 py-4 sm:py-6 hover:bg-white/5 transition-colors ${
                    player.rank <= 3 ? "bg-white/5" : ""
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-1 md:col-span-2 flex items-center justify-center md:justify-center gap-2 sm:gap-3">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(
                        player.rank,
                      )}`}
                    >
                      <span className="text-base sm:text-lg">
                        {player.rank}
                      </span>
                    </div>
                    {getRankIcon(player.rank)}
                  </div>

                  {/* Player Name */}
                  <div className="col-span-1 md:col-span-7 flex items-center justify-center md:justify-start">
                    <span className="text-white text-base sm:text-lg">
                      {player.name}
                    </span>
                  </div>

                  {/* Points */}
                  <div className="col-span-1 md:col-span-3 flex items-center justify-center md:justify-end">
                    <div className="rounded-lg border border-amber-300/20 bg-amber-400/15 px-3 sm:px-4 py-1.5 sm:py-2 text-amber-300">
                      <span className="text-sm sm:text-lg">
                        {player.points} pts
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Note */}
        <div className="mt-6 sm:mt-8 text-center chess-text-muted">
          <p className="text-xs sm:text-sm">
            Rankings are updated monthly based on tournament performance
          </p>
        </div>
      </div>
    </div>
  );
}
