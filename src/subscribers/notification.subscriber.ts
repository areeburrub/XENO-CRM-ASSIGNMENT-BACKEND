import prisma from "../prisma";
import {Channels, subscribeMessage} from "../utils/redisMessageBroker";

subscribeMessage(Channels.PushNotifications, async (data) => {
    console.log(`Received message from notification channel: ${data.content}`);


    try {
        await prisma.notification.create({
            data: {
                content: data.content,
                userId: data.userId,
            }
        });
    } catch (error) {
        console.error('Error logging notification:', error);
    }
});