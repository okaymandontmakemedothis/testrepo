import { Container } from 'inversify';
import { Application } from './app';
import { DateController } from './controllers/date.controller';
import { DefController } from './controllers/def.controller';
import { DrawingController } from './controllers/drawing.controller';
import { IndexController } from './controllers/index.controller';
import { TagController } from './controllers/tag.controller';
import { Server } from './server';
import { DateService } from './services/date.service';
import { DefService } from './services/def.service';
import { DrawingService } from './services/drawing.service';
import { IndexService } from './services/index.service';
import { MongoDbConnectionService } from './services/mongodb-connection.service';
import { TagService } from './services/tag.service';
import Types from './types';

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);
container.bind(Types.IndexController).to(IndexController);
container.bind(Types.IndexService).to(IndexService);
container.bind(Types.DrawingService).to(DrawingService);
container.bind(Types.TagService).to(TagService);
container.bind(Types.TagController).to(TagController);
container.bind(Types.DrawingController).to(DrawingController);
container.bind(Types.DateController).to(DateController);
container.bind(Types.DateService).to(DateService);
container.bind(Types.DefController).to(DefController);
container.bind(Types.DefService).to(DefService);
container.bind(Types.MongoDbConnectionService).to(MongoDbConnectionService);

export { container };
