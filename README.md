# OAuth node reference application
Example of an Application using [node-oauth2-server](https://github.com/oauthjs/node-oauth2-server/tree/v2.2.1) package.

**NOTE:** This is using the 2.4.x version of node-oauth2-server. There is currently a 3.0 version in beta.

All the custom OAuth logic to make node-oauth2-server work is in `model.js`.

## Usage
`npm start` to start server.

You can view the app at `http://localhost:8082`.

The app provides a login form that kicks off a login process in `public/javascripts/scripts.js`. (**Note:** This would NOT normally happen client-side due to security concerns providing client credentials in an insecure browser client. This is provided as a proof-of-concept to see the server-side working ONLY).

You can simulate a successful login by using these credentials:

`username`: gob@example.com

`password`: testpass

There is also a button to kick off a request to a protected resource. This should ONLY work after logging in with the above credentials.

All success and error responses are logged to the console.
