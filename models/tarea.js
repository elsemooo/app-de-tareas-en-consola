const { v4: uuidv4 } = require('uuid')

class Tarea {

    id = ''
    desc = ''
    completadaEn = null

    constructor(desc){

        this.id = uuidv4()
        this.desc = desc
        this.completadaEn = null
    
    }
}

module.exports = Tarea