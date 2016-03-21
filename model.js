import jwt from 'jsonwebtoken';

const secret = 'shhh';
const users = [
  {
    id: 123,
    username: 'gob',
    password: 'testpass'
  }
]
const clients = [
  {
    id: 1234,
    secret: 'sekret'
  }
];

export default {
  getAccessToken(bearerToken, callback) {
    // Access token is stored inside the JWT access token.
    const decoded = jwt.verify(bearerToken, secret);
    callback(null, {
      accessToken: bearerToken,
      clientId: decoded.clientId,
      expires: new Date(decoded.exp * 1000),
      userId: decoded.userId
    });
  },

  getClient(clientId, clientSecret, callback) {
    const client = clients.find(client => client.id === Number(clientId));
    // Throw error if there's no client that matches client.id or if the secrets don't match.
    if (!client || client.secret !== clientSecret) {
      return callback(true);
    }
    callback(null, {
      clientId: client.id,
      clientSecret: client.secret
    });
  },

  grantTypeAllowed(clientId, grantType, callback) {
    if (grantType === 'password') {
      return callback(null, true);
    }
    // Throw error if grant type is not allowed for this client.
    callback(true);
  },

  generateToken(type, req, callback) {
    const accessToken = jwt.sign(
      { userId: 1234, clientId: 123 },
      secret,
      { expiresIn: 86400 }
    );
    callback(null, accessToken);
  },

  saveAccessToken(accessToken, clientId, expires, userId, callback) {
    // Since we're using stateless JWTs as access tokens, no need to save them.
    return callback(null);
  },

  getUser(username, password, callback) {
    const user = users.find(user => user.username === username);
    if (!user || user.password !== password) {
      return callback(null);
    }
    callback(null, {
      user
    });
  }

};
