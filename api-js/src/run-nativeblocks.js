const {spawn} = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

async function buildWithNativeblocks(frameData) {
  const tempFilePath = await createTempFile(frameData);
  const response = await runNativeblocksCommand(tempFilePath);
  fs.unlinkSync(tempFilePath);
  return response;
}

async function createTempFile(jsonData) {
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, `temp-${Date.now()}.json`);

  await fs.promises.writeFile(tempFilePath, JSON.stringify(jsonData, null, 2));
  return tempFilePath;
}

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
      console.error(`${data}`);
    });

    child.on("close", (code) => {
      console.log(`CLI process exited with code ${code}`);
      if (code === 0) {
        try {
          const jsonData = JSON.parse(outputData);
          resolve(jsonData);
        } catch (error) {
          reject(new Error("Failed to parse JSON output: " + outputData));
        }
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

module.exports = buildWithNativeblocks;
