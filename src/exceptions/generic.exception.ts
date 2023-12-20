import { Response } from 'express'
import { PresenterFactory } from '../factory/presenter.factory';

class AppError {
	public readonly message: string;

	public readonly statusCode: number;

	constructor(message: string, statusCode: number) {
		this.message = message;
		this.statusCode = statusCode;
	}

	public static handleException(error: any, res: Response) {
		if (error?.response?.data) {
			return res.status(error.statusCode).send(new PresenterFactory(null, false, [error.response?.data]));
		}

		if (error instanceof AppError) {
			return res.status(error.statusCode).send(new PresenterFactory(null, false, [error.message]));
		}

		return res.status(500).send(new PresenterFactory(null, false, [JSON.stringify(error)]));
	}
}

export default AppError;
