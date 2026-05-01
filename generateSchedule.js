const fs = require('fs');
const path = require('path');

// Dummy talk data
const talks = [
    {
        id: 'talk1',
        title: 'Introduction to Generative AI',
        speakers: ['Dr. Anya Sharma'],
        categories: ['AI', 'Machine Learning'],
        duration: 60,
        description: 'An overview of the latest advancements in generative artificial intelligence and its applications.'
    },
    {
        id: 'talk2',
        title: 'Building Scalable Microservices with Node.js',
        speakers: ['John Doe', 'Jane Smith'],
        categories: ['Backend', 'Node.js', 'Architecture'],
        duration: 60,
        description: 'Learn best practices for designing and deploying scalable microservices using Node.js.'
    },
    {
        id: 'talk3',
        title: 'Frontend Frameworks: A Comparative Analysis',
        speakers: ['Alice Johnson'],
        categories: ['Frontend', 'JavaScript'],
        duration: 60,
        description: 'A deep dive into popular frontend frameworks like React, Angular, and Vue.js, discussing their strengths and weaknesses.'
    },
    {
        id: 'talk4',
        title: 'Cloud Native Development with Kubernetes',
        speakers: ['Bob Williams'],
        categories: ['DevOps', 'Cloud', 'Kubernetes'],
        duration: 60,
        description: 'Explore how to build and deploy cloud-native applications using Kubernetes for orchestration.'
    },
    {
        id: 'talk5',
        title: 'Data Security in the Age of AI',
        speakers: ['Dr. Emily Chen'],
        categories: ['Security', 'AI', 'Ethics'],
        duration: 60,
        description: 'Understanding the challenges and solutions for maintaining data security and privacy in AI-driven systems.'
    },
    {
        id: 'talk6',
        title: 'The Future of Web Assembly',
        speakers: ['Michael Brown'],
        categories: ['Web', 'Performance'],
        duration: 60,
        description: 'A look into the evolving landscape of Web Assembly and its potential to revolutionize web development.'
    }
];

const eventStartTime = new Date();
eventStartTime.setHours(10, 0, 0, 0); // Set event start to 10:00 AM today

const schedule = [];
let currentTime = eventStartTime;
const transitionTime = 10; // minutes
const lunchDuration = 60; // minutes
const lunchBreakAfterTalk = 3;

for (let i = 0; i < talks.length; i++) {
    // Add lunch break
    if (i === lunchBreakAfterTalk) {
        const lunchStartTime = new Date(currentTime);
        const lunchEndTime = new Date(currentTime.getTime() + lunchDuration * 60 * 1000);
        schedule.push({
            id: 'lunch',
            title: 'Lunch Break',
            startTime: lunchStartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            endTime: lunchEndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            isBreak: true
        });
        currentTime = lunchEndTime;
    }

    const talk = talks[i];
    const talkStartTime = new Date(currentTime);
    const talkEndTime = new Date(currentTime.getTime() + talk.duration * 60 * 1000);

    schedule.push({
        ...talk,
        startTime: talkStartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        endTime: talkEndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    });

    currentTime = talkEndTime;

    // Add transition time if not the last talk
    if (i < talks.length - 1 || (i === talks.length -1 && lunchBreakAfterTalk === talks.length)) {
        currentTime = new Date(currentTime.getTime() + transitionTime * 60 * 1000);
    }
}

const outputPath = path.join(__dirname, 'schedule.json');
fs.writeFileSync(outputPath, JSON.stringify(schedule, null, 4));

console.log(`Schedule generated and saved to ${outputPath}`);
