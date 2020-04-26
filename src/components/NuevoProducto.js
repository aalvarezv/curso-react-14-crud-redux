import React, {useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
//useDispatch, permite ejecutar la acción
//useSelector, forma de acceder al state dentro del componente.

//Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions'
import { mostrarAlertaAction, ocultarAlertaAction } from '../actions/alertaActions'

const NuevoProducto = ({history}) => {

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState(0)

    //utilizar useDispatch y te crea una función.
    const dispatch = useDispatch()

    //acceder al state del store
    /* para acceder a todos los states
       const cargando = useSelector( (state) => state)
       console.log(cargando)
    */
    
    const cargando = useSelector( (state) => state.productos.loading )
    const error    = useSelector( state => state.productos.error)
    const alerta   = useSelector ( state => state.alerta.alerta )

    //llama el action de productoAction, el return es implicito
    const agregarProducto = (producto) => {
        dispatch(crearNuevoProductoAction(producto))
    }

    //Cuando el usuario hace submit
    const handleSubmit = e => {
       
        e.preventDefault()
        //validar formulario
        if(nombre.trim() === '' || precio <= 0){
            
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlertaAction(alerta))
            return
        }
         //si no hay errores
        dispatch(ocultarAlertaAction())
       

        //crear nuevo producto
        agregarProducto({
            nombre,
            precio
        })

        //redirecciona
        history.push('/')
     
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null}
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    name="nombre"
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                    
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    name="precio"
                                    type="text"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    onChange={e => setPrecio( Number(e.target.value) )}
                                    value={precio}
                                />
                            </div>
                            <input 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase
                                d-block w-100"
                                value="Agregar"
                            />
                              
                        </form>
                        {cargando ? <p>Cargando...</p> : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
      );
}
 
export default NuevoProducto;