package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"time"
)

func BuildWithNativeblocks(frameData interface{}) (map[string]interface{}, error) {
	tempFilePath, err := createTempFile(frameData)
	if err != nil {
		return nil, fmt.Errorf("failed to create temp file: %w", err)
	}
	defer func(name string) {
		err := os.Remove(name)
		if err != nil {
			fmt.Printf("failed to remove temp file %s: %v\n", name, err)
		}
	}(tempFilePath)

	response, err := runNativeblocksCommand(tempFilePath)
	if err != nil {
		return nil, fmt.Errorf("failed to run nativeblocks command: %w", err)
	}

	return response, nil
}

func createTempFile(jsonData interface{}) (string, error) {
	tempDir := os.TempDir()
	tempFilePath := filepath.Join(tempDir, fmt.Sprintf("temp-%d.json", time.Now().UnixNano()))

	jsonBytes, err := json.MarshalIndent(jsonData, "", "  ")
	if err != nil {
		return "", fmt.Errorf("failed to marshal JSON: %w", err)
	}

	if err := os.WriteFile(tempFilePath, jsonBytes, 0644); err != nil {
		return "", fmt.Errorf("failed to write temp file: %w", err)
	}

	return tempFilePath, nil
}

func runNativeblocksCommand(tempFilePath string) (map[string]interface{}, error) {
	cmd := exec.Command("nativeblocks", "frame", "gen", "-p", tempFilePath)

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return nil, fmt.Errorf("failed to create stdout pipe: %w", err)
	}

	stderr, err := cmd.StderrPipe()
	if err != nil {
		return nil, fmt.Errorf("failed to create stderr pipe: %w", err)
	}

	if err := cmd.Start(); err != nil {
		return nil, fmt.Errorf("failed to start command: %w", err)
	}

	outputBytes, err := io.ReadAll(stdout)
	if err != nil {
		return nil, fmt.Errorf("failed to read stdout: %w", err)
	}

	errorBytes, err := io.ReadAll(stderr)
	if err != nil {
		return nil, fmt.Errorf("failed to read stderr: %w", err)
	}

	if err := cmd.Wait(); err != nil {
		if len(errorBytes) > 0 {
			return nil, fmt.Errorf("command failed: %s", string(errorBytes))
		}
		if len(outputBytes) > 0 {
			return nil, fmt.Errorf("command failed with output: %s", string(outputBytes))
		}
		return nil, fmt.Errorf("command failed with no output: %w", err)
	}

	var result map[string]interface{}
	if err := json.Unmarshal(outputBytes, &result); err != nil {
		return nil, fmt.Errorf("failed to parse JSON output: %s", string(outputBytes))
	}

	return result, nil
}
