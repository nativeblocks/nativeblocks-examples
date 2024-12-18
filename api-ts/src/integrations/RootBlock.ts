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

export class RootBlock {
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
    this.keyType = "ROOT";
    this.key = config.key;
    this.visibilityKey = config.visibilityKey;
    this.slot = config.slot;
    this.actions = [];
    this.blocks = [];
    this.slots = [];
    this.integrationVersion = 4;
    this.properties = [];
    this.data = [];
    this.events = [];
    const initialProperties: IProperty[] = [
      { key: "direction", valueMobile: "LTR", valueTablet: "LTR", valueDesktop: "LTR", type: "STRING" },
      { key: "paddingTop", valueMobile: "8", valueTablet: "8", valueDesktop: "8", type: "INT" },
      { key: "paddingStart", valueMobile: "8", valueTablet: "8", valueDesktop: "8", type: "INT" },
      { key: "paddingEnd", valueMobile: "8", valueTablet: "8", valueDesktop: "8", type: "INT" },
      { key: "paddingBottom", valueMobile: "8", valueTablet: "8", valueDesktop: "8", type: "INT" },
      { key: "background", valueMobile: "#ffffff", valueTablet: "#ffffff", valueDesktop: "#ffffff", type: "STRING" },
      { key: "horizontalAlignment", valueMobile: "top", valueTablet: "top", valueDesktop: "top", type: "STRING" },
      { key: "verticalArrangement", valueMobile: "top", valueTablet: "top", valueDesktop: "top", type: "STRING" },
    ];
    this.properties.push(...initialProperties);
    const initialData: IData[] = [
    ];
    this.data.push(...initialData);
    const initialSlots: ISlot[] = [
      { slot: "content" },
    ];
    this.slots.push(...initialSlots);
    const initialEvents: IEvent[] = [
      { event: "onAppear" },
      { event: "onDisappear" },
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
