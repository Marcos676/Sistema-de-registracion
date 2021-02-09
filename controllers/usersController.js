const bcrypt = require('bcrypt');
const { setUsers, getUsers } = require('../data/usuarios')
const usuariosList = getUsers


module.exports = {
    register: (req, res) => {
        res.render('register',{
            error: 'undefined'
        })
        
    },
    processRegister: (req, res, next) => {
        const {nombre, apellido, email, pass1, pass2 } = req.body
        
            let resultado = usuariosList.find(usuario => usuario.email === email)     

        if (resultado) {
            res.render('register', {
                error: 'El email ya esta en uso'
            })
        }
        if (pass1 !== pass2) {
            res.render('register', {
                error: 'Las contraseñas no son idénticas'
            })
        }
        if (req.files[0] === undefined) {
            res.render('register', {
                error: 'Debe subir un avatar'
            })
        }

        let lastID = 0;
        usuariosList.forEach(usuario => {
            if (usuario.id > lastID) {
                lastID = usuario.id
            }
        });

        const passHash = bcrypt.hashSync(pass1.trim(), 12);

        let newUser = {
            id: +lastID + 1,
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            email,
            pass: passHash,
            avatar: req.files[0].filename || 'sin-imagen.png'
        }

        usuariosList.push(newUser);

        setUsers(usuariosList)

        res.render('profile', {
            nombre,
            apellido,
            email,
            avatar: req.files[0].filename || 'sin-imagen.png'
        })
    },
    login: (req, res) => {
        res.render('login',{
            error: 'undefined'
        })
    },
    processLogin: (req, res) => {
        const {email, pass} = req.body

        let resultado = usuariosList.find(usuario => usuario.email === email.trim())

        if(resultado === undefined){
            res.render('login', {error: 'Email invalido'})
        }
        if(!bcrypt.compareSync(pass.trim(), resultado.pass)){
            res.render('login', {error: 'Contraseña invalida'})
        }

        res.render('profile', {
            nombre: resultado.nombre,
            apellido: resultado.apellido,
            email: resultado.email,
            avatar: resultado.avatar
        })
    },
    profile: (req, res) => {
        res.send(req)
        res.render('profile')
    }
}