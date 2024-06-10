import {Request, Response} from "express";
import prisma from "../prisma";
import {Channels, publishMessage} from "../utils/redisMessageBroker";

export const getCustomers = async (req: Request, res: Response) => {

    const createdBy = req?.user?.id;

    const customers = await prisma.customer.findMany({
        where: {createdBy: createdBy},
    });

    res.json(customers);
};

export const getCustomer = async (req: Request, res: Response) => {
    const {id} = req.params;
    const customer = await prisma.customer.findUnique({
        where: {
            id: id,
        },
    });

    if (customer){
        res.json(customer);
    }else{
        res.status(404).send("Not Found");
    }
};

export const createCustomer = async (req: Request, res: Response) => {
    const {name, email} = req.body;
    console.log(req?.user?.id);
    await publishMessage(Channels.CreateCustomer, {
        name,
        email,
        createdBy: req?.user?.id,
    });
    res.status(202).json({message: "Creation request received"});
};

export const updateCustomer = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, email} = req.body;
    const createdBy = req?.user?.id;

    await publishMessage(Channels.UpdateCustomer, {id, name, email, createdBy});
    res.status(202).json({message: "Update request received"});
};

export const deleteCustomer = async (req: Request, res: Response) => {
    const {id} = req.params;
    const createdBy = req?.user?.id;
    await publishMessage(Channels.DeleteCustomer, {id, createdBy});
    res.status(202).json({message: "Delete request received"});
};
