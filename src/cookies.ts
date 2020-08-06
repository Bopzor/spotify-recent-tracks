const getCookies = () => Object.fromEntries(document.cookie.split('; ').map((x) => x.split('=')));

const getCookie = (name: string) => {
  const cookies = getCookies();

  return cookies[name];
};

export default getCookie;
