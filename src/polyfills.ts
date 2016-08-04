import 'core-js/es6';
import 'reflect-metadata';
require('zone.js/dist/zone');
require('@mohayonao/web-audio-api-shim');

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
