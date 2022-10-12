const Tarea = require('./tarea')
const colors = require('colors')
class Tareas {
    _listado = {}

    get listadoArr(){
        const listado = []
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })
        return listado
    }

    constructor(){
        this._listado = {}

    }

    borrarTarea ( id = '' ){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach( (tarea) => {
            this._listado[tarea.id] = tarea

        })
    }

    crearTarea( desc = ''){
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto(){
        this.listadoArr.forEach((tarea, i) =>{
            const idx = `${i + 1}.`
            const {desc, completadaEn} = tarea
            const estado = (completadaEn) ? "Completado".green : "Pendiente".red
            console.log(`${idx.green} ${desc} :: ${estado }`)
        })
    }

    listarPendientesCompletadas( completadas = true ){
        let contador = 0
        this.listadoArr.forEach((tarea, i ) => {
            const {desc, completadaEn} = tarea
            const estado = (completadaEn) ? "Completado".green : "Pendiente".red
            if(completadas && estado == "Completado".green){
                contador += 1 
                console.log(`${(contador + '.').green} ${desc} :: ${completadaEn.green}`)
            }else if(completadas == false && estado == "Pendiente".red){
                contador += 1
                console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
            }
        })
    }

    toggleCompletadas(ids = []){
        ids.forEach(id =>{
            const tarea = this._listado[id]
            if(!tarea.completadaEn){
                tarea.completadaEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach( tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadaEn = null
            }
        })
    }
}


module.exports = Tareas