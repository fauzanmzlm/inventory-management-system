<template>
  <div>
    <div class="row">
      <router-link to="/store-product" class="btn btn-primary">Add Product</router-link>
    </div>
    <br>
    <input type="text" v-model="searchTerm" class="form-control" style="width: 300px;" placeholder="Search Here">
    <br>
    <div class="row">
      <div class="col-lg-12 mb-4">
        <!-- Simple Tables -->
        <div class="card">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Stock</h6>
          </div>
          <div class="table-responsive">
            <table class="table align-items-center table-flush">
              <thead class="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Photo</th>
                  <th>Category</th>
                  <th>Buying Price</th>
                  <th>Status</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in filteredProducts" :key="product.id">
                  <td>{{ product.product_name }}</td>
                  <td>{{ product.product_code }}</td>
                  <td><img :src="product.image" id="em_photo" /></td>
                  <td>{{ product.category_name }}</td>
                  <td>{{ product.buying_price }}</td>
                  <td>
                    <span :class="stockStatus(product.product_quantity)">
                      {{ product.product_quantity >= 1 ? 'Available' : 'Stock Out' }}
                    </span>
                  </td>
                  <td>{{ product.product_quantity }}</td>
                  <td>
                    <router-link :to="{ name: 'edit-stock', params: { id: product.id } }" class="btn btn-sm btn-primary">Edit</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer"></div>
        </div>
      </div>
    </div>
    <!--Row-->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      searchTerm: ''
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.product_name.includes(this.searchTerm));
    }
  },
  methods: {
    stockStatus(quantity) {
      return quantity >= 1 ? 'badge badge-success' : 'badge badge-danger';
    },
    fetchProducts() {
      axios.get('/api/product/')
        .then(({ data }) => {
          this.products = data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  created() {
    if (!User.loggedIn()) {
      this.$router.push({ name: '/' });
    }
    this.fetchProducts();
  }
};
</script>

<style>
#em_photo {
  height: 40px;
  width: 40px;
}
</style>
