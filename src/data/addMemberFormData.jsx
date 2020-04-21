const addMemberFormData = {
    fields: [
        {
            label: {
                attributes: {
                    for: 'editName',
                },
                text: 'Имя',
            },
            input: {
                id: 'editName',
                type: 'text',
                minlength: 2,
                maxlength: 30,
            },
        },
        {
            label: {
                attributes: {
                    for: 'editSurname',
                },
                text: 'Фамилия',
            },
            input: {
                id: 'editSurname',
                type: 'text',
                minlength: 2,
                maxlength: 30,
            },
        },
        {
            label: {
                attributes: {
                    for: 'editRole',
                },
                text: 'Роль',
            },
            input: {
                id: 'editRole',
                type: 'text',
                minlength: 2,
                maxlength: 30,
            },
        },
    ],
    buttons: {
        add: {
            name: 'Добавить',
            attributes: {
                id: 'addMemberButton',
            },
        },
        cancel: {
            name: 'Отменить',
            attributes: {
                id: 'cancelMemberButton',
            },
        },
    }
}

export default addMemberFormData;
