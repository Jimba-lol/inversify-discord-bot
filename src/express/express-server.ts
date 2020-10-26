import { injectable } from 'inversify';
import { SYMBOLS } from '../const/symbols';

import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';


@injectable()
export class ExpressServer {
    public containerLoad() {

    }

    public serverStart() {
        // let server = new InversifyExpressServer(container);

    }
}