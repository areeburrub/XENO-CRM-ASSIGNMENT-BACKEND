import {NextFunction, Request, Response} from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        return next();
    }else{
        res.status(401).send('Not Authorised ✋');
    }
}