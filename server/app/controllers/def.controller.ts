import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { ApiDef } from '../../../common/communication/api-def';
import { DefService } from '../services/def.service';
import Types from '../types';

@injectable()
export class DefController {

    router: Router;

    constructor(@inject(Types.DefService) private defService: DefService) {
        this.configureRouter();
    }

    private configureRouter() {
        this.router = Router();

        // Retourne le fichier de definition de l'api
        this.router.get('/',
            (req: Request, res: Response, next: NextFunction) => {
                this.defService.getDef().then((api: ApiDef) => {
                    res.json(api);
                }).catch((reason: unknown) => {
                    res.sendStatus(500);
                });
            });
    }
}
