import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const validarToken = (req, res, next) => {

  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ msg: 'Falta el token' });
  }

  // ---- VALIDAR FORMATO ----
  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ msg: 'Formato de token inválido' });
  }

  // ---- EXTRAER TOKEN SIN SPLIT ----
  const token = header.slice(7); // corta "Bearer "

  if (!token) {
    return res.status(401).json({ msg: 'Token vacío o inválido' });
  }

  // ---- VERIFICAR TOKEN ----
  jsonwebtoken.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(403).json({ msg: 'Token inválido' });
    }

    req.user = decoded;


    next();
  });
};

export { validarToken };
