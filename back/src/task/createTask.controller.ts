import { Response, Request } from 'express';

const createTaskController = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'coucou' });
};

export default createTaskController;
