import { Trophy } from "lucide-react";

export default function TopPlayers() {
  const players = [
    { rank: 1, name: "Ashrafu Islam Emon", points: 2450 },
    { rank: 2, name: "Sumaiya Ahmed", points: 2380 },
    { rank: 3, name: "Tahsin Kabir", points: 2320 },
    { rank: 4, name: "Nabila Rahman", points: 2280 },
    { rank: 5, name: "Faisal Hossain", points: 2240 },
    { rank: 6, name: "Ayesha Siddiqua", points: 2190 },
    { rank: 7, name: "Rayhan Chowdhury", points: 2150 },
    { rank: 8, name: "Bristy Akter", points: 2110 },
    { rank: 9, name: "Imran Khan", points: 2080 },
    { rank: 10, name: "Sadia Karim", points: 2050 },
  ];

  const rankStyle = (rank) => {
    if (rank === 1) return "bg-yellow-400 text-white";
    if (rank === 2) return "bg-gray-400 text-white";
    if (rank === 3) return "bg-orange-400 text-white";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <section className="py-16 bg-gray-50">
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
          {players.map((player) => (
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
          ))}
        </div>
        <p className="text-xs text-center text-gray-400 mt-4">
          Rankings are updated monthly based on tournament performance
        </p>
      </div>
    </section>
  );
}
