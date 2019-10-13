import User from '../models/User';
import { Request, Response } from 'express';
import passport from 'passport';
import { checkValidate } from '../utils';

export const join = async (req : Request, res : Response) => {
    try {
        const { body : { email, name, password, password_confirm } } = req;
        const notProperty = checkValidate(req.body, ['email', 'name', 'password', 'password_confirm']);

        if(notProperty) {
            return res.status(400).json({
                ok : false,
                data : null,
                error : `필수 파라미터인 '${ notProperty }'가 존재하지 않습니다.`
            });
        }
        
        if(password !== password_confirm) {
            return res.status(400).json({
                ok : false,
                data : null,
                error : '비밀번호와 비밀번호 확인이 다릅니다.'
            });
        }
        
        const newUser = new User({ email, name });

        await User.register(newUser, password);

        return res.status(200).json({
            ok : true,
            data : newUser,
            error : null
        });
    } catch(err) {
        console.log('join error : ', err.message);

        return res.status(500).json({
            ok : false,
            data : null,
            error : err.message
        });
    } finally {
        res.end();
    }
};

export const duplicateCheck = async (req : Request, res : Response) => {
    try {
        const { body : { email } } = req;
        const notProperty = checkValidate(req.body, ['email']);

        if(notProperty) {
            return res.status(400).json({
                ok : false,
                data : null,
                error : `필수 파라미터인 '${ notProperty }'가 존재하지 않습니다.`
            });
        }

        const findUser = await User.findOne({ email });

        if(findUser) {
            return res.status(409).json({
                ok : false,
                data : null,
                error : '이미 동일한 이메일을 가진 사용자가 존재합니다.'
            });
        }

        return res.status(200).json({
            ok : true,
            data : {
                message : '사용 가능한 이메일입니다.'
            },
            error : null
        });
    } catch(err) {
        console.log('duplicateCheck error : ', err);

        return res.status(500).json({
            ok : false,
            data : null,
            error : err.message
        });
    } finally {
        res.end();
    }
};

export const passportLogin = passport.authenticate('local', { failureMessage : '아이디 또는 비밀번호가 맞지 않습니다.' });

export const login = (req : Request, res : Response) => {
    try {
        return res.status(200).json({
            ok : true,
            data : req.user,
            error : null
        });
    } catch(err) {
        console.log('login error : ', err);
    }
};

export const logout = (req : Request, res : Response) => {
    try {
        req.logout();

        return res.status(200).json({
            ok : true,
            data : {
                message : '로그아웃에 성공했습니다.'
            },
            error : null
        });
    } catch(err) {
        console.log('logout error : ', err);

        return res.status(500).json({
            ok : false,
            data : null,
            error : '로그아웃에 실패했습니다.'
        });
    } finally {
        res.end();
    }
};