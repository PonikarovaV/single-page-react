const authFormData = {
    fields: [
        {
            label: {
                attributes: {
                    for: 'login',
                },
                text: 'Логин',
            },
            input: {
                id: 'login',
                type: 'text',
                minlength: 2,
                maxlength: 30,
                required: true,
            },
        },
        {
            label: {
                attributes: {
                    for: 'password',
                },
                text: 'Пароль',
            },
            input: {
                id: 'password',
                type: 'password',
                minlength: 5,
                maxlength: 30,
                required: true,
            },
        },
    ],
    buttons: {
        login: {
            name: 'Войти',
            attributes: {
                id: 'loginButton',
                type: 'submit',
            },
        },
    }
}

export default authFormData;