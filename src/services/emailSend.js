import request from '@/utils/request';

export async function sendEmail(emailInfo) {
  return request('/api/email/send',{
    method: 'POST',
    data:{
      ...emailInfo
    }
  });
}
export async function getAllEmailInformation() {
  return request('/api/email/informations',{
    method: 'GET',
  });
}
