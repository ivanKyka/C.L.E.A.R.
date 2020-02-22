import Cookies from 'js-cookie';

export async function Auth(identifier, password) {
    const response = await window.fetch(`${STRAPI_URL}/auth/local`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identifier: identifier,
            password: password
        })
    });
    const data = await response.json();
    Cookies.remove('icon');
    Cookies.set('icon', data.user.icon.url);
    return data;
}

export async function isLogged() {
    const resp = await fetch(`${STRAPI_URL}/users/me`,{
        headers: {
            authorization: `Bearer ${Cookies.get('jwt')}`
        }
    });
    return resp.ok;
}