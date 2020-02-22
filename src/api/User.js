import Cookies from "js-cookie";

export async function me() {
    const resp = await fetch(`${STRAPI_URL}/users/me`,{
        headers: {
            authorization: `Bearer ${Cookies.get('jwt')}`
        }
    });
    if (!resp.ok) return false;
    return await resp.json();
}

export async function getAllUsers() {
    const resp = await fetch(`${STRAPI_URL}/users`,{
        headers: {
            authorization: `Bearer ${Cookies.get('jwt')}`
        }
    });
    if (!resp.ok) return [];
    return await resp.json();
}

