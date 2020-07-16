import express from 'express';
import routes from './routes';

import '../typeorm';

const app = express();

app.use(routes);

app.listen(3333, () => {
    console.log('serve on');
});