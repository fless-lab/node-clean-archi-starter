const { testDatabaseConnection } = require('../../../src/frameworks/database/sequelize/db');

describe('Database Connection', () => {
    test('should establish a database connection', async () => {
        await expect(testDatabaseConnection()).resolves.not.toThrow();
    });
});
