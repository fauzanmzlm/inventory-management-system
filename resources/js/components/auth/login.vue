<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Login</h1>
                                    </div>
                                    <form class="user" @submit.prevent="login">
                                        <input type="hidden" name="_token" :value="csrf">
                                        <div class="form-group">
                                            <input type="email" class="form-control" id="email"
                                                aria-describedby="emailHelp" placeholder="Enter Email Address" v-model="form.email">
                                            <small v-if="errors.email" class="text-danger">
                                                {{ errors.email[0] }}
                                            </small>
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" id="password"
                                                placeholder="Password" v-model="form.password">
                                            <small v-if="errors.password" class="text-danger">
                                                {{ errors.password[0] }}
                                            </small>
                                        </div>
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox small"
                                                style="line-height: 1.5rem;">
                                                <input type="checkbox" class="custom-control-input" id="customCheck">
                                                <label class="custom-control-label" for="customCheck">Remember Me</label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary btn-block">Login</button>
                                        </div>
                                        <hr>
                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <router-link to="/register" class="font-weight-bold small">Create an Account!</router-link>
                                    </div>
                                    <div class="text-center">
                                        <router-link to="/forget" class="font-weight-bold small">Forget Password?</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        created () {
            if (User.loggedIn()) {
                this.$router.push({ name: 'home' })
            }
        },
        data () {
            return {
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                form: {
                    email: null,
                    password: null
                },
                errors: {}
            }
        },
        methods: {
            login() {
                axios.post('/api/auth/login', this.form)
                    .then(response => {
                        User.responseAfterLogin(response)
                        Toast.fire({
                            icon: 'success',
                            title: 'Signed in successfully'
                        })
                        this.$router.push({ name: 'home' })
                    })
                    .catch(error => this.errors = error.response.data.errors)
                    .catch(
                        Toast.fire({
                            icon: 'warning',
                            title: 'Invalid Email Address or Password!'
                        })
                    )
            }
        }

    };
</script>
    
<style type="text/css">

</style>
