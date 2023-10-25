import { Request, Response } from 'express';

const isUserLoggedController = (req: Request, res: Response) => {
    const userSession = req.session.user;

    if (userSession) {
        return res.status(200).json({
            message: 'User is loggeg',
            data: {
                isLogged: true,
                user: {
                    firstname: userSession.firstname,
                    surname: userSession.surname,
                    email: userSession.email,
                    id: userSession.id
                }
            }
        });
    } else {
        return res.status(200).json({
            message: 'No user logged',
            data: {
                isLogged: false
            }
        });
    }
};
export default isUserLoggedController;
