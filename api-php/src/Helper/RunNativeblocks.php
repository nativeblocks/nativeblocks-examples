<?php

namespace App\Helper;

class RunNativeblocks
{

    static function buildWithNativeblocks($frameData)
    {
        $tempFilePath = RunNativeblocks::createTempFile($frameData);
        $response = RunNativeblocks::runNativeblocksCommand($tempFilePath);
        unlink($tempFilePath);
        return $response;
    }

    private static function createTempFile($jsonData): string
    {
        $tempDir = sys_get_temp_dir();
        $tempFilePath = $tempDir . DIRECTORY_SEPARATOR . 'temp-' . time() . '.json';

        file_put_contents($tempFilePath, json_encode($jsonData, JSON_PRETTY_PRINT));
        return $tempFilePath;
    }

    private static function runNativeblocksCommand($tempFilePath)
    {
        $cliCommand = 'nativeblocks';
        $args = ['frame', 'gen', '-p', $tempFilePath];

        $command = escapeshellcmd($cliCommand . ' ' . implode(' ', $args));
        $output = [];
        $returnVar = 0;
        $error = '';

        exec($command, $output, $returnVar);

        if ($returnVar === 0) {
            try {
                $outputData = implode("\n", $output);
                $jsonData = json_decode($outputData, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    return $jsonData;
                } else {
                    throw new Exception('Failed to parse JSON output: ' . $outputData);
                }
            } catch (Exception $e) {
                throw new Exception('Error: ' . $e->getMessage());
            }
        } else {
            $errorData = implode("\n", $output);
            if (!empty($errorData)) {
                throw new Exception($errorData);
            } else {
                throw new Exception("Process exited with code $returnVar but no output.");
            }
        }
    }
}
