import request from '@/utils/request';

const BASE_API = '/mini/api';

export default {
    upload(tempFilePath) {
        return request({
            url: BASE_API + '/system/file/upload',
            method: 'post',
            isUploadFile: true,
            filePath: tempFilePath,
        });
    },
};
