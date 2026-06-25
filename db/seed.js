import db from "#db/client";
import { faker } from "@faker-js/faker";

import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 0; i < 10; i++) {
    const randomUsername = faker.internet.username();
    const randomPassword = faker.internet.password();
    const user = await createUser(randomUsername, randomPassword);
  }
}
