
import prisma from "../prisma";
import {Channels, subscribeMessage} from "../utils/redisMessageBroker";
import {sendNotification} from "../utils/sendNotification";

interface CustomerData {
    id: string,
    name: string,
    email: string,
    createdBy: string,
    lastVisit: Date,
    createdAt: Date,
    updatedAt: Date
}

const handleMessage = async (data: CustomerData, channel: string ) => {
    try {
        switch (channel) {
            case Channels.CreateCustomer:
                await prisma.customer.create({data});
                console.log(`Customer created:`, data);
                sendNotification(`Customer created: ${JSON.stringify(data)}`, data.createdBy);
                break;
            case Channels.UpdateCustomer:
                await prisma.customer.update({
                    where: {id: data.id, createdBy: data.createdBy},
                    data
                });
                console.log(`Customer updated:`, data);
                sendNotification(`Customer updated: ${JSON.stringify(data)}`, data.createdBy );
                break;
            case Channels.DeleteCustomer:
                await prisma.customer.delete({where: {id: data.id}});
                console.log(`Customer deleted:`, data);
                sendNotification(`Customer deleted: ${JSON.stringify(data)}`, data.createdBy);
                break;
            default:
                console.log(`Unknown channel: ${channel}`);
        }
    } catch (error:any) {
        console.error(`Error handling message on channel ${channel}:`, error);
        sendNotification(`Something went wrong while ${channel}. error:${error.meta.cause}`, data.createdBy);
    }
};

const channels = [Channels.CreateCustomer, Channels.UpdateCustomer, Channels.DeleteCustomer];

channels.forEach((channel) => {
    subscribeMessage(channel, handleMessage)
});