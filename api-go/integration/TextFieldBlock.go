// PLEASE DO NOT EDIT THIS FILE, THIS IS GENERATED BY NATIVEBLOCKS

package integration

type TextFieldBlockProperty struct {
	Key          string `json:"key"`
	ValueMobile  string `json:"valueMobile"`
	ValueTablet  string `json:"valueTablet"`
	ValueDesktop string `json:"valueDesktop"`
	Type         string `json:"type"`
}

type TextFieldBlockData struct {
	Key   string `json:"key"`
	Value string `json:"value"`
	Type  string `json:"type"`
}

type TextFieldBlockAction struct {
	Event    string        `json:"event"`
	Triggers []interface{} `json:"triggers"`
}

type TextFieldBlockSlot struct {
	Slot string `json:"slot"`
}

type TextFieldBlockEvent struct {
	Event string `json:"event"`
}

type TextFieldBlock struct {
	keyType            string
	integrationVersion int
	properties         []TextFieldBlockProperty
	data               []TextFieldBlockData
	events             []TextFieldBlockEvent
	actions            []TextFieldBlockAction
	blocks             []interface{}
	slots              []TextFieldBlockSlot
	visibilityKey      string
	slot               string
	key                string
}

func NewTextFieldBlock(_key string, _visibilityKey string, _slot string) TextFieldBlock {
	c := TextFieldBlock{}
	c.keyType = "TEXT_FIELD"
	c.key = _key
	c.visibilityKey = _visibilityKey
	c.slot = _slot
	c.actions = make([]TextFieldBlockAction, 0)
	c.blocks = make([]interface{}, 0)
	initialProperties := []TextFieldBlockProperty{
		{Key: "maxLines", ValueMobile: "100", ValueTablet: "100", ValueDesktop: "100", Type: "INT"},
		{Key: "width", ValueMobile: "wrap", ValueTablet: "wrap", ValueDesktop: "wrap", Type: "STRING"},
		{Key: "height", ValueMobile: "wrap", ValueTablet: "wrap", ValueDesktop: "wrap", Type: "STRING"},
		{Key: "contentColor", ValueMobile: "#FFFFFFFF", ValueTablet: "#FFFFFFFF", ValueDesktop: "#FFFFFFFF", Type: "STRING"},
		{Key: "disabledContentColor", ValueMobile: "#FFFFFFB2", ValueTablet: "#FFFFFFB2", ValueDesktop: "#FFFFFFB2", Type: "STRING"},
		{Key: "backgroundColor", ValueMobile: "#FF212121", ValueTablet: "#FF212121", ValueDesktop: "#FF212121", Type: "STRING"},
		{Key: "disableBackgroundColor", ValueMobile: "#212121B2", ValueTablet: "#212121B2", ValueDesktop: "#212121B2", Type: "STRING"},
		{Key: "borderColor", ValueMobile: "#FF212121", ValueTablet: "#FF212121", ValueDesktop: "#FF212121", Type: "STRING"},
		{Key: "disableBorderColor", ValueMobile: "#212121B2", ValueTablet: "#212121B2", ValueDesktop: "#212121B2", Type: "STRING"},
		{Key: "borderFocusColor", ValueMobile: "#FF212121", ValueTablet: "#FF212121", ValueDesktop: "#FF212121", Type: "STRING"},
		{Key: "shadow", ValueMobile: "1", ValueTablet: "1", ValueDesktop: "1", Type: "INT"},
		{Key: "radiusTopStart", ValueMobile: "4.0", ValueTablet: "4.0", ValueDesktop: "4.0", Type: "DOUBLE"},
		{Key: "radiusTopEnd", ValueMobile: "4.0", ValueTablet: "4.0", ValueDesktop: "4.0", Type: "DOUBLE"},
		{Key: "radiusBottomStart", ValueMobile: "4.0", ValueTablet: "4.0", ValueDesktop: "4.0", Type: "DOUBLE"},
		{Key: "radiusBottomEnd", ValueMobile: "4.0", ValueTablet: "4.0", ValueDesktop: "4.0", Type: "DOUBLE"},
		{Key: "paddingStart", ValueMobile: "4.0", ValueTablet: "4.0", ValueDesktop: "4.0", Type: "DOUBLE"},
		{Key: "paddingTop", ValueMobile: "4.0", ValueTablet: "4.0", ValueDesktop: "4.0", Type: "DOUBLE"},
		{Key: "paddingEnd", ValueMobile: "4.0", ValueTablet: "4.0", ValueDesktop: "4.0", Type: "DOUBLE"},
		{Key: "paddingBottom", ValueMobile: "4.0", ValueTablet: "4.0", ValueDesktop: "4.0", Type: "DOUBLE"},
		{Key: "fontSize", ValueMobile: "14.0", ValueTablet: "14.0", ValueDesktop: "14.0", Type: "DOUBLE"},
		{Key: "fontFamily", ValueMobile: "default", ValueTablet: "default", ValueDesktop: "default", Type: "STRING"},
		{Key: "textAlign", ValueMobile: "start", ValueTablet: "start", ValueDesktop: "start", Type: "STRING"},
		{Key: "fontWeight", ValueMobile: "normal", ValueTablet: "normal", ValueDesktop: "normal", Type: "STRING"},
		{Key: "letterSpacing", ValueMobile: "1.25", ValueTablet: "1.25", ValueDesktop: "1.25", Type: "DOUBLE"},
		{Key: "direction", ValueMobile: "LTR", ValueTablet: "LTR", ValueDesktop: "LTR", Type: "STRING"},
		{Key: "keyboardType", ValueMobile: "normal", ValueTablet: "normal", ValueDesktop: "normal", Type: "STRING"},
	}
	c.properties = initialProperties

	initialData := []TextFieldBlockData{
		{Key: "text", Value: "", Type: "STRING"},
		{Key: "placeholder", Value: "", Type: "STRING"},
		{Key: "label", Value: "", Type: "STRING"},
		{Key: "enable", Value: "", Type: "BOOLEAN"},
		{Key: "readOnly", Value: "", Type: "BOOLEAN"},
	}
	c.data = initialData

	initialSlots := []TextFieldBlockSlot{
		{Slot: "onLeadingIcon"},
		{Slot: "onTrailingIcon"},
	}
	c.slots = initialSlots

	initialEvents := []TextFieldBlockEvent{
		{Event: "onTextChange"},
	}
	c.events = initialEvents

	return c
}

func (c *TextFieldBlock) isValidEvent(eventName string) bool {
	for _, e := range c.events {
		if e.Event == eventName {
			return true
		}
	}
	return false
}

func (c *TextFieldBlock) isValidBlock(block interface{}) bool {
	if block == nil {
		return false
	}
	m, ok := block.(map[string]interface{})
	if !ok {
		return false
	}
	_, hasKey := m["key"]
	_, hasKeyType := m["keyType"]
	return hasKey && hasKeyType
}

func (c *TextFieldBlock) AddAction(event string, triggers []interface{}) *TextFieldBlock {
	if !c.isValidEvent(event) {
		var eventNames string
		for _, ev := range c.events {
			eventNames += ev.Event
		}
		panic("Invalid event: " + event + ". Must be one of: " + eventNames)
	}
	action := TextFieldBlockAction{Event: event, Triggers: triggers}
	c.actions = append(c.actions, action)
	return c
}

func (c *TextFieldBlock) AddBlock(block interface{}) *TextFieldBlock {
	if !c.isValidBlock(block) {
		panic("Invalid block: Block must be a map with at least key and keyType")
	}
	c.blocks = append(c.blocks, block)
	return c
}

func (c *TextFieldBlock) ModifyProperty(key, valueMobile, valueTablet, valueDesktop string) *TextFieldBlock {
	for i, p := range c.properties {
		if p.Key == key {
			c.properties[i].ValueMobile = valueMobile
			c.properties[i].ValueTablet = valueTablet
			c.properties[i].ValueDesktop = valueDesktop
			break
		}
	}
	return c
}

func (c *TextFieldBlock) AssignData(key, value string) *TextFieldBlock {
	for i, d := range c.data {
		if d.Key == key {
			c.data[i].Value = value
			break
		}
	}
	return c
}

func (c *TextFieldBlock) Build() map[string]interface{} {
	result := map[string]interface{}{
		"keyType":            c.keyType,
		"integrationVersion": c.integrationVersion,
		"properties":         c.properties,
		"data":               c.data,
		"key":                c.key,
		"visibilityKey":      c.visibilityKey,
		"slot":               c.slot,
		"slots":              c.slots,
		"actions":            c.actions,
		"blocks":             c.blocks,
	}
	return result
}
