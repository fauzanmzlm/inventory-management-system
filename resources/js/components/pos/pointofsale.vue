<template>
  <div>
    <div class="container-fluid" id="container-wrapper">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">POS Dashboard</h1>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="./">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">POS</li>
        </ol>
      </div>
      <div class="row mb-3">
        <!-- Area Chart -->
        <div class="col-xl-5 col-lg-5">
          <div class="card mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">Expense Insert</h6>
              <button @click.prevent="addCustomer" class="btn btn-sm btn-info">
                <font color="#ffffff">Add Customer</font>
              </button>
            </div>
            <div class="table-responsive" style="font-size: 12px;">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead> 
                <tbody>
                  <tr v-for="cart in carts" :key="cart.id">
                    <td>{{ cart.pro_name }}</td>
                    <td>
                      <input type="text" readonly="" style="width: 15px;" :value="cart.pro_quantity">
                      <button @click.prevent="increment(cart.id)" class="btn btn-sm btn-success">+</button>
                      <button @click.prevent="decrement(cart.id)" class="btn btn-sm btn-danger" v-if="cart.pro_quantity >= 2">-</button>
                      <button class="btn btn-sm btn-danger" v-else disabled="">-</button>
                    </td>
                    <td>{{ cart.product_price }}</td>
                    <td>{{ cart.sub_total }}</td>
                    <td>
                      <a @click="removeItem(cart.id)" class="btn btn-sm btn-primary">
                        <font color="#ffffff">X</font>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card-footer">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">Total Quantity:
                  <strong>{{ qty }}</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">Sub Total:
                  <strong>{{ subtotal }} $</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">Vat:
                  <strong>{{ vats.vat }} %</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">Total:
                  <strong>{{ total }}</strong>
                </li>
              </ul>
              <br>
              <form @submit.prevent="orderdone">
                <label>Customer Name</label>
                <select class="form-control" v-model="customer_id">
                  <option :value="customer.id" v-for="customer in customers" :key="customer.id">{{ customer.name }}</option>
                </select>
                <label>Pay</label>
                <input type="text" class="form-control" required="" v-model="pay">
                <label>Due</label>
                <input type="text" class="form-control" required="" v-model="due">
                <label>Pay By</label>
                <select class="form-control" v-model="payby">
                  <option value="HandCash">Hand Cash</option>
                  <option value="Cheaque">Cheaque</option>
                  <option value="GiftCard">Gift Card</option>
                </select>
                <br>
                <button type="submit" class="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <!-- Pie Chart -->
        <div class="col-xl-7 col-lg-7">
          <div class="card mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">Products Sold</h6>
            </div>
            <!-- Category Wise Product -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
                  aria-selected="true">All Product</a>
              </li>
              <li class="nav-item" v-for="category in categories" :key="category.id">
                <a class="nav-link" :id="category.id + '-tab'" data-toggle="tab" :href="'#'+category.id" role="tab"
                  :aria-controls="category.id" aria-selected="false" @click="subproduct(category.id)">{{ category.category_name }}</a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="card-body">
                  <input type="text" v-model="searchTerm" class="form-control" style="width: 560px;" placeholder="Search Product">
                  <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-6 col-6" v-for="product in filteredProducts" :key="product.id">
                      <button class="btn btn-sm" @click.prevent="addToCart(product.id)">
                        <div class="card" style="width: 8.5rem; margin-bottom: 5px;">
                          <img :src="product.image" id="em_photo" class="card-img-top">
                          <div class="card-body">
                            <h6 class="card-title">{{ product.product_name }}</h6>
                            <span class="badge badge-success" v-if="product.product_quantity >= 1">Available {{ product.product_quantity }}</span>
                            <span class="badge badge-danger" v-else>Stock Out</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" v-for="category in categories" :id="category.id" :key="category.id" role="tabpanel" :aria-labelledby="category.id + '-tab'">
                <input type="text" v-model="getsearchTerm" class="form-control" style="width: 560px;" placeholder="Search Product">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-6 col-6" v-for="getproduct in getfilteredProducts" :key="getproduct.id">
                    <button class="btn btn-sm" @click.prevent="addToCart(getproduct.id)">
                      <div class="card" style="width: 8.5rem; margin-bottom: 5px;">
                        <img :src="getproduct.image" id="em_photo" class="card-img-top">
                        <div class="card-body">
                          <h6 class="card-title">{{ getproduct.product_name }}</h6>
                          <span class="badge badge-success" v-if="getproduct.product_quantity >= 1">Available {{ getproduct.product_quantity }}</span>
                          <span class="badge badge-danger" v-else>Stock Out</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Category Wise Product -->
          </div>
        </div>
      </div>
    </div>
    <!--Row-->
  </div>
</template>
<script>
import axios from 'axios';

export default {
  created() {
    if (!User.loggedIn()) {
      this.$router.push({ name: '/' });
    }
    this.fetchData();
    this.vat();
    Reload.$on('AfterAdd', () => {
      this.fetchData();
    });
  },
  data() {
    return {
      customer_id: '',
      pay: '',
      due: '',
      payby: '',
      products: [],
      categories: [],
      getproducts: [],
      searchTerm: '',
      getsearchTerm: '',
      customers: [],
      errors: '',
      carts: [],
      vats: '',
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.product_name.match(this.searchTerm));
    },
    getfilteredProducts() {
      return this.getproducts.filter(getproduct => getproduct.product_name.match(this.getsearchTerm));
    },
    qty() {
      return this.carts.reduce((sum, cart) => sum + parseFloat(cart.pro_quantity), 0);
    },
    subtotal() {
      return this.carts.reduce((sum, cart) => sum + parseFloat(cart.pro_quantity) * parseFloat(cart.product_price), 0);
    },
    total() {
      return this.subtotal * (this.vats.vat / 100) + this.subtotal;
    },
  },
  methods: {
    // Cart Methods Here
    addToCart(id) {
      axios
        .get('/api/addToCart/' + id)
        .then(() => {
          Reload.$emit('AfterAdd');
          Notification.cart_success();
        })
        .catch();
    },
    fetchData() {
      this.fetchAllProduct();
      this.fetchAllCategory();
      this.fetchAllCustomer();
      this.cartProduct();
    },
    cartProduct() {
      axios.get('/api/cart/product/').then(({ data }) => (this.carts = data)).catch();
    },
    removeItem(id) {
      axios
        .get('/api/remove/cart/' + id)
        .then(() => {
          Reload.$emit('AfterAdd');
          Notification.cart_delete();
        })
        .catch();
    },
    increment(id) {
      axios.get('/api/increment/' + id).then(() => {
        Reload.$emit('AfterAdd');
        Notification.success();
      }).catch();
    },
    decrement(id) {
      axios.get('/api/decrement/' + id).then(() => {
        Reload.$emit('AfterAdd');
        Notification.success();
      }).catch();
    },
    vat() {
      axios.get('/api/vats/').then(({ data }) => (this.vats = data)).catch();
    },
    orderdone() {
      const total = this.subtotal * (this.vats.vat / 100) + this.subtotal;
      const data = { qty: this.qty, subtotal: this.subtotal, customer_id: this.customer_id, payby: this.payby, pay: this.pay, due: this.due, vat: this.vats.vat, total: total };
      axios.post('/api/orderdone', data).then(() => {
        Notification.success();
        this.$router.push({ name: 'home' });
      });
    },
    // End Cart Methods 
    fetchAllProduct() {
      axios.get('/api/product/').then(({ data }) => (this.products = data)).catch();
    },
    fetchAllCategory() {
      axios.get('/api/category/').then(({ data }) => (this.categories = data)).catch();
    },
    fetchAllCustomer() {
      axios.get('/api/customer/').then(({ data }) => (this.customers = data)).catch(console.log('error'));
    },
    subproduct(id) {
      axios.get('/api/getting/product/' + id).then(({ data }) => (this.getproducts = data)).catch();
    },
    addCustomer() {
      // Implement the logic to add a new customer here.
    },
  },
};
</script>
<style scoped>
#em_photo {
  height: 100px;
  width: 135px;
}
</style>