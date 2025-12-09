// // ==================== server.js (ฉบับแก้ไขให้รองรับ Frontend v10.1) ====================

// // ✅ รองรับทุกเวอร์ชันของ Node.js (16, 18, 20)
// // ==================== Safe Fetch for Node (แก้แบบไม่ล่มแน่นอน) ====================
// let fetchFn;

// try {
//  fetchFn = global.fetch;
// } catch (e) {
//  fetchFn = undefined;
// }

// if (!fetchFn) {
//  console.log('... กำลังใช้ node-fetch (สำหรับ Node < 18)');
//  fetchFn = (...args) =>
//  import("node-fetch").then(({ default: fetch }) => fetch(...args));
// } else {
//  console.log('... กำลังใช้ global.fetch (สำหรับ Node >= 18)');
// }


// const express = require('express');
// const cors = require('cors');
// const fs = require('fs').promises;

// const app = express();
// const port = 3401;

// // Middleware
// app.use(cors()); // [✅] อนุญาตให้ Frontend (ทุกพอร์ต) เรียกเข้ามาได้
// app.use(express.json());

// // ==================== โหลดข้อมูลจากไฟล์ (เหมือนเดิม) ====================
// let collegeData = "";

// // ฟังก์ชันค้นหาข้อความที่เกี่ยวข้อง (เหมือนเดิม)
// function findRelevantContext(query, data) {
// const queryWords = query.split(' ').filter(w => w.length > 1);
// if (queryWords.length === 0) {
// return data;
// }
// const sentences = data.split('\n').filter(line => line.trim() !== '');
// const relevantSentences = sentences.filter(sentence =>
//  queryWords.some(word => sentence.includes(word))
// );
// return relevantSentences.length > 0 ? relevantSentences.join('\n') : data;
// }

// // ==================== API หลัก (แก้ไขชื่อตัวแปร) ====================
// app.post('/api/chat', async (req, res) => {
// try {
//  // [ 🔄 แก้ไข ] เปลี่ยน "message" เป็น "prompt" เพื่อรับค่าจาก Frontend v10.1
// const { prompt } = req.body; 

//  // [ 🔄 แก้ไข ]
// if (!prompt) {
// return res.status(400).json({ error: 'ไม่พบข้อความ (prompt) จากผู้ใช้' });
// }

//  // [ 🔄 แก้ไข ]
// // 🔹 ดึงข้อมูลที่เกี่ยวข้องจาก data.txt
// const context = findRelevantContext(prompt, collegeData);

// // 🔹 รวม prompt สำหรับส่งให้ Ollama (เหมือนเดิม)
// const finalPrompt = `
// คุณคือผู้ช่วย AI ของ "วิทยาลัยเทคนิคชัยภูมิ (CTC)" 
// จงใช้เฉพาะ "ข้อมูล" ด้านล่างนี้เพื่อตอบคำถามอย่างสุภาพ และห้ามตอบสิ่งที่ไม่มีอยู่ในข้อมูล

// ข้อมูล:
// ${context}

// คำถาม:
// ${prompt} // [ 🔄 แก้ไข ]

// คำตอบ:
// `;

// // 🔹 เตรียม payload สำหรับ Ollama (เหมือนเดิม)
// const ollamaPayload = {
// model: "chaloemphong/CTC_IT:latest",
// prompt: finalPrompt,
// stream: false,
// options: {
// temperature: 0.3
// }
// };

// // [ 🔄✅ แก้ไขจุดสำคัญ ]
// // เรียกใช้ `fetchFn` ที่เราสร้างไว้ (ซึ่งรองรับทุกเวอร์ชัน)
// // แทนการเรียก `fetch` โดยตรง
// const ollamaResponse = await fetchFn('http://localhost:11432/api/generate', {
// method: 'POST',
// headers: {
// 'Content-Type': 'application/json',
// },
// body: JSON.stringify(ollamaPayload),
// });

// if (!ollamaResponse.ok) {
// const errorText = await ollamaResponse.text();
// console.error("❌ Error from Ollama:", errorText);
// return res.status(500).json({ error: 'ไม่สามารถรับการตอบกลับจาก Ollama ได้' });
// }

// const ollamaResult = await ollamaResponse.json();


// res.json({ response: ollamaResult.response });

// } catch (error) {
// console.error('❌ เกิดข้อผิดพลาดใน /api/chat:', error);
// res.status(500).json({ error: 'ไม่สามารถประมวลผลคำขอได้' });  }
// });


// async function startServer() {
// try {
// collegeData = await fs.readFile('data.txt', 'utf8');
// console.log('✅ โหลดข้อมูลจาก data.txt สำเร็จ');
// app.listen(port, () => {
// console.log(`🚀 Backend server ทำงานที่ http://localhost:${port}`);
// console.log('🧠 ระบบ RAG พร้อมใช้งานกับ Ollama (11432)');
// });
// } catch (error) {
// console.error('❌ ผิดพลาด: ไม่พบไฟล์ data.txt กรุณาเพิ่มไฟล์นี้ในโฟลเดอร์ backend');
// process.exit(1);
// }
// }

// startServer();



// ... (ส่วน Safe Fetch for Node) ...
// let fetchFn; 
// // ... (โค้ด Safe Fetch for Node ที่ประกาศไว้ด้านบนสุด) ...
// try {
//  fetchFn = global.fetch;
// } catch (e) {
//  fetchFn = undefined;
// }

// if (!fetchFn) {
//  console.log('... กำลังใช้ node-fetch (สำหรับ Node < 18)');
//  fetchFn = (...args) =>
//  import("node-fetch").then(({ default: fetch }) => fetch(...args));
// } else {
//  console.log('... กำลังใช้ global.fetch (สำหรับ Node >= 18)');
// }
// // ===================================================================================


// const express = require('express');
// const cors = require('cors');
// const fs = require('fs').promises;
// const mysql = require('mysql2/promise'); // ฐานข้อมูล MySQL

// const app = express();
// const port = 3401; 

// // Middleware
// app.use(cors()); 
// app.use(express.json());

// // ==================== ตั้งค่าและเชื่อมต่อ MySQL ====================
// const dbConfig = {
//     host: 'localhost', 
//     user: 'ctc_user', 
//     password: 'ctc_user_password', 
//     database: 'ctc_chat_db', 
//     port: 3306
// };

// let dbConnection; 

// async function connectToDatabase() {
//     try {
//         dbConnection = await mysql.createConnection(dbConfig);
//         console.log('✅ เชื่อมต่อ MySQL (Docker) สำเร็จ');
//     } catch (error) {
//         console.error('❌ ผิดพลาดในการเชื่อมต่อ MySQL:', error);
//         console.error('⚠️ ตรวจสอบว่า Docker Container "ctc_mysql_db" รันอยู่หรือไม่ และค่าใน dbConfig ถูกต้อง');
//         process.exit(1);
//     }
// }

// async function setupDatabase() {
//     const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS chats (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             user_prompt TEXT NOT NULL,
//             ai_response TEXT NOT NULL,
//             timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
//         )
//     `;
//     await dbConnection.execute(createTableQuery);
//     console.log('✅ ตาราง chats ใน ctc_chat_db พร้อมใช้งาน');
// }

// // [ 🆕 ฟังก์ชัน ] ดึงคำตอบจาก Cache (สำหรับขั้นตอนที่ 1)
// async function getChatCache(userPrompt) {
//     // ดึงคำตอบที่ตรงกับ prompt เป๊ะๆ (Exact Match)
//     const selectQuery = "SELECT ai_response FROM chats WHERE user_prompt = ? LIMIT 1";
//     const [rows] = await dbConnection.execute(selectQuery, [userPrompt]);
    
//     if (rows.length > 0) {
//         return rows[0].ai_response;
//     }
//     return null;
// }

// // [ 🔄 ฟังก์ชัน ] บันทึกการสนทนา (สำหรับขั้นตอนที่ 3)
// async function logChat(userPrompt, aiResponse) {
//     const insertQuery = "INSERT INTO chats (user_prompt, ai_response) VALUES (?, ?)";
//     const [result] = await dbConnection.execute(insertQuery, [userPrompt, aiResponse]);
//     return result.insertId;
// }

// // ==================== โหลดข้อมูลจากไฟล์ (เหมือนเดิม) ====================
// let collegeData = "";

// // ฟังก์ชันค้นหาข้อความที่เกี่ยวข้อง (เหมือนเดิม)
// function findRelevantContext(query, data) {
//     const queryWords = query.split(' ').filter(w => w.length > 1);
//     if (queryWords.length === 0) { return data; }
//     const sentences = data.split('\n').filter(line => line.trim() !== '');
//     const relevantSentences = sentences.filter(sentence =>
//         queryWords.some(word => sentence.includes(word))
//     );
//     return relevantSentences.length > 0 ? relevantSentences.join('\n') : data;
// }

// // ==================== API หลัก (เพิ่มการบันทึก MySQL) ====================
// app.post('/api/chat', async (req, res) => {
// try {
//     const { prompt } = req.body; 
    
//     if (!prompt) {
//         return res.status(400).json({ error: 'ไม่พบข้อความ (prompt) จากผู้ใช้' });
//     }

//     // [ 🟢 ขั้นตอนที่ 1: ตรวจสอบ Cache ]
//     const cachedResponse = await getChatCache(prompt);
    
//     if (cachedResponse) {
//         console.log(`[Cache Hit] ดึงคำตอบจาก DB (เร็ว) สำเร็จ: "${prompt}"`);
//         return res.json({ response: cachedResponse });
//     }
    
//     // [ 🔴 ขั้นตอนที่ 2: ถ้าไม่พบ Cache, เรียก Ollama ]
//     console.log(`[Cache Miss] เรียก Ollama ประมวลผล: "${prompt}"`);

//     const context = findRelevantContext(prompt, collegeData);

//     const finalPrompt = `
// คุณคือผู้ช่วย AI ของ "วิทยาลัยเทคนิคชัยภูมิ (CTC)" 
// จงใช้เฉพาะ "ข้อมูล" ด้านล่างนี้เพื่อตอบคำถามอย่างสุภาพ และห้ามตอบสิ่งที่ไม่มีอยู่ในข้อมูล

// ข้อมูล:
// ${context}

// คำถาม:
// ${prompt} 

// คำตอบ:
// `;

//     const ollamaPayload = {
//         model: "chaloemphong/CTC_IT:latest",
//         prompt: finalPrompt,
//         stream: false,
//         options: { temperature: 0.3 }
//     };

//     const ollamaResponse = await fetchFn('http://localhost:11432/api/generate', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(ollamaPayload),
//     });

//     if (!ollamaResponse.ok) {
//         const errorText = await ollamaResponse.text();
//         console.error("❌ Error from Ollama:", errorText);
//         return res.status(500).json({ error: 'ไม่สามารถรับการตอบกลับจาก Ollama ได้' });
//     }

//     const ollamaResult = await ollamaResponse.json();
//     const aiResponse = ollamaResult.response.trim(); 

//     // [ ✅ ขั้นตอนที่ 3: บันทึก Cache ]
//     try {
//         await logChat(prompt, aiResponse);
//         console.log(`[DB-MySQL] บันทึกการสนทนา (Cache Miss): "${prompt}"`);
//     } catch (dbError) {
//         console.error('⚠️ Warning: บันทึกฐานข้อมูล MySQL ล้มเหลว', dbError);
//     }


//     res.json({ response: aiResponse });

// } catch (error) {
//     console.error('❌ เกิดข้อผิดพลาดใน /api/chat:', error);
//     res.status(500).json({ error: 'ไม่สามารถประมวลผลคำขอได้' });
// }
// });


// async function startServer() {
// try {
//     collegeData = await fs.readFile('data.txt', 'utf8');
//     console.log('✅ โหลดข้อมูลจาก data.txt สำเร็จ');

//     await connectToDatabase(); 
//     await setupDatabase(); 

//     app.listen(port, () => {
//         console.log(`🚀 Backend server ทำงานที่ http://localhost:${port}`);
//         console.log('🧠 ระบบ RAG พร้อมใช้งานกับ Ollama (11432)');
//         console.log('🌐 phpMyAdmin เข้าถึงได้ที่ http://localhost:8085'); 
//     });
// } catch (error) {
//     console.error('❌ ผิดพลาด: ไม่พบไฟล์ data.txt หรือปัญหาการเชื่อมต่อฐานข้อมูล', error);
//     process.exit(1);
// }
// }

// startServer();

// ==================== server.js (ฉบับสมบูรณ์: MySQL + Cache + Learning Mode) ====================










let fetchFn; 

try {
 fetchFn = global.fetch;
} catch (e) {
 fetchFn = undefined;
}

if (!fetchFn) {
 console.log('... กำลังใช้ node-fetch (สำหรับ Node < 18)');
 fetchFn = (...args) =>
 import("node-fetch").then(({ default: fetch }) => fetch(...args));
} else {
 console.log('... กำลังใช้ global.fetch (สำหรับ Node >= 18)');
}
// ===================================================================================


const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const mysql = require('mysql2/promise'); // ฐานข้อมูล MySQL

const app = express();
const port = 3401; 

// Middleware
app.use(cors()); 
app.use(express.json());

// ==================== ตั้งค่าและเชื่อมต่อ MySQL (Docker) ====================
const dbConfig = {
    // ⚠️ ต้องตรงกับค่าใน docker-compose.yml
    host: 'localhost', 
    user: 'ctc_user', 
    password: 'ctc_user_password', 
    database: 'ctc_chat_db', 
    port: 3306
};

let dbConnection; 

async function connectToDatabase() {
    try {
        dbConnection = await mysql.createConnection(dbConfig);
        console.log('✅ เชื่อมต่อ MySQL (Docker) สำเร็จ');
    } catch (error) {
        console.error('❌ ผิดพลาดในการเชื่อมต่อ MySQL:', error);
        console.error('⚠️ ตรวจสอบว่า Docker Container "ctc_mysql_db" รันอยู่หรือไม่');
        process.exit(1);
    }
}

async function setupDatabase() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS chats (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_prompt TEXT NOT NULL,
            ai_response TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;
    await dbConnection.execute(createTableQuery);
    console.log('✅ ตาราง chats ใน ctc_chat_db พร้อมใช้งาน');
}

// [ Cache Function ] ดึงคำตอบจาก Cache
async function getChatCache(userPrompt) {
    // ดึงคำตอบที่ตรงกับ prompt เป๊ะๆ (Exact Match)
    const selectQuery = "SELECT ai_response FROM chats WHERE user_prompt = ? LIMIT 1";
    const [rows] = await dbConnection.execute(selectQuery, [userPrompt]);
    
    if (rows.length > 0) {
        return rows[0].ai_response;
    }
    return null;
}

// [ Log Function ] บันทึกการสนทนาและ Cache (Knowledge Curation)
async function logChat(userPrompt, aiResponse) {
    const insertQuery = "INSERT INTO chats (user_prompt, ai_response) VALUES (?, ?)";
    const [result] = await dbConnection.execute(insertQuery, [userPrompt, aiResponse]);
    return result.insertId;
}

// ==================== โหลดข้อมูลจากไฟล์ (เหมือนเดิม) ====================
let collegeData = "";

// ฟังก์ชันค้นหาข้อความที่เกี่ยวข้อง (เหมือนเดิม)
function findRelevantContext(query, data) {
    const queryWords = query.split(' ').filter(w => w.length > 1);
    if (queryWords.length === 0) { return data; }
    const sentences = data.split('\n').filter(line => line.trim() !== '');
    const relevantSentences = sentences.filter(sentence =>
        queryWords.some(word => sentence.includes(word))
    );
    return relevantSentences.length > 0 ? relevantSentences.join('\n') : ""; // ⚠️ คืนค่าเป็น String ว่าง ถ้าไม่พบ
}

// ==================== API หลัก (พร้อม Cache และ Learning Mode) ====================
app.post('/api/chat', async (req, res) => {
try {
    const { prompt } = req.body; 
    
    if (!prompt) {
        return res.status(400).json({ error: 'ไม่พบข้อความ (prompt) จากผู้ใช้' });
    }

    // [ 1. ตรวจสอบ Cache ]
    const cachedResponse = await getChatCache(prompt);
    
    if (cachedResponse) {
        console.log(`[Cache Hit] ดึงคำตอบจาก DB (เร็ว) สำเร็จ: "${prompt}"`);
        return res.json({ response: cachedResponse });
    }
    
    // [ 2. Cache Miss: เรียก Ollama ]
    console.log(`[Cache Miss] กำลังประมวลผล Ollama...`);

    const context = findRelevantContext(prompt, collegeData);
    let finalPrompt = "";
    // ตั้งค่าเงื่อนไข: ถ้า context ที่ดึงมามีความยาวเกิน 50 ตัวอักษร ให้ถือว่าเป็น RAG Mode
    let isRAGMode = context.length > 50; 

    if (isRAGMode) {
        // [ กรณี 2.1: RAG Mode (บังคับตอบตามข้อมูล) ]
        finalPrompt = `
คุณคือผู้ช่วย AI ของ "วิทยาลัยเทคนิคชัยภูมิ (CTC)" 
จงใช้เฉพาะ "ข้อมูล" ด้านล่างนี้เพื่อตอบคำถามอย่างสุภาพ และห้ามตอบสิ่งที่ไม่มีอยู่ในข้อมูลโดยเด็ดขาด

ข้อมูล:
${context}

คำถาม:
${prompt} 

คำตอบ:
`;
        console.log(`[RAG Mode] ใช้ข้อมูลอ้างอิงจาก data.txt`);
    } else {
        // [ กรณี 2.2: Learning Mode (อนุญาตให้ตอบด้วยความรู้ทั่วไป) ]
        finalPrompt = `
คุณคือผู้ช่วย AI ของ "วิทยาลัยเทคนิคชัยภูมิ (CTC)" 
หากคำถามเกี่ยวข้องกับวิทยาลัย ให้ตอบตามหลักการและข้อมูลที่คุณมี (Ollama model) แต่ถ้าคำถามเป็นความรู้ทั่วไปให้ตอบตามนั้น
จงตอบคำถามอย่างสุภาพ

คำถาม:
${prompt} 

คำตอบ:
`;
        console.log(`[Learning Mode] ไม่มีข้อมูลอ้างอิง, ใช้ความรู้ของ Ollama`);
    }

    // 🔹 เตรียม payload สำหรับ Ollama
    const ollamaPayload = {
        model: "chaloemphong/CTC_IT:latest",
        prompt: finalPrompt,
        stream: false,
        // ปรับ Temperature: ต่ำถ้า RAG (เน้นความถูกต้อง), สูงถ้า Learning (อนุญาตให้สร้างสรรค์)
        options: { temperature: isRAGMode ? 0.2 : 0.7 } 
    };

    const ollamaResponse = await fetchFn('http://localhost:11432/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ollamaPayload),
    });

    if (!ollamaResponse.ok) {
        const errorText = await ollamaResponse.text();
        console.error("❌ Error from Ollama:", errorText);
        return res.status(500).json({ error: 'ไม่สามารถรับการตอบกลับจาก Ollama ได้' });
    }

    const ollamaResult = await ollamaResponse.json();
    const aiResponse = ollamaResult.response.trim(); 

    // [ 3. บันทึกคำถาม-คำตอบใหม่ลง DB เพื่อเป็น Cache (Knowledge Curation) ]
    try {
        await logChat(prompt, aiResponse);
        console.log(`[DB-MySQL] บันทึกคำถาม/คำตอบใหม่ลง DB`);
    } catch (dbError) {
        console.error('⚠️ Warning: บันทึกฐานข้อมูล MySQL ล้มเหลว', dbError);
    }


    res.json({ response: aiResponse });

} catch (error) {
    console.error('❌ เกิดข้อผิดพลาดใน /api/chat:', error);
    res.status(500).json({ error: 'ไม่สามารถประมวลผลคำขอได้' });
}
});


async function startServer() {
try {
    collegeData = await fs.readFile('data.txt', 'utf8');
    console.log('✅ โหลดข้อมูลจาก data.txt สำเร็จ');

    await connectToDatabase(); 
    await setupDatabase(); 

    app.listen(port, () => {
        console.log(`🚀 Backend server ทำงานที่ http://localhost:${port}`);
        console.log('🧠 ระบบ RAG พร้อมใช้งานกับ Ollama (11432)');
        console.log('🌐 phpMyAdmin เข้าถึงได้ที่ http://localhost:8085'); 
    });
} catch (error) {
    console.error('❌ ผิดพลาด: ไม่พบไฟล์ data.txt หรือปัญหาการเชื่อมต่อฐานข้อมูล', error);
    process.exit(1);
}
}

startServer();





