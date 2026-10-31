const path = require('path');
module.exports = {
  output: 'export',
  basePath: '/DigitalPortfolio',
  assetPrefix: '/DigitalPortfolio/',
  trailingSlash: true,
  images: { unoptimized: true },
  sassOptions: { includePaths: [path.join(__dirname, 'styles')] },
};
