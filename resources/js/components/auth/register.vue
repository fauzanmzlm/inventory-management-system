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
                                        <h1 class="h4 text-gray-900 mb-4">Register</h1>
                                    </div>
                                    <form>
                                        <div class="form-group">
                                            <input type="text" class="form-control" id="full_name" name="full_name"
                                                placeholder="Enter Full Name">
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control" id="email" name="email"
                                                aria-describedby="emailHelp" placeholder="Enter Email Address">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" id="password" name="password"
                                                placeholder="Enter Password">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" id="confirm_password" name="confirm_password"
                                                placeholder="Enter Confirm Password">
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary btn-block">Register</button>
                                        </div>
                                        <hr>
                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <router-link to="/" class="font-weight-bold small">Already have an account?</router-link>
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

<script type="text/javascript"></script>

<style type="text/css">

</style>
