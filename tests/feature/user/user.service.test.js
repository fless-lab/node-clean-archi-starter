const UserService = require('../../../src/features/user/user.service');
const UserUseCases = require('../../../src/core/use_cases/user.usecases');
const { testDatabaseConnection } = require('../../../src/frameworks/database/sequelize/db');

jest.mock('../../../src/core/use_cases/user.usecases');

describe("UserService Tests", () => {
    let userService;
    let userUseCasesMock;

    beforeAll(async () => {
        await testDatabaseConnection();  // Assurez-vous que cette fonction gère bien les erreurs et lance une exception si la connexion échoue.
    });

    beforeEach(() => {
        jest.clearAllMocks();
        userUseCasesMock = new UserUseCases();
        userService = new UserService(userUseCasesMock);
    });

    afterEach(async () => {
        // Optionnel : ajoutez ici un nettoyage si nécessaire, par exemple, nettoyer une base de données de test ou réinitialiser des mocks/statistiques.
    });

    test('getAllUsers should retrieve all users', async () => {
        const usersMock = [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
            { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' }
        ];
        console.log("use case mock : ",userService, userService.getAllUsers())
        userUseCasesMock.getAllUsers.mockResolvedValue(usersMock);

        const users = await userService.getAllUsers();
        expect(users).toEqual(usersMock);
        expect(userUseCasesMock.getAllUsers).toHaveBeenCalled();
    });

    test('getUserById should retrieve a single user by id', async () => {
        const userMock = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
        userUseCasesMock.getUserById.mockResolvedValue(userMock);

        const user = await userService.getUserById(1);
        expect(user).toEqual(userMock);
        expect(userUseCasesMock.getUserById).toHaveBeenCalledWith(1);
    });

    test('createUser should create a new user', async () => {
        const newUser = { firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', password: 'secure123' };
        const createdUser = { ...newUser, id: 3 };
        userUseCasesMock.createUser.mockResolvedValue(createdUser);

        const result = await userService.createUser(newUser);
        expect(result).toEqual(createdUser);
        expect(userUseCasesMock.createUser).toHaveBeenCalledWith(newUser);
    });

    test('updateUser should update existing user details', async () => {
        const updates = { firstName: 'Alice', lastName: 'Wonderland' };
        const updatedUser = { id: 1, firstName: 'Alice', lastName: 'Wonderland', email: 'john.doe@example.com' };
        userUseCasesMock.updateUser.mockResolvedValue(updatedUser);

        const result = await userService.updateUser(1, updates);
        expect(result).toEqual(updatedUser);
        expect(userUseCasesMock.updateUser).toHaveBeenCalledWith(1, updates);
    });

    test('deleteUser should remove the user', async () => {
        userUseCasesMock.deleteUser.mockResolvedValue(1);

        const result = await userService.deleteUser(1);
        expect(result).toEqual(1);
        expect(userUseCasesMock.deleteUser).toHaveBeenCalledWith(1);
    });

    test('getUserById should handle non-existing user', async () => {
        userUseCasesMock.getUserById.mockResolvedValue(null);
        const user = await userService.getUserById(999);
        expect(user).toBeNull();
        expect(userUseCasesMock.getUserById).toHaveBeenCalledWith(999);
    });

    test('handle errors when user service fails', async () => {
        const error = new Error('Internal Server Error');
        userUseCasesMock.createUser.mockRejectedValue(error);

        await expect(userService.createUser({})).rejects.toThrow('Internal Server Error');
    });
});
