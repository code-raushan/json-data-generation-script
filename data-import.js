const fs = require('fs');
const { Pool } = require('pg');

// PostgreSQL connection details
const client = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432, // Default PostgreSQL port
});

// Connect to the PostgreSQL database
// Function to import data from a JSON file into a tableasync function insertData(tableName, jsonFile) {
async function insertData(tableName, jsonFile) {
    const pool = await client.connect();
    try {
        const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

        for (const record of data) {
            const columns = Object.keys(record)
                .map(col => col === 'order' ? `"${col}"` : col)
                .join(', ');
            const values = Object.values(record);
            const valuePlaceholders = values.map((_, index) => `$${index + 1}`).join(', ');

            const query = `INSERT INTO "${tableName}" (${columns}) VALUES (${valuePlaceholders})`;
            await client.query(query, values);
        }

        console.log(`Data inserted into ${tableName} successfully.`);
    } catch (err) {
        console.error(`Error inserting data into ${tableName}:`, err);
    } finally {
        await pool.end()
    }



}

async function main() {
    await insertData('TutorialCategory', './categories.json');
    await insertData('Tutorial', './tutorials.json');
    await insertData('TutorialTopic', './topics.json');
    await insertData('TutorialSubTopic', './subtopics.json');
}
main();