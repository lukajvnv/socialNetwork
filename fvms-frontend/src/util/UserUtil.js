export function isUserRole(user, role) {

    if(!user.roles || user.roles.length === 0) {
        return false;
    }

    for(let userRole of user.roles) {

        if(userRole === role) {
            return true;
        }
    }

    return false;
}

export function isUserOneOfRoles(user, roles) {

    for(let role of roles) {

        if(isUserRole(user, role)) {
            return true;
        }
    }

    return false;
}