import { fetchApi, normalizeProduct, getAllProductsQuery } from '@framework'
import { ProductConnection } from '@framework/types'

import { Product } from '@common/types/product'

type ProductsFetchResult = { products: ProductConnection }

const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await fetchApi<ProductsFetchResult>({
    query: getAllProductsQuery
  })

  const products =
    data.products.edges.map(({ node: product }) => {
      return normalizeProduct(product)
    }) ?? []

  return products
}

export default getAllProducts
