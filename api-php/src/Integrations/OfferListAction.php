<?php

// PLEASE DO NOT EDIT THIS FILE, THIS IS GENERATED BY NATIVEBLOCKS

namespace App\Integrations; 

class OfferListAction
{
    private string $keyType;
    private int $integrationVersion;
    private array $properties = [];
    private array $data = [];
    private array $events = [];
    private array $triggers = [];
    private string $name;
    private string $then;

    public function __construct(array $config = [])
    {
        $this->keyType = 'OFFER_LIST';
        $this->integrationVersion = 1;
        $this->name = $config['name'] ?? '';
        $this->then = $config['then'] ?? '';
        $this->triggers = [];
        $initialProperties = [
            ['key' => 'endpoint', 'value' => '', 'type' => 'STRING'],
        ];
        $this->properties = $initialProperties;

        $initialData = [
        ];
        $this->data = $initialData;

        $initialEvents = [
            ['event' => 'END'],
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

    private function isValidTrigger(array $trigger): bool
    {
        return isset($trigger['name']) && isset($trigger['keyType']) && isset($trigger['then']);
    }

    public function addTrigger(array $trigger): self
    {
        if (!$this->isValidEvent($trigger['then'])) {
            throw new \Exception(sprintf('Invalid then: %s', $trigger['then']));
        }
        if (!$this->isValidTrigger($trigger)) {
            throw new \Exception('Invalid trigger: Trigger must be an array with name, keyType, and then');
        }
        array_push($this->triggers, [
            'name' => $trigger['name'],
            'keyType' => $trigger['keyType'],
            'then' => $trigger['then'],
            'properties' => $trigger['properties'] ?? [],
            'data' => $trigger['data'] ?? [],
            'triggers' => $trigger['triggers'] ?? []
        ]);
        return $this;
    }

    public function modifyProperty(string $key, string $value): self
    {
        foreach ($this->properties as &$property) {
            if ($property['key'] === $key) {
                $property['value'] = $value;
                break;
            }
        }
        return $this;
    }

    public function build(): array
    {
        return [
            'keyType' => $this->keyType,
            'name' => $this->name,
            'then' => $this->then,
            'triggers' => $this->triggers,
            'data' => $this->data,
            'properties' => $this->properties,
            'integrationVersion' => $this->integrationVersion,
        ];
    }
}