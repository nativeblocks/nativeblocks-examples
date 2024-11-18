const {spawn} = require("child_process");

function runNativeblocksCommand(tempFilePath) {
  return new Promise((resolve, reject) => {
    const cliCommand = "nativeblocks";
    const args = ["frame", "gen", "-p", tempFilePath];

    const child = spawn(cliCommand, args, {shell: true});
    let outputData = "";

    child.stdout.on("data", (data) => {
      outputData += data;
    });

    child.stderr.on("data", (data) => {
      console.error(`Stderr: ${data}`);
    });

    child.on("close", (code) => {
      console.log(`CLI process exited with code ${code}`);
      if (code === 0) {
        try {
          const jsonData = JSON.parse(outputData);
          resolve(jsonData);
        } catch (error) {
          reject(new Error("Failed to parse JSON output: " + error.message));
        }
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

module.exports = {runNativeblocksCommand};
