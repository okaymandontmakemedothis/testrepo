import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { Drawing } from '../../../common/communication/drawing';
import { DrawingService } from '../services/drawing.service';
import Types from '../types';
import { Message } from '../../../common/communication/message';

@injectable()
export class DrawingController {

    router: Router;

    constructor(@inject(Types.DrawingService) private drawingService: DrawingService) {
        this.configureRouter();
    }

    private configureRouter() {
        this.router = Router();

        this.router.get('/',

            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.drawingService.getAllDrawingsPreviews().then((d: Drawing[]) => {
                    console.log(d);

                    res.json(d);
                }).catch((reason: unknown) => {
                    res.json('error');
                });
            });

        this.router.get('/:drawingName',
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.drawingService.getDrawingByName(req.params.drawingName).then((d: Drawing) => {
                    console.log(d);
                    res.json(d);
                }).catch((reason: unknown) => {
                    res.json('error');
                });
            });
        this.router.post('/by-id', async (req: Request, res: Response, next: NextFunction) => {
            // Send the request to the service and send the response
            res.sendStatus(500);
            try {
                this.drawingService.getDrawingsById(req.body.id).then((d: Drawing) => {
                    res.sendStatus(500);
                }).catch((reason: unknown) => {
                    res.sendStatus(500);
                });
            } catch (error) {
                res.sendStatus(500);
            }
        });
        this.router.post('/by-tag',
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                const tags: string[] = req.body.tags;
                this.drawingService.getDrawingsByTags(tags).then((d: Drawing[]) => {
                    // console.log(d);
                    res.json(d);
                }).catch((reason: unknown) => {
                    res.json('error');
                });
            });

        this.router.post('/',
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.drawingService.setDrawing(req.body).then((message: Message) => {
                    res.json(message);
                }).catch((reason: unknown) => {
                    res.sendStatus(500);
                });

            });

        this.router.delete('/:drawingName',
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.drawingService.deleteDrawing(req.params.drawingName).then((m: string) => {
                    console.log(m);
                    res.json(m);
                }).catch((reason: unknown) => {
                    res.json('error');
                });
            });
    }
}
