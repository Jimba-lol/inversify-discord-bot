import { Container, injectable } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';
import { MongoDBClient } from './utils/mongodb/client';
import { RobloxGameService } from './services/roblox-game-service';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

import { SYMBOLS } from '../const/symbols';
import container from '../inversify.config';

@injectable()
export class ExpressServer {
    public containerLoad() {
        let conatiner = new Container();
        if (process.env.NODE_ENV === 'development') {
            let logger = makeLoggerMiddleware();
            container.applyMiddleware(logger);
        }
        container.bind<MongoDBClient>(SYMBOLS.MongoDBClient);
        container.bind<RobloxGameService>(SYMBOLS.RobloxGameService).to(RobloxGameService);
    }

    public serverStart() {
        let server = new InversifyExpressServer(container);
        server.setConfig((app) => {
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());
            app.use(helmet());
        });

        let app = server.build();
        app.listen(3000);
        console.log('Express server started on port 3000');

        exports = module.exports = app;
    }
}