import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { allOrders } from '../../../redux/actions/a.admin.js'
import {useAuth} from '../../../context/AuthContext';
import CardOrden from '../CardOrden/CardOrden'

function Orden() {
  const {currentUser} = useAuth()
  const dispatch = useDispatch()
  const history = useSelector(state => state.history)
  useEffect(() => {
      dispatch(allOrders(currentUser))
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div>
      {history.length && history.map(o=><CardOrden key={o.id} id={o.orderId} comprador={o.comprador} estado={o.estado} vendedores={o.vendedores} fecha={o.fecha} o={o} />)}
      
    </div>
  )
}

export default Orden