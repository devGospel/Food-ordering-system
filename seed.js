const { faker} = require('@faker-js/faker')
const MongoClient = require("mongodb").MongoClient;
const _ = require('lodash')

async function main() {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);

    try  {
        await client.connect();

        const productsCollection = client.db("FOOD-ORDERING-DB").collection("products")
        const categoriesCollection = client.db("FOOD-ORDERING-DB").collection("categories")
    
        let categories = ['breakfast', 'lunch', 'dinner', 'drinks'].map((category) => { return { name: category }});
        await categoriesCollection.insertMany(categories)
 
        let imageUrls = [  
            'http://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/FOOD-ORDERING-DB/1_mfgcb5.png',
            'http://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/FOOD-ORDERING-DB/2_afbbos.png',
            'http://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/FOOD-ORDERING-DB/3_lawvqb.png',
        ]

        let products = []
        for (let i = 0; i < 10; i++) {
            let newProduct = {
                name: faker.commerce.productName(),
                adjective: faker.commerce.productAdjective(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                category: _.sample(categories),
                imageUrl: _.sample(imageUrls),

            }
            products.push(newProduct);
        }
        await productsCollection.insertMany(products)
    } catch(e) {
        console.error(e);
    }finally {
        await client.close()
    }

}

main();