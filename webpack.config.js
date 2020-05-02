const path = require("path");

module.exports = {
    mode: 'development',
    entry: "./intermediates/components/index.js",
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'blox.js',
        sourceMapFilename: "blox.js.map"
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ],
    },
};