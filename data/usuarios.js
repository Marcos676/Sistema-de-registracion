const fs = require('fs')
const path = require('path')

const usuarios_db = path.join(__dirname ,'usuarios.json');/* ubicacion desde app.js */

module.exports = {
    getUsers:   JSON.parse(fs.readFileSync(usuarios_db, 'utf-8')),
    
    setUsers: (data) => {
        return fs.writeFileSync(usuarios_db, JSON.stringify(data, null, 2), 'utf-8')
    }
}