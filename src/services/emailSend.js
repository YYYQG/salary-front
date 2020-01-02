import request from '@/utils/request';

export async function sendEmail(emailInfo) {
  return request('/api/email/send',{
    method: 'POST',
    data:{
      ...emailInfo
    }
  });
}
