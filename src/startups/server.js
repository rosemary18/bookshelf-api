const Hapi = require('@hapi/hapi');
const routes = require('../routes')

module.exports = async () => {

    const server = Hapi.server({
      port: 6969,
      host: 'localhost',
      routes: {cors: { origin: ['*'] }},
    });
  
    server.route(routes);
  
    await server.start()
                .then(() => console.log(`[${server.info.uri}]: Server aktif`))
                .catch(err => console.log(err))
};