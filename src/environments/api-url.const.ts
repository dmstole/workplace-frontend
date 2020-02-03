export const apiUrl = (root) => ({
    root,

    login: `${root}/auth/login`,

    resetPassword: `${root}/reset-password`,
    
    requestResetPasword: `${root}/request-reset-password`,

    receivedCodeConfirmation: `${root}/received-code-confirmation`,
    
    registerNewPassword: `${root}/register-new-password`,

    places: (keyWord?: string) => {
        const param = !!keyWord 
            ? `?key=${keyWord}`
            : "";
        const url = `${root}/places${param}`;
        return url;
    },

    users: `${root}/users`,

    departaments: `departaments`,

    rooms: (departamentId?: number) => !!departamentId
        ? `${root}/departament/${departamentId}/rooms`
        : `${root}/rooms`,

    tables: (roomId?: number) => !!roomId
        ? `${root}/room/${roomId}/tables`
        : `${root}/tables`,

    workPosition: `${root}/work-positions`,

    reservations: `${root}/reservations`,
});