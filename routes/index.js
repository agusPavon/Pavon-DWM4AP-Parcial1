// const usuarioRouter = require('./UsuarioRouter');
import usuarioRouter from '../routes/UsuarioRouter.js';
import tiendasRouter from '../routes/TiendasRouter.js';
import variedadesRouter from '../routes/VariedadesRouter.js';


const routerAPI = (app) => {
    app.use ('/api/usuarios', usuarioRouter);
    app.use ('/api/tiendas',  tiendasRouter);
    app.use ('/api/variedades', variedadesRouter);

}
export default routerAPI;
// module.exports = routerAPI;