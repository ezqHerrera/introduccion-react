const API_URL = 'http://localhost:3000/api/users'

export async function getUsers() {
    const resp = await fetch(API_URL);
    return resp.json();
}

export async function createUser(data) {
    const resp = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(data)
    });

    return resp.json();
}