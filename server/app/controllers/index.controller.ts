import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { Message } from '../../../common/communication/message';
import { IndexService } from '../services/index.service';
import Types from '../types';

@injectable()
export class IndexController {

    router: Router;

    constructor(@inject(Types.IndexService) private indexService: IndexService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        this.router.get('/',
            async (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response

                const time: Message = await this.indexService.helloWorld();
                res.json(time);
            });

        this.router.get('/about',
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                res.json(this.indexService.about());

            });

        this.router.get('/text',
            (req: Request, res: Response, next: NextFunction) => {
                // Returns the JSON file for text
                // const obj = this.indexService.getTextRessource();
                res.json(this.indexService.getTextRessource('/../../../../app/res/text/welcome_text2.json'));

            });
    }
}
