<?php

// PLEASE DO NOT EDIT THIS FILE, THIS IS GENERATED BY NATIVEBLOCKS

namespace App\Integrations; 

class ColumnBlock
{
    private string $keyType;
    private int $integrationVersion;
    private array $properties = [];
    private array $data = [];
    private array $events = [];
    private array $actions = [];
    private array $blocks = [];
    private array $slots = [];
    private string $visibilityKey;
    private string $slot;
    private string $key;

    public function __construct(array $config = [])
    {
        $this->keyType = 'COLUMN';
        $this->integrationVersion = 4;
        $this->key = $config['key'] ?? '';
        $this->visibilityKey = $config['visibilityKey'] ?? '';
        $this->slot = $config['slot'] ?? '';
        $this->actions = [];
        $this->blocks = [];
        $initialProperties = [
            ['key' => 'verticalArrangement', 'valueMobile' => 'top', 'valueTablet' => 'top', 'valueDesktop' => 'top', 'type' => 'STRING'],
            ['key' => 'horizontalAlignment', 'valueMobile' => 'top', 'valueTablet' => 'top', 'valueDesktop' => 'top', 'type' => 'STRING'],
            ['key' => 'width', 'valueMobile' => 'wrap', 'valueTablet' => 'wrap', 'valueDesktop' => 'wrap', 'type' => 'STRING'],
            ['key' => 'height', 'valueMobile' => 'wrap', 'valueTablet' => 'wrap', 'valueDesktop' => 'wrap', 'type' => 'STRING'],
            ['key' => 'paddingStart', 'valueMobile' => '8.0', 'valueTablet' => '8.0', 'valueDesktop' => '8.0', 'type' => 'DOUBLE'],
            ['key' => 'paddingTop', 'valueMobile' => '8.0', 'valueTablet' => '8.0', 'valueDesktop' => '8.0', 'type' => 'DOUBLE'],
            ['key' => 'paddingEnd', 'valueMobile' => '8.0', 'valueTablet' => '8.0', 'valueDesktop' => '8.0', 'type' => 'DOUBLE'],
            ['key' => 'paddingBottom', 'valueMobile' => '8.0', 'valueTablet' => '8.0', 'valueDesktop' => '8.0', 'type' => 'DOUBLE'],
            ['key' => 'background', 'valueMobile' => '#ffffffff', 'valueTablet' => '#ffffffff', 'valueDesktop' => '#ffffffff', 'type' => 'STRING'],
            ['key' => 'direction', 'valueMobile' => 'LTR', 'valueTablet' => 'LTR', 'valueDesktop' => 'LTR', 'type' => 'STRING'],
            ['key' => 'radiusTopStart', 'valueMobile' => '4.0', 'valueTablet' => '4.0', 'valueDesktop' => '4.0', 'type' => 'DOUBLE'],
            ['key' => 'radiusTopEnd', 'valueMobile' => '4.0', 'valueTablet' => '4.0', 'valueDesktop' => '4.0', 'type' => 'DOUBLE'],
            ['key' => 'radiusBottomStart', 'valueMobile' => '4.0', 'valueTablet' => '4.0', 'valueDesktop' => '4.0', 'type' => 'DOUBLE'],
            ['key' => 'radiusBottomEnd', 'valueMobile' => '4.0', 'valueTablet' => '4.0', 'valueDesktop' => '4.0', 'type' => 'DOUBLE'],
        ];
        $this->properties = $initialProperties;

        $initialData = [
        ];
        $this->data = $initialData;

        $initialSlots = [
            ['slot' => 'content'],
        ];
        $this->slots = $initialSlots;

        $initialEvents = [
            ['event' => 'onClick'],
        ];
        $this->events = $initialEvents;
    }

    private function isValidEvent(string $eventName): bool
    {
        foreach ($this->events as $event) {
            if ($event['event'] === $eventName) {
                return true;
            }
        }
        return false;
    }

    private function isValidBlock(array $block): bool
    {
        return isset($block['key']) && isset($block['keyType']);
    }

    public function addAction(string $event, array $triggers): self
    {
        if (!$this->isValidEvent($event)) {
            throw new \Exception(sprintf('Invalid event: %s', $event));
        }
        array_push($this->actions, ['event' => $event, 'triggers' => $triggers]);
        return $this;
    }

    public function addBlock(array $block): self
    {
        if (!$this->isValidBlock($block)) {
            throw new \Exception('Invalid block: Block must be an array with at least key and keyType');
        }
        array_push($this->blocks, $block);
        return $this;
    }

    public function modifyProperty(string $key, string $valueMobile, string $valueTablet, string $valueDesktop): self
    {
        foreach ($this->properties as &$property) {
            if ($property['key'] === $key) {
                $property['valueMobile'] = $valueMobile;
                $property['valueTablet'] = $valueTablet;
                $property['valueDesktop'] = $valueDesktop;
                break;
            }
        }
        return $this;
    }

    public function build(): array
    {
        return [
            'keyType' => $this->keyType,
            'key' => $this->key,
            'visibilityKey' => $this->visibilityKey,
            'slot' => $this->slot,
            'slots' => $this->slots,
            'actions' => $this->actions,
            'blocks' => $this->blocks,
            'data' => $this->data,
            'properties' => $this->properties,
            'integrationVersion' => $this->integrationVersion,
        ];
    }
}
