const bcrypt = require('bcryptjs');
const config = require('../../config'); // Assurez-vous que ce chemin est correct

class PasswordService {
    static async hashPassword(password) {
        const saltRounds = config.saltRounds;
        return bcrypt.hash(password, saltRounds);
    }

    static async comparePassword(plaintextPassword, hashedPassword) {
        return bcrypt.compare(plaintextPassword, hashedPassword);
    }
}

module.exports = PasswordService;
