export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }

  // để vào đươc cấp quyền thao tác posts