const admin = require("firebase-admin");

const googleKey = {
  "type": process.env.G_TYPE,
  "project_id": process.env.G_PROJECT_ID,
  "private_key_id": process.env.G_KEY_ID,
  "private_key": process.env.G_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.G_CLIENT_EMAIL,
  "client_id": process.env.G_CLIENT_ID,
  "auth_uri": process.env.G_AUTH_URI,
  "token_uri": process.env.G_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.G_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.G_CLIENT_X509_CERT_URL
}

admin.initializeApp({
  credential: admin.credential.cert(googleKey),
  databaseURL: 'https://inova-c70f5.firebaseio.com'
});

module.exports = (req, res, next) => {

  const getAuthToken = (req, res, next) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      req.authToken = req.headers.authorization.split(' ')[1];
    } else {
      req.authToken = null;
    }
    next();
  };

  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;

      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'Não autorizado.' });
    }
  });
}