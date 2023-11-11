export const updateObjectInArray = (items:any, itemId:any, objPropName:any, newObjProps:any):any => {
    return items.map(function (u:any) {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
}
