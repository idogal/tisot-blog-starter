const { RunMode } = require("./run-modes");

function getRunMode(runModeValue) {

  if (runModeValue === RunMode.Watch.name) {
    return RunMode.Watch;
  }

  if (runModeValue === RunMode.Serve.name || runModeValue === "") {
    return RunMode.Serve;
  }
  
  if (runModeValue === RunMode.Build.name) {
    return RunMode.Build;
  }

  throw new Exception("Unknown run mode  - " + runModeValue);
}



module.exports = {
  customUrlMode: false,
  devMode: getRunMode(process.env.ELEVENTY_RUN_MODE) !== RunMode.Build,
  runMode: getRunMode(process.env.ELEVENTY_RUN_MODE).name,
};
