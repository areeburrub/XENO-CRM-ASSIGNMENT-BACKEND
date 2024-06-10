
import { createClient } from "redis";

export const redisClientPublisher = createClient();
redisClientPublisher.connect()

export enum Channels {
    CreateCustomer = "createCustomer",
    UpdateCustomer = "updateCustomer",
    DeleteCustomer = "deleteCustomer",
    PushNotifications = "pushNotifications",
}

export const publishMessage = async (channel: Channels, data: any) => {
    console.log("Publish message",channel,data);
    await redisClientPublisher.publish(channel, JSON.stringify(data));
};

export const redisClientSubscriber = createClient();

export const subscribeMessage = async (channel: Channels, handler: (data: any, channel: string )=>void) => {
    console.log("Subscribe message",channel);
    redisClientSubscriber.subscribe(channel, (message) => {
        console.log(`Received message from ${channel}`);
        const msgData = JSON.parse(message);
        handler(msgData, channel);
    });
}