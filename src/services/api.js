const API_URL = 'http://localhost:3000/api/users';
const API_ID_URL = 'http://localhost:3000/api/users/:id';

export async function getUsers() {
    const resp = await fetch(API_URL);
    return resp.json();
}

export async function getUserById(id) {
    const url = API_ID_URL.replace(':id', id);
    const resp = await fetch(url);
    return resp.json();
}

export async function createUser(data) {
    const resp = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(data)
    });

    return resp.json();
}

export async function updateUser(id, data) {
    const url = API_ID_URL.replace(':id', id);

    const resp = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data)
    });

    return resp.json();
}

export async function deleteUser() {
    const resp = await fetch(API_ID_URL, {
        method: 'DELETE'
    });

    return resp;
}