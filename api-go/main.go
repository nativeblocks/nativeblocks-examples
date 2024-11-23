package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func paywallHandler(w http.ResponseWriter, r *http.Request) {
	paywall, err := GetPaywallFrame()
	if err != nil {
		log.Fatal(err)
	}

	jsonBytes, err := json.MarshalIndent(paywall, "", "  ")
	if err != nil {
		log.Fatalf("Failed to marshal result to JSON: %v", err)
	}

	_, _ = fmt.Fprintf(w, string(jsonBytes))
}
func handler(w http.ResponseWriter, r *http.Request) {
	_, _ = fmt.Fprintf(w, "Hello world")
}

func main() {
	http.HandleFunc("/paywall", paywallHandler)
	http.HandleFunc("/", handler)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
