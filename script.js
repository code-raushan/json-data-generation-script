const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

// Generate categories
const categories = [];
const categoryNames = [
    'Programming Languages',
    'Data Structures and Algorithms',
    'Computer Architecture',
    'Operating Systems',
    'Databases',
    'Networking',
    'Artificial Intelligence',
    'Cybersecurity',
    'Software Engineering',
    'Web Development',
    'Mobile App Development',
    'Game Development',
    'Computer Graphics',
    'Parallel Computing',
    'Distributed Systems',
    'Cloud Computing',
    'Internet of Things (IoT)',
    'Virtual Reality (VR)',
    'Augmented Reality (AR)',
    'Blockchain Technology',
    'Quantum Computing',
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Data Mining',
    'Big Data Analytics',
    'Data Visualization',
    'Information Security',
    'Cryptography',
    'Ethical Hacking',
    'Software Testing',
    'Agile Methodologies',
    'DevOps',
    'Containerization and Virtualization',
    'Embedded Systems',
    'Robotics',
    'Human-Computer Interaction (HCI)',
    'User Experience (UX) Design',
    'Computational Biology',
    'Bioinformatics',
    'Computer Forensics',
    'Digital Image Processing',
    'Computer Networks',
    'Wireless Networks',
    'Compiler Design',
    'Automata Theory',
    'Formal Languages',
    'Theory of Computation'
];

for (const name of categoryNames) {
    const category = {
        id: uuidv4(),
        categoryName: name,
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.past().toISOString()
    };
    categories.push(category);
}

// Generate tutorials
const tutorials = [];
for (let i = 0; i < 50; i++) {
    const tutorial = {
        id: uuidv4(),
        tutorialName: faker.random.words(4),
        tutorialDescription: faker.random.words(20),
        categoryId: faker.helpers.arrayElement(categories).id,
        status: faker.helpers.arrayElement(['LISTED', 'DELISTED']),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.past().toISOString()
    };
    tutorials.push(tutorial);
}

// Generate topics
const topics = [];
for (const tutorial of tutorials) {
    const numTopics = faker.datatype.number({ min: 3, max: 8 });
    for (let order = 1; order <= numTopics; order++) {
        const topic = {
            id: uuidv4(),
            topicName: faker.random.words(3),
            tutorialId: tutorial.id,
            topicDescription: faker.random.words(10),
            order,
            createdAt: faker.date.past().toISOString(),
            updatedAt: faker.date.past().toISOString()
        };
        topics.push(topic);
    }
}

// Generate subtopics
const subtopics = [];
for (const topic of topics) {
    const numSubtopics = faker.datatype.number({ min: 2, max: 6 });
    for (let order = 1; order <= numSubtopics; order++) {
        const subtopic = {
            id: uuidv4(),
            subTopicName: faker.random.words(4),
            topicId: topic.id,
            order,
            subTopicDescription: faker.random.words(10),
            writerId: null,
            reviewerId: null,
            writerAssignedAt: null,
            reviewerAssignedAt: null,
            status: 'TO_ASSIGN',
            createdAt: faker.date.past().toISOString(),
            updatedAt: faker.date.past().toISOString()
        };
        subtopics.push(subtopic);
    }
}

// Write data to JSON files
fs.writeFileSync('categories.json', JSON.stringify(categories, null, 2));
fs.writeFileSync('tutorials.json', JSON.stringify(tutorials, null, 2));
fs.writeFileSync('topics.json', JSON.stringify(topics, null, 2));
fs.writeFileSync('subtopics.json', JSON.stringify(subtopics, null, 2));
