const { getSignedUrl } = require('@aws-sdk/cloudfront-signer');

const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN;
const CLOUDFRONT_KEY = (process.env.CLOUDFRONT_KEY || '').replace(/\\n/g, '\n');
const CLOUDFRONT_ID = process.env.CLOUDFRONT_ID;

const buckets = {
    hls: process.env.S3_BUCKET_HLS,
    thumb: process.env.S3_BUCKET_THUMB,
};

module.exports = {
    buckets,

    // S3 presignedUrl 생성
    getPresignedUrl: (objectKey, expireSeconds = 86400) => {
        if (!CLOUDFRONT_DOMAIN || !CLOUDFRONT_KEY || !CLOUDFRONT_ID) {
            throw new Error('[Storage] CloudFront 환경 변수가 설정되지 않았습니다.');
        }

        const url = `https://${CLOUDFRONT_DOMAIN}/${objectKey}`;
        const dateLessThan = new Date(Date.now() + expireSeconds * 1000).toISOString();

        return getSignedUrl({
            url,
            keyPairId: CLOUDFRONT_ID,
            privateKey: CLOUDFRONT_KEY,
            dateLessThan,
        });
    }
};
