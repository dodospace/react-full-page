var config = require('./webpack.config.js');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

config.entry.unshift('webpack-dev-server/client?http://10.1.240.18:2008');

new webpackDevServer(webpack(config), {
    contentBase: __dirname + '/',
    progress: true,
    inline: true,
    historyApiFallback: true,
    stats: {
        assets: true,
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
        source: true,
        children: true
    }
}).listen(2008, '10.1.240.18', function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:' + 2008);
});