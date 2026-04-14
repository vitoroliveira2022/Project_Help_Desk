export const getToken = () => {
  try {
    const session = JSON.parse(localStorage.getItem('session'));
    return session?.token || '';
  } catch {
    return '';
  }
};