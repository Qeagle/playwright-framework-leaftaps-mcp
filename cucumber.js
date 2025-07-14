module.exports = {
  default: [
    '--require-module', 'ts-node/register',
    '--require', 'steps/**/*.ts',
    '--require', 'support/**/*.ts',
    'features/**/*.feature',
    '--publish-quiet'
  ].join(' ')
}