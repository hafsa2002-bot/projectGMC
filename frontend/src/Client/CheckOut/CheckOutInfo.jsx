import React from 'react'
import { useCart } from '../../CartContext'

function CheckOutInfo({shippingPrice}) {
  const {currency} = useCart()
  return (
    <div>
       <div>
            <h2 className='mb-2 text-lg font-medium text-gray-900'>Méthode de livraison</h2>
            <p>Notre livreur vous contactera dans les 24 prochaines heures pour planifier la livraison à un moment qui vous convient.</p>
            <div className='bg-yellow-100 border-black px-2.5 py-3 flex justify-between items-center  border mt-3  text-gray-900 text-sm rounded-lg  w-full '>
                <div>Frais de conditionnement + livraison</div>
                <div className='font-semibold'>{shippingPrice} {currency}</div>
            </div>
        </div>
        <div>
            <h2 className='mb-2 text-2xl font-medium text-gray-900'>Paiement</h2>
            <p>L'adresse de facturation de votre méthode de paiement doit correspondre à l'adresse de livraison. </p>
            <div className='bg-yellow-100 border-black px-2.5 py-3 flex justify-between items-center  border mt-3  text-gray-900 text-sm rounded-lg  w-full '>Paiement à la livraison</div>
        </div>
    </div>
  )
}

export default CheckOutInfo
