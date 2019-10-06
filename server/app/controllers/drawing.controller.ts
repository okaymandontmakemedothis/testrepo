import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { Drawing,DrawingPreview } from '../../../common/communication/drawing';
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
                this.drawingService.getAllDrawingsPreviews().then((d: Drawing[]) => {
                    console.log(d);
                    let previews:DrawingPreview[] =[]
                    for (let drawing in d){
                        
                    }
                    const drawingPreview :DrawingPreview={
                        name:d.
                    }
                    previews.push(drawingPreview)
                    res.json(previews);
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
        this.router.post('/by-id',
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response

                this.drawingService.getDrawingsById(req.body.id).then((d: Drawing) => {
                    console.log(d);
                    res.json(d);
                }).catch((reason: unknown) => {
                    res.json('error');
                });
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
                const drawing: Drawing = req.body;
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
