import { Cart, LineItem } from '@common/types/cart'
import CartProduct from './CartProduct/CartProduct'
import { FC } from 'react'
import s from './ProductsList.module.scss'
import Heading from '@components/UI/Heading/Heading'

interface Props {
  data: Cart
}

const CartListSeparator: FC = () => {
  return <div className={s['list-separator-container']}></div>
}

const ProductsList: FC<Props> = ({ data }) => {
  return (
    <div className={s.container}>
      <Heading as="h4">Meu carrinho</Heading>
      <ul className={s['list-container']}>
        {data?.lineItems.map((item: LineItem) => (
          <div key={item.id}>
            <CartProduct item={item} currencyCode={data?.currency.code} />
            <CartListSeparator />
          </div>
        ))}
      </ul>
    </div>
  )
}

export default ProductsList
