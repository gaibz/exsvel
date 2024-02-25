/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @date 2024-Feb-25
 * @package exsvel
 * @path tests/auth.test.js
 */
const auth = require("../server/drivers/auth");

process.env.APP_JWT_SECRET = "test-secret";

describe("Testing Auth Driver", () => {
    it("should generate token and check if token is valid", async () => {
        let token = await auth.generateToken({id: 1, email: "someone@gmail.com"});
        expect(token).toBeDefined();
        expect(token).not.toBeNull();
        expect(typeof token).toBe("string");

        let decoded = await auth.verifyToken(token);
        expect(decoded).toBeDefined();
        expect(decoded).not.toBeNull();
        expect(decoded && typeof decoded === 'object').toBe(true);

        expect(decoded.id).toBe(1);
        expect(decoded.email).toBe("someone@gmail.com");
    });

    it("should generate auth token", async () => {
        let token = await auth.generateAuthToken({id: 1, email: "someone@gmail.com"});
        expect(token).toBeDefined();
        expect(token).not.toBeNull();
        expect(typeof token).toBe("string");

        let decoded = await auth.verifyAuthToken(token);
        expect(decoded).toBeDefined();
        expect(decoded).not.toBeNull();
        expect(decoded && typeof decoded === 'object').toBe(true);

        expect(decoded.id).toBe(1);
        expect(decoded.email).toBe("someone@gmail.com");


        let decoded2 = await auth.verifyToken(token);
        expect(decoded).toBeDefined();
        expect(decoded).not.toBeNull();
        expect(decoded && typeof decoded === 'object').toBe(true);

        expect(decoded.issuer).not.toBeNull();
    });

});