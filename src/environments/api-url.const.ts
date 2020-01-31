export const apiUrl = (root) => ({
    root,
    login: `${root}/auth/login`,
    places: `${root}/places`,
    users: `${root}/users`,
    departaments: `departaments`,
    rooms: (departamentId?: number) => !!departamentId
        ? `${root}/departament/${departamentId}/rooms`
        : `${root}/rooms`,
    tables: (roomId?: number) => !!roomId
        ? `${root}/room/${roomId}/tables`
        : `${root}/tables`,
});