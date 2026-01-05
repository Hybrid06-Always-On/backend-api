const db = require('../config/db');

// 비디오 데이터 스토리지
class VideoStorage {
    // 비디오 단일 조회 (ID 기반)
    static async getVideo(id) {
        // id, 제목, 설명, 업로드 날짜, HLS 경로 조회
        const query = `
            SELECT id, title, description, created_date, hls_path 
            FROM videos 
            WHERE id = ?
        `;

        return await db.connection(query, [id]);
    }
}

module.exports = VideoStorage;
