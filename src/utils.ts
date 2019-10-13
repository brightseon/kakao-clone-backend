export const checkValidate = (properties : Object, requiredKeys : string[]) : string => {
    let notProperty = '';

    requiredKeys.forEach(key => {
        if(!properties[key]) {
            notProperty = key;

            return;
        }
    });

    return notProperty;
};