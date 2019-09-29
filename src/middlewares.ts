import { Request, Response, NextFunction } from "express";

export const onlyPublic = (req : Request, res : Response, next : NextFunction) => {
    console.log('onlyPublic req.user : ', req.user);
    
    if(!req.user) {
        next();
    } else {
        return res.status(403).json({
                ok : false,
                data : null,
                error : '로그인 상태입니다. 로그아웃 후 다시 이용해 주세요.'
        }).end();
    }
};

export const onlyPrivate = (req : Request, res : Response, next : NextFunction) => {
    console.log('onlyPrivate req.user : ', req.user);

    if(req.user) {
        next();
    } else {
        return res.status(403).json({
            ok : false,
            data : null,
            error : '로그인 상태가 아닙니다. 로그인 후 다시 이용해 주세요.'
        });
    }
};