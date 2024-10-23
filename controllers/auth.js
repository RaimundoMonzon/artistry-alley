import jwt from 'jsonwebtoken';

const login = async (req, res) => {

    const userEsperado = {
        _id: 1,
        username: "Raicist",
        password: 80085
    }

    const {_id, nombre, pass} = userEsperado;

    try {
        if(user === nombre) {
            if(password === pass) {
                const token = await generateJWT(_id);
                res.json({
                    usuario,
                    token
                })
            }
        }
    } catch {
        console.log("Error al generar el Token.");
    }
    
}

const generateJWT = (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id: user?.id,
            nombre: user?.nombre
        };

        generateJWT.sign( payload, process.env.SECRETKEY, {
            expiresIn: 4,
        }, (err, token) => {
            if(err){
                reject("Rechazo total");
            } else {
                resolve(token);
            }
        })
    })
}

export default login;