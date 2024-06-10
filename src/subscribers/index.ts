import { redisClientSubscriber } from "../utils/redisMessageBroker";
import "./customer.subscribers"
import "./notification.subscriber"

redisClientSubscriber.connect()