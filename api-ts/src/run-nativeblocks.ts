import {spawn} from "child_process"
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

async function buildWithNativeblocks(frameData: any) {
  const tempFilePath = await createTempFile(frameData);
  const response = await runNativeblocksCommand(tempFilePath);
  fs.unlinkSync(tempFilePath);
  return response;
}

async function createTempFile(jsonData: any) {
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, `temp-${Date.now()}.json`);

  await fs.promises.writeFile(tempFilePath, JSON.stringify(jsonData, null, 2));
  return tempFilePath;
}

function runNativeblocksCommand(tempFilePath: string) {
  return new Promise((resolve, reject) => {
    const cliCommand = "nativeblocks";
    const args = ["frame", "gen", "-p", tempFilePath];

    const child = spawn(cliCommand, args, {shell: true});
    let outputData = "";
    let errorData = "";

    child.stdout.on("data", (data) => {
      outputData += data;
    });

    child.stderr.on("data", (data) => {
      errorData += data;
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
        if (errorData.trim()) {
          reject(new Error(errorData.trim()));
        } else if (outputData.trim()) {
          reject(new Error(outputData.trim()));
        } else {
          reject(new Error(`Process exited with code ${code} but no output.`));
        }
      }
    });
  });
}

export default buildWithNativeblocks;
