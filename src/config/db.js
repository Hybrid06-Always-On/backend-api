const mysql = require("mysql2/promise");

const environment = process.env.ENVIRONMENT || 'onpremise';

// 환경에 따른 DB 접속 정보 선택
const dbConfig = environment === 'aws'
    ? {
        host: process.env.AURORA_HOST,
        user: process.env.AURORA_USER,
        password: process.env.AURORA_PASSWORD,
        database: process.env.AURORA_DATABASE || 'streaming',
    }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE || 'streaming',
    };

console.log(`[DB] ${environment === 'aws' ? 'Aurora DB' : 'MySQL'} 연결 설정 완료.`);

// 커넥션 풀 생성
const pool = mysql.createPool({
    connectionLimit: 10,
    ...dbConfig,
});

// query 모듈화
module.exports = {
    connection: async (query, values = []) => {
        try {
            const [result] = await pool.query(query, values);
            if (Array.isArray(result) && result.length <= 1) return result[0];
            return result;
        } catch (err) {
            console.error("[DB] 쿼리 에러:", err);
            return err;
        }
    }
};