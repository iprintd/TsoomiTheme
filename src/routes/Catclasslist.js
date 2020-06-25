/**
 * This is the Homepage
 * URL : http://<store-domain>/{language-code}/home/
 *
 * @param {object} state - the state of the store
 */
import { UStoreProvider } from '@ustore/core'
import Layout from '../components/Layout'
import Slider from '$core-components/Slider'
import PromotionItem from '../components/PromotionItem'
import { Router } from '$routes'
import Gallery from '$core-components/Gallery'
import CategoryItem from '../components/CategoryItem'
import ProductItem from '../components/ProductItem'
import urlGenerator from '$ustoreinternal/services/urlGenerator'
import { t } from '$themelocalization'
import './Catclasslist.scss'
import { Component } from 'react'
import { getVariableValue } from '$ustoreinternal/services/cssVariables'
import theme from '$styles/_theme.scss'
import { throttle } from 'throttle-debounce'
import { getIsNGProduct } from '../services/utils'
import { decodeStringForURL } from '$ustoreinternal/services/utils'

class CatClassList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      promotionItemButtonUrl: ''
    }

  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize.bind(this));
    throttle(250, this.onResize);// Call this function once in 250ms only

    this.onResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
    this.clearCustomState()
  }

  clearCustomState() {
    UStoreProvider.state.customState.delete('homeFeaturedProducts')
    UStoreProvider.state.customState.delete('homeFeaturedCategory')
  }

  onResize() {
    this.setState({ isMobile: document.body.clientWidth < parseInt(theme.md.replace('px', '')) })
  }

  static getDerivedStateFromProps(props, state) {
    if (!(props.state && props.customState)) {
      return null
    }

    const { categories } = props.customState
    //NOTE: this is not supported in SSR
    if (categories && categories.length && !state.promotionItemButtonUrl.length) {
      const { FriendlyID, Name } = categories[0]
      const defaultURL = urlGenerator.get({ page: 'category', id: FriendlyID, name: decodeStringForURL(Name) })
      return { promotionItemButtonUrl: getVariableValue('--homepage-carousel-slide-1-button-url', defaultURL, false, true) }
    }
    return null
  }



  render() {
    if (!this.props.state) {
      return null
    }

    const { customState: { categories, homeFeaturedProducts, homeFeaturedCategory } } = this.props


    return (
      <Layout {...this.props} className="home">


        <div className="middle-section">
        <h1 id="cat_header">All Classes</h1>
          {categories && categories.length > 0 &&
            <div className="categories-wrapper">
              <Slider multi>
                {
                  categories.map((model) => {
                    return <CategoryItem key={model.ID} model={model}
                      url={urlGenerator.get({ page: 'category', id: model.FriendlyID, name: decodeStringForURL(model.Name) })} />
                  }
                  )
                }
              </Slider>
            </div>
          }

          <div className="divider" />

        </div>
      </Layout>
    )
  }
}

CatClassList.getInitialProps = async function (ctx) {
  const maxInPage = 200
  const { Count } = await UStoreProvider.api.categories.getTopCategories(1, maxInPage)
  if (Count === 0) {
    return { homeFeaturedProducts: null, homeFeaturedCategory: null }
  }

  const page = Math.ceil(Count / maxInPage)
  const { Categories } = await UStoreProvider.api.categories.getTopCategories(page, maxInPage)

  if (Categories.length === 0) {
    return { homeFeaturedProducts: null, homeFeaturedCategory: null }
  }

  const homeFeaturedCategory = Categories[Count - 1]
  const { Products: homeFeaturedProducts } = await UStoreProvider.api.products.getProducts(homeFeaturedCategory.ID, 1)
  return { homeFeaturedProducts, homeFeaturedCategory }
}

export default CatClassList
