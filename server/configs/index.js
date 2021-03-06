const fs = require('fs');

let config = {
    app: {
        port: process.env.PORT || 3001,
        routerPrefixApi: '/api'
    },
    mongodb: {
        url: 'mongodb://127.0.0.1:27017/v-k-blog',
        secret: { // 非必须
            user: '',
            pwd: ''
        }
    },
    jwt: {
        secret: 'secrets',
        expiresIn: '1d'
    },
    admin: {
        username: 'admin',
        password: 'admin123',
        name: 'liushang'
    },
    qiniu: {
        ak: 'B8_Iyj7KxEdtQ438vGhM-G_y3L3T6imvnnJC9mgv',
        sk: '3XPRqZnlaBRH44d_XFeWTDO8g-NEBJpxvkHBGc_b',
        bucket: 'dulmcat'
    }
};

// 可以设置私有配置 -->private.js 格式应与上面相同
if (fs.existsSync(__dirname + '/private.js')) {
    config = Object.assign(config, require('./private.js'));
}

module.exports = config;