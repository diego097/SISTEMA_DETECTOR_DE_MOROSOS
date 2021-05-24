const ExampleServiceV1 = require('mysdk/example-service/v1');
const { BearerTokenAuthenticator } = require('mysdk/auth');

const authenticator = new BearerTokenAuthenticator({
    bearerToken: '<access-token>',
});

const myService = new ExampleServiceV1({
    authenticator,
});

// Más adelante, cuando caduque la señal de acceso, la aplicación debe adquirir
// una nueva señal de acceso y, a continuación, establecerla en el autenticador.
// Las invocaciones de solicitud posteriores incluirán la nueva señal de acceso.
authenticator.setBearerToken('<new-access-token>')