import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { Drawing } from '../../../common/communication/drawing';
import { DrawingService } from '../services/drawing.service';
import Types from '../types';

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
                this.drawingService.getAllDrawings().then((d: Drawing[]) => {
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

        this.router.post('/',
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                const drawing: Drawing = { name: req.body.name, tags: req.body.tags, drawingObjects: req.body.drawingObjects };
                this.drawingService.setDrawing(drawing).then((m: string) => {
                    console.log(m);
                    res.json(m);
                }).catch((reason: unknown) => {
                    res.json('error');
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
