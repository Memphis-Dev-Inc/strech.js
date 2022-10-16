interface connection {
    host: string;
    port?: number;
    username: string;
    connectionToken: string;
    reconnect?: boolean;
    maxReconnect?: number;
    reconnectIntervalMs?: number;
    timeoutMs?: number;
}

interface consumer {
    consumerName: string;
    consumerGroup: string;
    pullIntervalMs?: number;
    batchSize?: number;
    batchMaxTimeToWaitMs?: number;
    maxAckTimeMs?: number;
    maxMsgDeliveries?: number;
}

export interface ProducerOptions {
    connect: connection;
    producerName: string;

}
export interface ConsumersOptions {
    connect: connection;
    consumer: consumer;
}
