<?php

namespace App\Controllers;

use App\Helper\RunNativeblocks;
use App\Integrations\ButtonBlock;
use App\Integrations\ColumnBlock;
use App\Integrations\OfferListAction;
use App\Integrations\RootBlock;

class PaywallController
{
    private function sendJson($data = [], $status = 200): void
    {
        header("Content-Type: application/json");
        http_response_code($status);
        echo json_encode($data);
    }

    private function getButton()
    {
        $users = UserRepository::getUsers();

        $button = null;
        foreach ($users as $user) {
            $button = new ButtonBlock([
                'key' => 'button',
                'slot' => 'content',
                'visibilityKey' => 'button-visible',
            ]);
            if ($user['id'] % 2) {
                $button->assignData('text', 'yearly_price')
                    ->assignData('enable', 'button_visible')
                    ->addAction('onClick', [
                        (new OfferListAction([
                            'name' => 'offers',
                            'then' => 'NEXT',
                        ]))
                            ->modifyProperty('endpoint', 'https://example.com')
                            ->build(),
                    ]);
            } else {
                $button->assignData('text', 'monthly_price')
                    ->assignData('enable', 'button_visible')
                    ->addAction('onClick', [
                        (new OfferListAction([
                            'name' => 'offers',
                            'then' => 'END',
                        ]))
                            ->modifyProperty('endpoint', 'https://example.com')
                            ->build(),
                    ]);
            }
        }

        if ($button == null) {
            $fallbackButton = new ButtonBlock([
                'key' => 'button',
                'slot' => 'content',
                'visibilityKey' => 'button-visible',
            ]);
            return $fallbackButton->build();
        } else {
            return $button->build();
        }
    }

    public function index(): void
    {
        $features = [
            "Secured 2FA storage",
            "End-to-end encryption",
            "Private Browser",
            "No ads and no limits",
        ];

        $frame = [
            '$schema' => 'https://raw.githubusercontent.com/nativeblocks/nativeblocks-examples/main/api-ts/.nativeblocks/schema.json', // USE YOUR CUSTOM SCHEMA GENERATED BY NATIVEBLOCKS
            'name' => 'PaywallFrame',
            'route' => 'paywall',
            'isStarter' => false,
            'type' => 'FRAME',
            'variables' => array_merge([
                [
                    'key' => 'root_visible',
                    'value' => 'true',
                    'type' => 'BOOLEAN',
                ],
                [
                    'key' => 'main_container_visible',
                    'value' => 'true',
                    'type' => 'BOOLEAN',
                ],
                [
                    'key' => 'features_container_visible',
                    'value' => 'true',
                    'type' => 'BOOLEAN',
                ],
                [
                    'key' => 'check_icon_source',
                    'value' => 'check',
                    'type' => 'STRING',
                ],
                [
                    'key' => 'yearly_price',
                    'value' => 'Yearly: 29.99',
                    'type' => 'STRING',
                ],
                [
                    'key' => 'monthly_price',
                    'value' => 'Monthly: 35.99',
                    'type' => 'STRING',
                ],
                [
                    'key' => 'button_visible',
                    'value' => 'true',
                    'type' => 'BOOLEAN',
                ],
            ],
                array_map(function ($index) {
                    return [
                        'key' => "feature_" . ($index + 1) . "_visible",
                        'value' => 'true',
                        'type' => 'BOOLEAN',
                    ];
                }, array_keys($features)),
                array_map(function ($feature, $index) {
                    return [
                        'key' => "feature_" . ($index + 1) . "_text",
                        'value' => $feature,
                        'type' => 'STRING',
                    ];
                }, $features, array_keys($features))),
            'blocks' => [
                (new RootBlock([
                    'key' => 'root',
                    'visibilityKey' => 'root_visible',
                    'slot' => 'null',
                ]))
                    ->addAction('onAppear', [
                        (new OfferListAction([
                            'name' => 'offers2',
                            'then' => 'END',
                        ]))
                            ->modifyProperty('endpoint', 'https://example2.com')
                            ->build(),
                    ])
                    ->addBlock(
                        (new ColumnBlock([
                            'key' => 'col',
                            'visibilityKey' => 'col-visible',
                            'slot' => 'content',
                        ]))
                            ->modifyProperty('width', 'match', 'match', 'match')
                            ->modifyProperty('height', 'match', 'match', 'match')
                            ->addBlock($this->getButton())
                            ->build()
                    )
                    ->build(),
            ],
        ];

        $result = RunNativeblocks::buildWithNativeblocks($frame);
        $this->sendJson($result);
    }

}