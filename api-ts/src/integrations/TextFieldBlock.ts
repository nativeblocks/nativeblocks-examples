// PLEASE DO NOT EDIT THIS FILE, THIS IS GENERATED BY NATIVEBLOCKS

interface IProperty {
  key: string;
  valueMobile: string;
  valueTablet: string;
  valueDesktop: string;
  type: string;
}

interface IData {
  key: string;
  value: any;
  type: string;
}

interface IAction {
  event: string;
  triggers: any[];
}

interface ISlot {
  slot: string;
}

interface IEvent {
  event: string;
}

export class TextFieldBlock {
  private readonly keyType: string;
  private readonly integrationVersion: number;
  private properties: IProperty[];
  private data: IData[];
  private readonly events: IEvent[];
  private actions: IAction[];
  private blocks: any[];
  private readonly slots: ISlot[];
  private readonly visibilityKey: string;
  private readonly slot: string;
  private readonly key: string;

  constructor(config: {
    key: string;
    visibilityKey: string;
    slot: string;
  } = {} as any) {
    this.keyType = "TEXT_FIELD";
    this.key = config.key;
    this.visibilityKey = config.visibilityKey;
    this.slot = config.slot;
    this.actions = [];
    this.blocks = [];
    this.slots = [];
    this.integrationVersion = 5;
    this.properties = [];
    this.data = [];
    this.events = [];
    const initialProperties: IProperty[] = [
      { key: "maxLines", valueMobile: "100", valueTablet: "100", valueDesktop: "100", type: "INT" },
      { key: "width", valueMobile: "wrap", valueTablet: "wrap", valueDesktop: "wrap", type: "STRING" },
      { key: "height", valueMobile: "wrap", valueTablet: "wrap", valueDesktop: "wrap", type: "STRING" },
      { key: "contentColor", valueMobile: "#FFFFFFFF", valueTablet: "#FFFFFFFF", valueDesktop: "#FFFFFFFF", type: "STRING" },
      { key: "disabledContentColor", valueMobile: "#FFFFFFB2", valueTablet: "#FFFFFFB2", valueDesktop: "#FFFFFFB2", type: "STRING" },
      { key: "backgroundColor", valueMobile: "#FF212121", valueTablet: "#FF212121", valueDesktop: "#FF212121", type: "STRING" },
      { key: "disableBackgroundColor", valueMobile: "#212121B2", valueTablet: "#212121B2", valueDesktop: "#212121B2", type: "STRING" },
      { key: "borderColor", valueMobile: "#FF212121", valueTablet: "#FF212121", valueDesktop: "#FF212121", type: "STRING" },
      { key: "disableBorderColor", valueMobile: "#212121B2", valueTablet: "#212121B2", valueDesktop: "#212121B2", type: "STRING" },
      { key: "borderFocusColor", valueMobile: "#FF212121", valueTablet: "#FF212121", valueDesktop: "#FF212121", type: "STRING" },
      { key: "shadow", valueMobile: "1", valueTablet: "1", valueDesktop: "1", type: "INT" },
      { key: "radiusTopStart", valueMobile: "4.0", valueTablet: "4.0", valueDesktop: "4.0", type: "DOUBLE" },
      { key: "radiusTopEnd", valueMobile: "4.0", valueTablet: "4.0", valueDesktop: "4.0", type: "DOUBLE" },
      { key: "radiusBottomStart", valueMobile: "4.0", valueTablet: "4.0", valueDesktop: "4.0", type: "DOUBLE" },
      { key: "radiusBottomEnd", valueMobile: "4.0", valueTablet: "4.0", valueDesktop: "4.0", type: "DOUBLE" },
      { key: "paddingStart", valueMobile: "4.0", valueTablet: "4.0", valueDesktop: "4.0", type: "DOUBLE" },
      { key: "paddingTop", valueMobile: "4.0", valueTablet: "4.0", valueDesktop: "4.0", type: "DOUBLE" },
      { key: "paddingEnd", valueMobile: "4.0", valueTablet: "4.0", valueDesktop: "4.0", type: "DOUBLE" },
      { key: "paddingBottom", valueMobile: "4.0", valueTablet: "4.0", valueDesktop: "4.0", type: "DOUBLE" },
      { key: "fontSize", valueMobile: "14.0", valueTablet: "14.0", valueDesktop: "14.0", type: "DOUBLE" },
      { key: "fontFamily", valueMobile: "default", valueTablet: "default", valueDesktop: "default", type: "STRING" },
      { key: "textAlign", valueMobile: "start", valueTablet: "start", valueDesktop: "start", type: "STRING" },
      { key: "fontWeight", valueMobile: "normal", valueTablet: "normal", valueDesktop: "normal", type: "STRING" },
      { key: "letterSpacing", valueMobile: "1.25", valueTablet: "1.25", valueDesktop: "1.25", type: "DOUBLE" },
      { key: "direction", valueMobile: "LTR", valueTablet: "LTR", valueDesktop: "LTR", type: "STRING" },
      { key: "keyboardType", valueMobile: "normal", valueTablet: "normal", valueDesktop: "normal", type: "STRING" },
    ];
    this.properties.push(...initialProperties);
    const initialData: IData[] = [
      { key: "text", value: null, type: "STRING" },
      { key: "placeholder", value: null, type: "STRING" },
      { key: "label", value: null, type: "STRING" },
      { key: "enable", value: null, type: "BOOLEAN" },
      { key: "readOnly", value: null, type: "BOOLEAN" },
    ];
    this.data.push(...initialData);
    const initialSlots: ISlot[] = [
      { slot: "onLeadingIcon" },
      { slot: "onTrailingIcon" },
    ];
    this.slots.push(...initialSlots);
    const initialEvents: IEvent[] = [
      { event: "onTextChange" },
    ];
    this.events.push(...initialEvents);
  }

  private isValidEvent(eventName: string): boolean {
    return this.events.some((e) => e.event === eventName);
  }

  private isValidBlock(block: any): boolean {
    return block &&
           typeof block === "object" &&
           block.key &&
           block.keyType;
  }

  public addAction(event: string, triggers: any[]): this {
    if (!this.isValidEvent(event)) {
      throw new Error(`Invalid event: ${event}. Must be one of: ${this.events.map((e) => e.event).join(", ")}`);
    }
    const action: IAction = { event, triggers };
    this.actions.push(action);
    return this;
  }

  public addBlock(block: any): this {
    if (!this.isValidBlock(block)) {
      throw new Error("Invalid block: Block must be an object with at least key and keyType");
    }
    this.blocks.push(block);
    return this;
  }

  public modifyProperty(key: string, valueMobile: string, valueTablet: string, valueDesktop: string): this {
    const propIndex = this.properties.findIndex((p) => p.key === key);
    if (propIndex !== -1) {
      this.properties[propIndex] = { ...this.properties[propIndex], valueMobile, valueTablet, valueDesktop };
    }
    return this;
  }

  public assignData(key: string, value: any): this {
    const dataIndex = this.data.findIndex((d) => d.key === key);
    if (dataIndex !== -1) {
      this.data[dataIndex] = { ...this.data[dataIndex], value };
    }
    return this;
  }

  public build(): any {
    return {
      keyType: this.keyType,
      key: this.key,
      visibilityKey: this.visibilityKey,
      slot: this.slot,
      slots: this.slots,
      actions: this.actions,
      blocks: this.blocks,
      data: this.data,
      properties: this.properties,
      integrationVersion: this.integrationVersion,
    };
  }
}
