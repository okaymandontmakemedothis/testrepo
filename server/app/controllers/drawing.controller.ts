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
                this.drawingService.getAllDrawings().then((drawings: Drawing[]) => {
                    res.json(drawings);
                }).catch(() => {
                    res.sendStatus(500);
                });
            });

        this.router.get('/:drawingName',
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.drawingService.getDrawingByName(req.params.drawingName).then((drawing: Drawing) => {
                    res.json(drawing);
                }).catch(() => {
                    res.sendStatus(500);
                });
            });
        this.router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
            // Send the request to the service and send the response
            this.drawingService.getDrawingById(req.params.id).then((drawing: Drawing) => {
                res.json(drawing);
            }).catch(() => {
                res.sendStatus(500);
            });
        });
        this.router.post('/by-tag',
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                const tags: string[] = req.body.tags;
                this.drawingService.getDrawingsByTags(tags).then((drawings: Drawing[]) => {
                    res.json(drawings);
                }).catch(() => {
                    res.sendStatus(500);
                });
            });

        this.router.post('/',
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.drawingService.setDrawing(req.body).then((drawing: Drawing) => {
                    res.json(drawing);
                }).catch(() => {
                    res.sendStatus(500);
                });

            });

        this.router.delete('/:drawingName',
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.drawingService.deleteDrawing(req.params.drawingName).then((m: string) => {
                    res.json(m);
                }).catch(() => {
                    res.sendStatus(500);
                });
            });
    }
}
