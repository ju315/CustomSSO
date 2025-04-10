function tokenCookieCheck() {
  const cookie = document.cookie;
  const token = cookie.split('; ').find((x) => x.includes('token'));

  if (token) {
    const [_, data] = token.split('=');
    const tokenData = JSON.parse(decodeURIComponent(data));

    return tokenData;
  }

  return null;
}
