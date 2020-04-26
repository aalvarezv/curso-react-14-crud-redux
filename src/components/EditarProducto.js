import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
//Redux
import {useSelector, useDispatch} from 'react-redux'
import {editarProductoAction} from '../actions/productoActions'


const EditarProducto = () => {

    const history = useHistory()

    const dispatch = useDispatch() 

    const [producto, setProducto] = useState({
        nombre: '',
        precio: 0
    })

    const productoeditar = useSelector(state => state.productos.productoeditar)
  
    useEffect(() => {
        setProducto(productoeditar)
    }, [productoeditar])

    const { nombre, precio} = producto
   
    const handleChange = e => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        dispatch(editarProductoAction(producto))
        history.push('/')
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
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
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    name="precio"
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    value={precio}
                                    onChange={handleChange}
                                />
                            </div>
                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase
                                d-block w-100"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;