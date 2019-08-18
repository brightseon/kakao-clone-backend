export const join = (param) => {
    try {
        console.log('param : ', param);
    } catch(err) {
        console.log('join error : ', err);
    }
};

export const login = (req, res) => {
    try {
        console.log('params : ', req.body);

        // return res.status(200);
    } catch(err) {
        console.log('login error : ', err);
    }
};