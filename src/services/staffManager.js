import request from '@/utils/request';

export async function getAllStaffs() {
  return request('/api/staffs');
}
