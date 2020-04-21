class Api {
    constructor() {

    }

    login(data) {
        const body = Object.keys(data).map(key => {
            return `${key}=${data[key]}`;
        }).join('&');

        return fetch('http://blackbeltroom.ru/my/api/korus/user/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так... ${res.status}`);
            })
            .catch(err => console.error('login error ' + err));
    }

    getList() {
        const hash = JSON.parse(localStorage.getItem('hash')) || null;

        const data = {
            userHash: hash,
        }

        if (hash !== null) {
            const params = Object.keys(data).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
            }).join('&');
        
            return fetch('http://blackbeltroom.ru/my/api/korus/user/summary/get', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Что-то пошло не так... ${res.status}`);
                })
                .catch(err => console.error(err));
        }
    }

    getUserListWithNames() {
        const hash = JSON.parse(localStorage.getItem('hash')) || null;

        const data = {
            userHash: hash,
        }

        if (hash !== null) {
            const params = Object.keys(data).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
            }).join('&');
        
            return fetch('http://blackbeltroom.ru/my/api/korus/user/list', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Что-то пошло не так... ${res.status}`);
                })
                .catch(err => console.error(err));
        }
    }

    saveNewProfile(data) {
        const hash = JSON.parse(localStorage.getItem('hash')) || null;

        if (hash !== null) {
            const body = Object.keys(data).map(key => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
            }).join('&');

            return fetch('http://blackbeltroom.ru/my/api/korus/user/update', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Что-то пошло не так... ${res.status}`);
                })
                .catch(err => console.error(err));
        }
    }

    addNewMember(data) {
        const hash = JSON.parse(localStorage.getItem('hash')) || null;

        if (hash !== null) {
            const body = Object.keys(data).map(key => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
            }).join('&');

            return fetch('http://blackbeltroom.ru/my/api/korus/user/add', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Что-то пошло не так... ${res.status}`);
                })
                .catch(err => console.error(err));
        }
    }

    deleteMember(data) {
        const hash = JSON.parse(localStorage.getItem('hash')) || null;

        if (hash !== null) {
            const body = Object.keys(data).map(key => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
            }).join('&');

            return fetch('http://blackbeltroom.ru/my/api/korus/user/delete', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Что-то пошло не так... ${res.status}`);
                })
                .catch(err => console.error(err));
        }
    }
}

const api = new Api();

export { api };
