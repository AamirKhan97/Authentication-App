const jwt = require('jsonwebtoken');

// jwt verification

let authenticate = (request, response, next) => {
    if(!request.headers.authorization){
        return response.status(401).send('Unauthorized Request');
    }
    let token = request.headers.authorization.split(' ')[1];
    if(token === null){
        return response.status(401).send('Unauthorized Request');
    }
    let payload = jwt.verify(token,process.env.JWT_SECREAT_KEY);
    if(!payload){
        return response.status(401).send('Unauthorized Request') 
    }
    request.user = payload.user;
    next();
}

module.exports = authenticate;