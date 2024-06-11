import { redisClientSubscriber } from "../utils/redisMessageBroker";
import "./customer.subscribers"
import "./notification.subscriber"
import "./orders.subscribers"

redisClientSubscriber.connect()