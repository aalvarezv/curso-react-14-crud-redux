import React from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

//Redux
import {useDispatch} from 'react-redux'
import { borrarProductoAction, selectProductoEditarAction } from '../actions/productoActions'

const Producto = ({producto}) => {

    const {nombre, precio, id} = producto

    const dispatch = useDispatch()
    const history = useHistory() //habilitar history para redireccion

    //confirmar si desea eliminar el producto
    const confirmarEliminarProducto = id => {
        //preguntamos al usuario
        Swal.fire({
            title: '¿Está seguro?',
            text: "Una vez eliminado, no podrá recuperarlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {

              //pasa al action
              dispatch( borrarProductoAction(id))

            }
          })

    }

    //funcion que  redirige de forma programada
    const redireccionarEdicion = producto => {
        history.push(`/productos/editar/${producto.id}`)
        dispatch(selectProductoEditarAction(producto))
    }

    return (  
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td> 
            <td className="acciones">
                <button
                    type="button" 
                    className="btn btn-primary mr-2"
                    onClick={() => redireccionarEdicion(producto)}
                >
                    Editar
                </button>
                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}
 
export default Producto;