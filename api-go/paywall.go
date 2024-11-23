package main

import (
	"fmt"
	"github.com/nativeblocks/nativeblocks-example/api-go/integration"
)

type Variable struct {
	Key   string      `json:"key"`
	Value interface{} `json:"value"`
	Type  string      `json:"type"`
}

type Frame struct {
	Schema    string        `json:"$schema"`
	Name      string        `json:"name"`
	Route     string        `json:"route"`
	IsStarter bool          `json:"isStarter"`
	Type      string        `json:"type"`
	Variables []Variable    `json:"variables"`
	Blocks    []interface{} `json:"blocks"`
}

func GetPaywallFrame() (map[string]interface{}, error) {
	features := []string{
		"Secured 2FA storage",
		"End-to-end encryption",
		"Private Browser",
		"No ads and no limits",
	}

	variables := []Variable{
		{Key: "root_visible", Value: "true", Type: "BOOLEAN"},
		{Key: "main_container_visible", Value: "true", Type: "BOOLEAN"},
		{Key: "features_container_visible", Value: "true", Type: "BOOLEAN"},
		{Key: "check_icon_source", Value: "check", Type: "STRING"},
		{Key: "yearly_price", Value: "Yearly: 29.99", Type: "STRING"},
		{Key: "monthly_price", Value: "Monthly: 35.99", Type: "STRING"},
		{Key: "button_visible", Value: "true", Type: "BOOLEAN"},
		{Key: "button_enable", Value: "true", Type: "BOOLEAN"},
	}

	for i := range features {
		variables = append(variables, Variable{
			Key:   fmt.Sprintf("feature_%d_visible", i+1),
			Value: "true",
			Type:  "BOOLEAN",
		})
	}

	for i, feature := range features {
		variables = append(variables, Variable{
			Key:   fmt.Sprintf("feature_%d_text", i+1),
			Value: feature,
			Type:  "STRING",
		})
	}

	root := integration.NewRootBlock("ROOT", "root_visible", "null")
	root.ModifyProperty("width", "match", "match", "match")
	root.ModifyProperty("height", "match", "match", "match")

	button := integration.NewButtonBlock("BUTTON", "button_visible", "content")
	button.ModifyProperty("width", "match", "match", "match")
	button.ModifyProperty("height", "warp", "warp", "warp")
	button.AssignData("text", "yearly_price")
	button.AssignData("enable", "button_enable")

	offerList := integration.NewOfferListAction("offerList", "END")
	offerList.ModifyProperty("endpoint", "http://example.com")
	buttonTriggers := make([]interface{}, 0)
	list := append(buttonTriggers, offerList.Build())
	button.AddAction("onClick", list)

	root.AddBlock(button.Build())

	blocks := make([]interface{}, 0)
	blocks = append(blocks, root.Build())

	frame := &Frame{
		Schema:    "https://raw.githubusercontent.com/nativeblocks/nativeblocks-examples/main/api-ts/.nativeblocks/schema.json",
		Name:      "PaywallFrame",
		Route:     "paywall",
		IsStarter: false,
		Type:      "FRAME",
		Variables: variables,
		Blocks:    blocks,
	}
	return BuildWithNativeblocks(frame)
}
