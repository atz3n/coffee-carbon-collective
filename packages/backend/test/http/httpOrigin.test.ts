import request from "supertest";
import { initHttpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { config } from "../config";


if (!config.skipTests.includes("httpOrigin")) {
    const server = initHttpServer();


    it("should accept requests from known origins", async () => {
        await request(server)
            .get("/coin-holders")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .expect(200);
    });


    it("should revert requests from unknown origins", async () => {
        await request(server)
            .get("/coin-holders")
            .set("Origin", "http://unknown.domain")
            .expect(401);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}