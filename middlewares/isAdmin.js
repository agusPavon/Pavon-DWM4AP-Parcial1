const isAdmin = ( req, res, next) => {
    if( req.user?.rol !== 'admin' ){
        return res.status(403).json({'msg': 'No tenés permisos para realizar esta acción'});
    }

    next();
}

export default isAdmin;