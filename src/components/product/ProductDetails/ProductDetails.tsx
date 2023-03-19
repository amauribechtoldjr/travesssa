import React, { useState } from 'react'
import { Product, ProductOptionValues } from '@common/types/product'
import { ProductOptions } from '@components/product'
import { getVariant, SelectedOptions } from '../helpers'
import { useAddItem } from '@framework/hooks'
import Heading from '@components/UI/Heading/Heading'
import s from './ProductDetail.module.scss'
import { Ghost } from '@components/icons'
import Box from '@components/icons/Box'
import Star from '@components/icons/Star'
import { useUI } from '@hooks'
import { ActionButton } from '@components/UI'

type Props = {
  product: Product
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(null)
  const [isLoading, setLoading] = useState(false)
  const variant = getVariant(product, selectedOptions)
  const { openSidebar } = useUI()

  const addItem = useAddItem()

  const handleAddOption = (option: ProductOptionValues, category) => {
    setSelectedOptions({
      ...selectedOptions,
      [category]: option
    })
  }

  const handleAddCart = async () => {
    try {
      const item = {
        variantId: variant?.id ?? product.variants[0].id,
        quantity: 1
      }
      setLoading(true)

      await addItem(item)

      setLoading(false)
      openSidebar()
    } catch {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className={s['detail-box']}>
        <Heading as="h3">{product.name}</Heading>
        <p className={s['product-price']}>{`R$ ${product.price.value}`}</p>
      </div>
      <div className={s['detail-box']}>
        <ActionButton onClick={handleAddCart} disabled={isLoading}>
          QUERO
        </ActionButton>
      </div>
      <div className={s['detail-box']}>
        <div className={s['annotations-box']}>
          <Star classes={s['annotations-icon']} />
          <Heading as="h5" className={s['product-important-annotations']}>
            PODE IR AO MICROONDAS E LAVA-LOUÇAS
          </Heading>
        </div>
        <div>
          <Box classes={s['annotations-icon']} />
          <Heading as="h5" className={s['product-important-annotations']}>
            ENVIOS PARA TODO O BRASIL!
          </Heading>
        </div>
      </div>
      <div className={s['detail-box']}>
        <p>{product.description}</p>
        <div className={s['product-color-option-box']}>
          <p className={s['option-title']}>CORES:</p>
          {product.options.map(option => {
            return (
              <ProductOptions
                key={option.id}
                option={option}
                onSelectOption={handleAddOption}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
