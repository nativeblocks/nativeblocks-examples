// PLEASE DO NOT EDIT THIS FILE, THIS IS GENERATED BY NATIVEBLOCKS

package integration

type OfferListActionProperty struct {
	Key   string `json:"key"`
	Value string `json:"value"`
	Type  string `json:"type"`
}

type OfferListActionData struct {
	Key   string `json:"key"`
	Value string `json:"value"`
	Type  string `json:"type"`
}

type OfferListActionTrigger struct {
	Name       string                    `json:"name"`
	KeyType    string                    `json:"keyType"`
	Then       string                    `json:"then"`
	Properties []OfferListActionProperty `json:"properties"`
	Data       []OfferListActionData     `json:"data"`
	Triggers   []OfferListActionTrigger  `json:"triggers"`
}

type OfferListActionEvent struct {
	Event string `json:"event"`
}

type OfferListAction struct {
	keyType            string
	integrationVersion int
	properties         []OfferListActionProperty
	data               []OfferListActionData
	events             []OfferListActionEvent
	triggers           []OfferListActionTrigger
	name               string
	then               string
}

func NewOfferListAction(_name string, _then string) OfferListAction {
	c := OfferListAction{}
	c.keyType = "OFFER_LIST"
	c.name = _name
	c.then = _then
	c.triggers = make([]OfferListActionTrigger, 0)
	initialProperties := []OfferListActionProperty{
		{Key: "endpoint", Value: "", Type: "STRING"},
	}
	c.properties = initialProperties

	initialData := []OfferListActionData{}
	c.data = initialData

	initialEvents := []OfferListActionEvent{
		{Event: "END"},
	}
	c.events = initialEvents

	return c
}

func (c *OfferListAction) isValidEvent(eventName string) bool {
	for _, e := range c.events {
		if e.Event == eventName {
			return true
		}
	}
	return false
}

func (c *OfferListAction) AddTrigger(trigger OfferListActionTrigger) *OfferListAction {
	if !c.isValidEvent(trigger.Then) {
		var eventNames string
		for _, ev := range c.events {
			eventNames += ev.Event
		}
		panic("Invalid then: " + trigger.Then + ". Must be one of: " + eventNames)
	}
	c.triggers = append(c.triggers, trigger)
	return c
}

func (c *OfferListAction) ModifyProperty(key, value string) *OfferListAction {
	for i, p := range c.properties {
		if p.Key == key {
			c.properties[i].Value = value
			break
		}
	}
	return c
}

func (c *OfferListAction) Build() map[string]interface{} {
	result := map[string]interface{}{
		"keyType":            c.keyType,
		"integrationVersion": c.integrationVersion,
		"properties":         c.properties,
		"data":               c.data,
		"name":               c.name,
		"then":               c.then,
		"triggers":           c.triggers,
	}
	return result
}
