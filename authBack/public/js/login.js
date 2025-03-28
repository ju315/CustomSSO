const cookie = document.cookie;

const [_, token] = cookie
  .split('; ')
  .find((x) => x.includes('token'))
  .split('=');
// .map((x) => {
//   const [name, data] = x.split('=');

//   return {
//     name,
//     data,
//   };
// });

console.log('token cookie:: ', token);
console.log('token decode:: ', decodeURIComponent(token));
console.log('token data:: ', JSON.parse(decodeURIComponent(token)));

if (token) {
  window.location.href = returnUrl;
}
