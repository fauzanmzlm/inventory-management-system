<template>

</template>

<script type="text/javascript">
    export default {
        created() {
            // Remove Token & User
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            // Display alert
            Toast.fire({
                icon: 'success',
                title: 'Logout successfully'
            })
            // Redirect to Login Page
            this.$router.push({ name: '/' })
        }
    }
</script>

<style type="text/css">

</style>
