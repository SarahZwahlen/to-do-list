import { Response, Request } from 'express';

const homeController = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Server works' });
};

export default homeController;
