import React from 'react';
import { Redirect } from 'react-router-dom';

export default function LoginSuccess() {
  let tokenHash = window.location.href;
  console.log(window.location.href);
  let tokenSplit = tokenHash.split('#id_token=')[1].split('&access_token=');
  let idToken = tokenSplit[0].replace('#id_token=', '');
  let accessToken = tokenSplit[1].split('&expires')[0];
  console.log(idToken);
  console.log(accessToken);
  localStorage.setItem('id-token', idToken);
  localStorage.setItem('access-token', accessToken);
  return (
    <div>
      <Redirect to="/welcome" />
    </div>
  );
}
