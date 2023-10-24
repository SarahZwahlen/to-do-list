import { Request, Response } from 'express';

const logOutController = (req: Request, res: Response) => {
    if (req.session.user) {
        req.session.destroy;
        return res.status(200).json({ message: 'User is deconnected' });
    } else {
        return res.status(400).json({ message: 'There is no user logged' });
    }
};

export default logOutController;
