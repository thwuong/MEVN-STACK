export default function authHeader() {
  const token =  JSON.parse(localStorage.getItem('user'));
  if (token) {
    return  { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}

  // để vào đươc cấp quyền thao tác posts