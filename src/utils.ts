import { Request } from "express";

export const checkValidate = (req : Request, properties : string[]) : string => {
    let notProperty = '';

    properties.forEach(property => {
        if(!req.body[property]) {
            notProperty = property;

            return;
        }
    });

    return notProperty;
};