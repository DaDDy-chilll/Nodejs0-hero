const axios = require('axios');
const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
const DEFAULT_FLIGHT_NUMBER = 100;

// const launch = {
//   flightNumber: 100, //exist flight_number
//   mission: "Kepler Exploration X", //exist name
//   rocket: "Explorer IS1", //exist rocket.name
//   launchDate: new Date("December 27, 2030"), //exist date_local
//   target: "Kepler-442 b", //not applicable
//   customers: ["DaDDy", "NASA"], //exist payload.customer for each payload
//   upcoming: true, //exist upcoming
//   success: true, //exist success 
// };
// saveLaunches(launch);


const SPACEX_API = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches(){
    console.log('DownLoad Data... ')
  const response =  await axios.post(SPACEX_API,{
    query:{},
    options:{
        pagination: false,
        populate:[
            {
                path:"rocket",
                select:{
                    name:1
                }
                
            },
            {
                path:"payloads",
                select:{
                customers:1
                }
            }
        ]
    }
});
  if(response.status !== 200){
    console.log('Problem downloading launch data');
    throw new Error('Launch data download fail');
  }
  const launchDocs = response.data.docs;//Nodejs0-hero.daddy-chilll.repl.co
  for (let launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload)=>{
      return payload['customers'];
    })
    const launch = {
          flightNumber: launchDoc['flight_number'],
          mission: launchDoc['name'] ,
          rocket: launchDoc['rocket']['name'],
          launchDate: launchDoc['date_local'],
          target: "Kepler-442 b", //not applicable
          customers,
          upcoming: launchDoc['upcoming'] ,
          success: launchDoc['success'] ,
    }
  console.log(`${launch.flightNumber} && ${launch.mission}`);
     await saveLaunches(launch);
  }
}


async function loadLaunchData(){
 const firstLaunch =  await findLaunch({
    flightNumber:1,
    rocket:'Falcon 1',
    mission:'FalconSat'
  });

  if(firstLaunch){
    console.log('Launch data already loaded!')
  }else{
    await populateLaunches();
  }
}
async function getAllLaunches(skip,limit) {
  return await launchesDatabase
    .find({},{'_id':0,'__v':0})
    .sort({flightNumber:1})
    .skip(skip)
    .limit(limit);
};

async function getLatestFlightNumber(){
  const latestLaunch = await launchesDatabase
  .findOne().sort('-flightNumber');
  if(!latestLaunch){
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
};

async function saveLaunches(launch){
  await launchesDatabase.findOneAndUpdate({
    flightNumber:launch.flightNumber,
  },launch,{
    upsert:true,
  })
};

async function scheduleNewLaunch(launch){
  const planet = await planets.findOne({
    keplerName:launch.target,
  })
  if(!planet){
    throw new Error('No matching planet found!')
  }
  const newFlightNumber = await getLatestFlightNumber() +1;
  const newLaunch = Object.assign(launch,{
    success: true,
    upcoming: true,
    customers: ["DaDDy Chill", "NASA"],
    flightNumber:newFlightNumber,
  });
  await saveLaunches(newLaunch);
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

async function findLaunch(filter){
  return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId) {
  return await findLaunch({
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
};

module.exports = {
  getAllLaunches,
  existsLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
  loadLaunchData,
}
