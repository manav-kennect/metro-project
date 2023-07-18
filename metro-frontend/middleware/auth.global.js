export default defineNuxtRouteMiddleware((to, from) => {
    console.log('Middlewarw path', to.name)
    if(process.server) return
    if(process.client){
    const token = JSON.parse(localStorage.getItem('employee_token'))
    if ( !token && to.name != 'SignIn' && to.name != 'SignUp') {
        return navigateTo('/SignIn')
        
    }
}
    }
    )