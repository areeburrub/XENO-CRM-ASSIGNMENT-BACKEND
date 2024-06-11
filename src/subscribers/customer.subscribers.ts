
import prisma from "../prisma";
import {Channels, subscribeMessage} from "../utils/redisMessageBroker";
import {sendNotification} from "../utils/sendNotification";
import {Customer} from "@prisma/client"

const handleMessage = async (data: Customer, channel: string ) => {
    try {
        switch (channel) {
            case Channels.CreateCustomer:
                const createdCustomer = await prisma.customer.create({data});
                console.log(`Customer created:`, data);
                sendNotification(`${createdCustomer.name} is added as customer`, createdCustomer.createdBy);
                break;
            case Channels.UpdateCustomer:
                const updateCustomer = await prisma.customer.update({
                    where: {id: data.id, createdBy: data.createdBy},
                    data
                });
                console.log(`Customer updated:`, data);
                sendNotification(`${updateCustomer.name} data is updated`, updateCustomer.createdBy );
                break;
            case Channels.DeleteCustomer:
                const deletedCustomer =await prisma.customer.delete({where: {id: data.id}});
                console.log(`Customer deleted:`, data);
                sendNotification(`${deletedCustomer.name} is deleted from customer`, deletedCustomer.createdBy);
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