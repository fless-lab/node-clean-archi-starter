class User {
    constructor({ id, firstName, lastName, email, password }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

module.exports = User;
