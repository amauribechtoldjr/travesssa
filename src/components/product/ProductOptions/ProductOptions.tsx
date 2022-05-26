import { FC, useState } from 'react'
import { ProductOption, ProductOptionValues } from '@common/types/product'
import * as S from './styles'

interface Props {
  option: ProductOption
}

const ProductOptions: FC<Props> = ({ option }) => {
  const [selectedOption, setSelectedOption] =
    useState<ProductOptionValues>(null)

  const handleSelectOption = (option: ProductOptionValues) => {
    return () => {
      if (option !== selectedOption) setSelectedOption(option)
    }
  }

  return (
    <S.OptionContanier>
      <span>{option.displayName}</span>
      <S.OptionItems>
        {option.values.map(value => {
          return (
            <S.OptionLabel
              key={value.label}
              optionColor={value.hexColor}
              selected={value.label === selectedOption?.label}
              onClick={handleSelectOption(value)}
            >
              {!value.hexColor && value.label.toUpperCase()}
            </S.OptionLabel>
          )
        })}
      </S.OptionItems>
    </S.OptionContanier>
  )
}

export default ProductOptions
