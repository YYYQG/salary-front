import request from '@/utils/request';

export async function getAllStaffs() {
  return request('/api/staffs');
}

export async function saveStaffEmail(param){

  /*return request(`/api/staff/${param.key}?email=${param.email}`,{
    method: 'PUT',
  })*/
  return request(`/api/staff/${param.key}`,{
    method: 'PATCH',
    ContentType: 'application/json',
    data:{
      email: param.email,
    }
  })

}
