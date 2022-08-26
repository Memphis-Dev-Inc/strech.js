import * as broker from "nats";
interface IRetentionTypes {
    MAX_MESSAGE_AGE_SECONDS: string;
    MESSAGES: string;
    BYTES: string;
}
interface IStorageTypes {
    FILE: string;
    MEMORY: string;
}
export declare class Memphis {
    private isConnectionActive;
    connectionId: string;
    accessToken: string;
    host: string;
    managementPort: number;
    private tcpPort;
    private dataPort;
    private username;
    private connectionToken;
    private accessTokenTimeout;
    private pingTimeout;
    private client;
    private reconnectAttempts;
    private reconnect;
    private maxReconnect;
    private reconnectIntervalMs;
    private timeoutMs;
    private natsConnection;
    brokerConnection: any;
    brokerManager: any;
    brokerStats: any;
    retentionTypes: IRetentionTypes;
    storageTypes: IStorageTypes;
    constructor();
    connect({ host, managementPort, tcpPort, dataPort, username, connectionToken, reconnect, maxReconnect, reconnectIntervalMs, timeoutMs, }: {
        host: string;
        managementPort?: number;
        tcpPort?: number;
        dataPort?: number;
        username: string;
        connectionToken: string;
        reconnect?: boolean;
        maxReconnect?: number;
        reconnectIntervalMs?: number;
        timeoutMs?: number;
    }): Promise<void>;
    private _normalizeHost;
    private _keepAcessTokenFresh;
    private _pingServer;
    factory({ name, description, }: {
        name: string;
        description?: string;
    }): Promise<Factory>;
    station({ name, factoryName, retentionType, retentionValue, storageType, replicas, dedupEnabled, dedupWindowMs, }: {
        name: string;
        factoryName: string;
        retentionType?: string;
        retentionValue?: number;
        storageType?: string;
        replicas?: number;
        dedupEnabled?: boolean;
        dedupWindowMs?: number;
    }): Promise<Station>;
    producer({ stationName, producerName, }: {
        stationName: string;
        producerName: string;
    }): Promise<Producer>;
    consumer({ stationName, consumerName, consumerGroup, pullIntervalMs, batchSize, batchMaxTimeToWaitMs, maxAckTimeMs, maxMsgDeliveries, }: {
        stationName: string;
        consumerName: string;
        consumerGroup: string;
        pullIntervalMs?: number;
        batchSize?: number;
        batchMaxTimeToWaitMs?: number;
        maxAckTimeMs?: number;
        maxMsgDeliveries?: number;
    }): Promise<Consumer>;
    private _close;
    close(): void;
}
export declare class Producer {
    private connection;
    private producerName;
    private stationName;
    constructor(connection: Memphis, producerName: string, stationName: string);
    produce({ message, ackWaitSec, }: {
        message: Uint8Array;
        ackWaitSec?: number;
    }): Promise<void>;
    destroy(): Promise<void>;
}
export declare class Consumer {
    private connection;
    private stationName;
    private consumerName;
    private consumerGroup;
    private pullIntervalMs;
    private batchSize;
    private batchMaxTimeToWaitMs;
    private maxAckTimeMs;
    private maxMsgDeliveries;
    private eventEmitter;
    private pullInterval;
    private pingConsumerInvtervalMs;
    private pingConsumerInvterval;
    constructor(connection: Memphis, stationName: string, consumerName: string, consumerGroup: string, pullIntervalMs: number, batchSize: number, batchMaxTimeToWaitMs: number, maxAckTimeMs: number, maxMsgDeliveries: number);
    on(event: String, cb: (...args: any[]) => void): void;
    private _handleAsyncIterableSubscriber;
    private _pingConsumer;
    destroy(): Promise<void>;
}
export declare class Message {
    private message;
    constructor(message: broker.JsMsg);
    ack(): void;
    getData(): Uint8Array;
}
export declare class Factory {
    private connection;
    private name;
    constructor(connection: Memphis, name: string);
    destroy(): Promise<void>;
}
export declare class Station {
    private connection;
    private name;
    constructor(connection: Memphis, name: string);
    destroy(): Promise<void>;
}
export {};
