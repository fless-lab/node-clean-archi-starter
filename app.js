const { testDatabaseConnection } = require('./src/frameworks/database/sequelize/db');
const config = require('./src/config');

testDatabaseConnection().then(() => {
    const app = require('./src/frameworks/webserver/express');
    app.listen(config.port, () => {
        console.log(`Server running on http://localhost:${config.port}`);
    });
});

