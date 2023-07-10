module.exports = {
    mode: process.env.NODE_ENV,
    entry: ["./src/index.js"],
    output: {
        library: "VueMqtt",
        libraryTarget: "umd",
        libraryExport: "default",
        filename: "vue-mqtt.js",
        globalObject: "typeof self !== 'undefined' ? self : this"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-transform-classes"
                        ]
                    }
                }
            }
        ]
    }
};