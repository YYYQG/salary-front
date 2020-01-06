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

export async function saveEmailInformation(param){

  /*return request(`/api/staff/${param.key}?email=${param.email}`,{
    method: 'PUT',
  })*/
  return request(`/api/email/informations/${param.key}`,{
    method: 'PATCH',
    ContentType: 'application/json',
    data:{
      ...param,
    }
  })

}
