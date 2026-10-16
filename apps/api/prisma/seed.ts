import prisma from "../src/utils/prisma"

async function seedDB() {
    await prisma.category.create({
        data: {
            name:'food'
        }
    })
}

seedDB()