const launches = new Map();
let lastestFlightNumber = 100;
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["DaDDy", "NASA"],
  upcoming: true,
  success: true,
};
launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  lastestFlightNumber++;
  launches.set(
    lastestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ["DaDDy Chill", "NASA"],
      flightNumber: lastestFlightNumber,
    })
  );
}
module.exports = {
  addNewLaunch,
  getAllLaunches,
};
