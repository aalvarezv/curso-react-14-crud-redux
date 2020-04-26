import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,  
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

/***********Funcion para crear nuevos productos************/
export function crearNuevoProductoAction(producto){
    
    return async (dispatch) => {
        //despacha la acción para iniciar el loading 
        dispatch(agregarProducto())
        
        try {
            //inserta el producto en la api
            await clienteAxios.post('/productos', producto)
            //si todo sale bien actualizamos el state
            dispatch(agregarProductoExito(producto))

            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        }catch(error){
            console.log(error)
            //si hay error
            dispatch(agregarProductoError(true))

            //alerta de error
            Swal.fire(
               {
                   icon: 'error',
                   title: 'Hubo un error',
                   text: 'Hubo un error, intenta de nuevo'
               }
            )
        }

    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//si el producto se guarda en la base de datos.
const agregarProductoExito = (producto) => {
    return (
        {
            type: AGREGAR_PRODUCTO_EXITO,
            payload: producto
        }
    )  
}

//si hay un error al guardar el producto.
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

/********Funcion que descarga los productos de la base de datos**********/
export function obtenerProductosAction(){

    return async (dispatch) => {
        dispatch(descargarProductos())

        try {
            const resp = await clienteAxios.get('/productos')
            dispatch(descargarProductosExito(resp.data))
            
        } catch (error) {
            console.log(error)
            dispatch(descargarProductosError(true))
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargarProductosExito = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargarProductosError = (estado) => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: estado
})


/************Funcion selecciona y elimina el producto **********/
export function borrarProductoAction (id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))

        try {
          
           await clienteAxios.delete(`/productos/${id}`)
           dispatch(eliminarProductoExito())

           //Si se elimina, mostrar alerta
           Swal.fire(
                'Eliminado!',
                'El producto se eliminó correctamente.',
                'success'
           )

        } catch (error) {
            console.log(error)
            dispatch(eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true
})

/************Funcion selecciona el producto a editar **********/
export function selectProductoEditarAction (producto) {
   return (dispatch) => {
       dispatch(obtenerProductoEditar(producto))
        
    }
}

const obtenerProductoEditar = (producto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

/**************Funcion para editar el producto seleccionad*****/
export function editarProductoAction (producto){
    return async dispatch => {
        dispatch(editarProducto())

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
         
            dispatch(editarProductoExito(producto))

        } catch (error) {
            console.log(error)
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = () => ({
    
    /*Esta función y su type solo se utiliza para dejar un registro en el visor de redux, 
    que se está comenzando la edicion, ya que no se usa en el reducer*/
    type: COMENZAR_EDICION_PRODUCTO 
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITAR_ERROR,
    payload:true
})