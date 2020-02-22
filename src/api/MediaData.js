import Cookies from 'js-cookie';

export async function getAllMediadata() {
    const resp = await fetch(`${STRAPI_URL}/media-data`, {
        headers: {
            authorization: `Bearer ${Cookies.get('jwt')}`
        }
    });
    if (!resp.ok) return [];
    return await resp.json();
}

export async function getMediadata(id) {
    const resp = await fetch(`${STRAPI_URL}/media-data/${id}`, {
        headers: {
            authorization: `Bearer ${Cookies.get('jwt')}`
        }
    });
    if (!resp.ok) return false;
    return await resp.json();
}
export async function uploadMediadata(data) {
    let response = await fetch(`${STRAPI_URL}/media-data`,
        {
            method: 'POST',
            headers: {
                authorization: `Bearer ${Cookies.get('jwt')}`
            },
            body: data
        });
    return response.ok;
}