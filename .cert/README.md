# SSL Cert for local development

Runing the react app with trusted ssl for development.

Make use off this mkcert.

Documantation and guide at: https://github.com/FiloSottile/mkcert
It's discribed how to use for Mac Os, Windows and Linux.

When the cert and key file are generated and stored in this folder.

add / or create on the root folder .env.developmen.local and add these 2 lines

```Enviorment
SSL_CRT_FILE=./.cert/cert.pem
SSL_KEY_FILE=./.cert/key.pem
```

now run the app either with docker (npm run docker:dev:start) or npm start.

NOTE: Dont use this for production
