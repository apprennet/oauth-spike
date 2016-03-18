import jwt from 'jsonwebtoken';

const secret = 'shhh';

const users = [
  {
    id: 123,
    username: 'gob@example.com',
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
    const decoded = jwt.verify(bearerToken, secret);

    callback(null, {
      accessToken: bearerToken,
      clientId: decoded.clientId,
      expires: null,
      userId: decoded.userId
    });
  },

  getClient(clientId, clientSecret, callback) {
    const client = clients.find(client => client.id === Number(clientId));

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

    callback(false);
  },

  generateToken(type, req, callback) {
    // TODO: Figure out where these params come from;
    const accessToken = jwt.sign({
      userId: 1234,
      clientId: 123
    }, secret, {
      expiresIn: '60m'
    });

    callback(null, accessToken);
  },

  saveAccessToken(accessToken, clientId, expires, userId, callback) {
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
