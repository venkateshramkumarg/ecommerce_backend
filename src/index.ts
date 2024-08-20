import { Hono } from 'hono'
import userGroup from './api/users'
import productGroup from './api/products'
import categoryGroup from './api/category'
import orderGroup from './api/orders'
import cartGroup from './api/cart'
import paymentGroup from './api/payment'
import reviewGroup from './api/reviews'

const app = new Hono().basePath('/api')

app.route('/users',userGroup)
app.route('/products',productGroup)
app.route('/categories',categoryGroup)
app.route('/orders',orderGroup)
app.route('/cart',cartGroup)
app.route('/payment',paymentGroup)
app.route('/users',reviewGroup)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})



export default app
