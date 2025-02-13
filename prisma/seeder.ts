// seed.js
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  console.log("🌱 Start seeding...");

  // 1. Create Users
  console.log("👤 Creating Users...");
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password:
          "$2a$12$ZJXKiUxZVmpp/is2EC5yx.vilUBNFbMa0Nrbi1YMf3kvLyxET.bOm",
        profile_picture_url: faker.image.personPortrait({
          sex: "female",
          size: 128,
        }),
      },
    });
    users.push(user);
  }
  console.log(`👤 Created ${users.length} Users.`);

  // 2. Create Items, each owned by a User
  console.log("📦 Creating Items...");
  const items = [];
  for (let i = 0; i < 20; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const item = await prisma.item.create({
      data: {
        name: faker.commerce.productName(),
        rent_price: parseInt(
          faker.commerce.price({ min: 1000000, max: 10000000 })
        ),
        pickup_location: faker.location.city(),
        description: faker.lorem.sentence({ min: 20, max: 75 }),
        condition: faker.helpers.arrayElement([
          "New",
          "Like New",
          "Good",
          "Used",
          "Fair",
        ]),
        category: faker.helpers.arrayElement([
          "Electronics",
          "Clothing",
          "Books",
          "Toys",
          "Music",
          "Sports",
          "Other",
        ]),
        available: faker.datatype.boolean(),
        item_amount: faker.number.int({ min: 1, max: 10 }),
        image_url: faker.image.urlLoremFlickr({ width: 640, height: 480 }),
        owner_id: randomUser.id,
      },
    });
    items.push(item);
  }
  console.log(`📦 Created ${items.length} Items.`);

  // 3. Create Rentals, linking Users and Items
  console.log("🗓️ Creating Rentals...");
  const rentals = [];
  for (let i = 0; i < 30; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    const startDate = faker.date.past();
    const finishedDate = faker.date.future({ refDate: startDate });
    const rentalStatus = faker.helpers.arrayElement([
      "PENDING",
      "CONFIRMED",
      "ONGOING",
      "COMPLETED",
      "CANCELLED",
    ]);

    const rental = await prisma.rental.create({
      data: {
        item_id: randomItem.id,
        user_id: randomUser.id,
        start_date: startDate,
        finished_date: finishedDate,
        status: rentalStatus,
      },
    });
    rentals.push(rental);
  }
  console.log(`🗓️ Created ${rentals.length} Rentals.`);

  // 4. Create Reviews, linking Users and Items
  console.log("⭐ Creating Reviews...");
  const reviews = [];
  for (let i = 0; i < 20; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    const review = await prisma.review.create({
      data: {
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.paragraph(),
        user_id: randomUser.id,
        item_id: randomItem.id,
      },
    });
    reviews.push(review);
  }
  console.log(`⭐ Created ${reviews.length} Reviews.`);

  console.log("✅ Seeding finished.");
}

seed()
  .catch((e) => {
    console.error("🔥 Seeding failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
