// 환경에 따라 MinIO 또는 S3(CloudFront)를 사용하는 통합 스토리지 모듈

const environment = process.env.ENVIRONMENT || 'onpremise';

let storageClient;

if (environment === 'aws') {
    // AWS 환경: S3 + CloudFront signed URL
    storageClient = require('./s3');
    console.log('[Storage] AWS S3(CloudFront)를 사용합니다.');
} else {
    // 온프레미스 환경: MinIO presigned URL
    storageClient = require('./minio');
    console.log('[Storage] MinIO를 사용합니다.');
}

module.exports = storageClient;
