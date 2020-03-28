const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;

export function createRegister() {
  const register = new Registry();

  collectDefaultMetrics({ register });

  return register;
}