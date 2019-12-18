module.exports = {
    version: '1.2.0',
    init: function (pluginContext) {
        pluginContext.registerPolicy(require('./code/jwt-custom-code'));
    },
    policies: ['jwt-custom1'], // this is for CLI to automatically add to "policies" whitelist in gateway.config
    options: {  // This is for CLI to ask about params 'eg plugin configure'
        secretKey: {
            type: 'string'
        },
        jwtExtractor: {
            type: 'string'
        },
        messageErr: {
            type: 'string'
        }
    }
};
