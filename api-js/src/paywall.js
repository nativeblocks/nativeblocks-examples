const path = require("path");
const fs = require("fs");
const os = require("os");
const {runNativeblocksCommand} = require("./run-nativeblocks");

const getPaywallFrame = async () => {
  const features = [
    "Secured 2FA storage",
    "End-to-end encryption",
    "Private Browser",
    "No ads and no limits",
  ];

  const baseFrame = {
    $schema: "https://schema-sample.alireza-527.workers.dev/",
    name: "PaywallFrame",
    route: "paywall",
    isStarter: false,
    type: "FRAME",
    variables: [
      {
        key: "root_visible",
        value: "true",
        type: "BOOLEAN",
      },
      {
        key: "main_container_visible",
        value: "true",
        type: "BOOLEAN",
      },
      {
        key: "features_container_visible",
        value: "true",
        type: "BOOLEAN",
      },
      {
        key: "check_icon_source",
        value: "check",
        type: "STRING",
      },
      {
        key: "yearly_price",
        value: `Yearly: 29.99`,
        type: "STRING",
      },
      {
        key: "monthly_price",
        value: `Monthly: 35.99`,
        type: "STRING",
      },
      ...features.map((_, index) => ({
        key: `feature_${index + 1}_visible`,
        value: "true",
        type: "BOOLEAN",
      })),
      ...features.map((feature, index) => ({
        key: `feature_${index + 1}_text`,
        value: feature,
        type: "STRING",
      })),
    ],
    blocks: [
      {
        keyType: "ROOT",
        key: "root",
        visibilityKey: "root_visible",
        slot: "content",
        actions: [],
        data: [],
        properties: [],
        slots: [{slot: "content"}],
        integrationVersion: 1,
        blocks: [
          {
            keyType: "COLUMN",
            key: "main_container",
            visibilityKey: "main_container_visible",
            slot: "content",
            actions: [],
            data: [],
            properties: [],
            slots: [{slot: "content"}],
            integrationVersion: 1,
            blocks: [
              {
                keyType: "COLUMN",
                key: "features_container",
                visibilityKey: "features_container_visible",
                slot: "content",
                actions: [],
                data: [],
                properties: [
                  {
                    key: "width",
                    valueMobile: "match",
                    valueTablet: "match",
                    valueDesktop: "match",
                    type: "STRING",
                  },
                ],
                slots: [
                  {
                    slot: "content",
                  },
                ],
                integrationVersion: 1,
                blocks: features.map((_, index) => ({
                  keyType: "ROW",
                  key: `feature_${index + 1}_row`,
                  visibilityKey: `feature_${index + 1}_visible`,
                  slot: "content",
                  actions: [],
                  data: [],
                  properties: [
                    {
                      key: "width",
                      valueMobile: "match",
                      valueTablet: "match",
                      valueDesktop: "match",
                      type: "STRING",
                    },
                  ],
                  slots: [{slot: "content"}],
                  integrationVersion: 1,
                  blocks: [
                    {
                      keyType: "IMAGE",
                      key: `check_${index + 1}`,
                      visibilityKey: `feature_${index + 1}_visible`,
                      slot: "content",
                      actions: [],
                      data: [
                        {
                          key: "imageUrl",
                          value: "check_icon_source",
                          type: "STRING",
                        },
                      ],
                      properties: [],
                      slots: [],
                      integrationVersion: 1,
                      blocks: [],
                    },
                    {
                      keyType: "TEXT",
                      key: `feature_${index + 1}_text`,
                      visibilityKey: `feature_${index + 1}_visible`,
                      slot: "content",
                      actions: [],
                      data: [
                        {
                          key: "text",
                          value: `feature_${index + 1}_text`,
                          type: "STRING",
                        },
                      ],
                      properties: [
                        {
                          key: "textColor",
                          valueMobile: "#212121",
                          valueTablet: "#212121",
                          valueDesktop: "#212121",
                          type: "STRING",
                        },
                      ],
                      slots: [],
                      integrationVersion: 1,
                      blocks: [],
                    },
                  ],
                })),
              },
              {
                keyType: "ROW",
                key: "pricing_buttons",
                visibilityKey: "main_container_visible",
                slot: "content",
                actions: [],
                data: [],
                properties: [],
                slots: [
                  {
                    slot: "content",
                  },
                ],
                integrationVersion: 1,
                blocks: [
                  {
                    keyType: "BUTTON",
                    key: "yearly_button",
                    visibilityKey: "main_container_visible",
                    slot: "content",
                    actions: [],
                    data: [
                      {
                        key: "text",
                        value: "yearly_price",
                        type: "STRING",
                      },
                      {
                        key: "enable",
                        value: "main_container_visible",
                        type: "BOOLEAN",
                      },
                    ],
                    properties: [],
                    slots: [],
                    integrationVersion: 1,
                    blocks: [],
                  },
                  {
                    keyType: "BUTTON",
                    key: "monthly_button",
                    visibilityKey: "main_container_visible",
                    slot: "content",
                    actions: [],
                    data: [
                      {
                        key: "text",
                        value: "monthly_price",
                        type: "STRING",
                      },
                      {
                        key: "enable",
                        value: "main_container_visible",
                        type: "BOOLEAN",
                      },
                    ],
                    properties: [],
                    slots: [],
                    integrationVersion: 1,
                    blocks: [],
                  },
                ],
              },
            ],
          },
          {
            keyType: "COLUMN",
            key: "additional_container",
            visibilityKey: "main_container_visible",
            slot: "content",
            actions: [],
            data: [],
            properties: [],
            slots: [],
            integrationVersion: 1,
            blocks: [],
          },
        ],
      },
    ],
  };

  const tempFilePath = await createTempFile(baseFrame);
  const response = await runNativeblocksCommand(tempFilePath);
  fs.unlinkSync(tempFilePath);
  return response;
};

async function createTempFile(jsonData) {
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, `temp-${Date.now()}.json`);

  await fs.promises.writeFile(tempFilePath, JSON.stringify(jsonData, null, 2));
  return tempFilePath;
}

module.exports = {getPaywallFrame};
