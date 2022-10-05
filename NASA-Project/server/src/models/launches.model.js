const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["DaDDy", "NASA"],
  upcoming: true,
  success: true,
};
saveLaunches(launch)

async function getAllLaunches() {
  return await launchesDatabase.find({},{'_id':0,'__v':0});
}

async function getLatestFlightNumber(){
  const latestLaunch = await launchesDatabase
  .findOne().sort('-flightNumber');
  if(!latestLaunch){
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function saveLaunches(launch){
  const planet = await planets.findOne({
    keplerName:launch.target,
  })
  if(!planet){
    throw new Error('No matching planet found!')
  }
  await launchesDatabase.findOneAndUpdate({
    flightNumber:launch.flightNumber,
  },launch,{
    upsert:true,
  })
}

async function scheduleNewLaunch(launch){
  const newFlightNumber = await getLatestFlightNumber() +1;
  const newLaunch = Object.assign(launch,{
    success: true,
    upcoming: true,
    customers: ["DaDDy Chill", "NASA"],
    flightNumber:newFlightNumber,
  });
  await saveLaunches(newLaunch)
}

// function addNewLaunch(launch) {
//   lastestFlightNumber++;
//   launches.set(
//     lastestFlightNumber,
//     Object.assign(launch, {
//       success: true,
//       upcoming: true,
//       customers: ["DaDDy Chill", "NASA"],
//       flightNumber: lastestFlightNumber,
//     })
//   );
// }

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber:launchId,
  });
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne({
    flightNumber:launchId
  },{
    upcoming:false,
    success:false,
  })
  return aborted.matchedCount === 1 && aborted.modifiedCount === 1;
  // await launchesDatabase.findOneAndDelete({flightNumber:launchId})
  // const abroted = launchesDatabase.findOne({flightNumber:launchId});
  // console.log(abroted);
  // abroted.upcoming = false;
  // abroted.success = false;
  // console.log(abroted);
  // return abroted;
}

module.exports = {
  getAllLaunches,
  existsLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
};
