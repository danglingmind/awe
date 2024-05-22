import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function seedTestimonial() {
  const sampleTestimonial = {
    Active: true,
    createdByEmaail: "prateekreddy274@gmail.com",
    Description: "This is a sample description",
    Name: "Sample testimonial hai",
    isForm: false,
    userId: "6631d1c913274cb5bf448027",
    themeId: "6531d1c913274cb5bf448027",
    ImageLink:
      "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  };

  prisma.testimonial
    .create({ data: sampleTestimonial })
    .then(() => console.info("inserted"))
    .catch((e) => console.error("error in seed", e));
}

// seedTestimonial();

function seedTheme() {
  const themes = [
    {
      name: "Mario",
    },
    {
      name: "Batman",
    },
    {
      name: "Naruto",
    },
  ];

  prisma.theme
    .createMany({ data: themes })
    .then(() => console.info("inserted"))
    .catch((e) => console.error("error in seed", e));
}

seedTheme();
