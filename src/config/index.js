import defaultSettings from './default';

var config = require('./' + (process.env.NODE_ENV || 'development') + '.js').default;

export default Object.assign(defaultSettings, config);
