const fs = require ("fs/promises")
const crypto = require ("crypto")
const { log } = require("console")

class UserManager {
    constructor() {
        this.filePath = "Usuarios.json"
    }
    async createUser(user){
      const {nombre, apellido, username, password} = user
    
    // hashear password
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")
    try {
        let users= []
        if (await fs.access(this.filePath).then(()=>true).catch(()=>false)){
            const fileContent = await fs.readFile (this.filePath, "utf8")
            users = JSON.parse(fileContent)
        }
        users.push({nombre, apellido, username, password: hashedPassword })

        await fs.writeFile(this.filePath, JSON.stringify(users, null, 2))
    }
    catch(error){
        console.error("error al crear el usuario", error)
    }
    }

    async validateUser (username, password) {
        try {
            if (await fs.access(this.filePath).then(()=> true).catch(()=> false)){
                const fileContent = await fs.readFile (this.filePath, "utf8")
                const users = JSON.parse (fileContent)
                const user = users.find (u => u.username === username)

                if (user){
                    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")
                    if (hashedPassword=== user.password) {
                        console.log("Usuario logueado correctamente");
                    }else{
                        console.log("contrasena incorrecta");
                    }
                }else{
                    console.log("Usuario inexistente");
                }
            }else{
                console.log("No hay usuarios registrados");
            }
        } catch (error) {
            console.error("error de validacion", error);
        }
    }
   
}

const userManager = new UserManager()

userManager.createUser({
    nombre: "Victoria",
    apellido: "Venturini",
    username: "vicky.ventu",
    password: "vicky123",
}).then(()=>{
    userManager.validateUser("vicky.ventu", "vicky123")
})