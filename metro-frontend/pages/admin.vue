<template>
<v-row>
 <v-col>
    <v-text-field label="Ticket Id"
      type="input">

    </v-text-field>
 </v-col>
 <v-col> <v-btn>Find</v-btn></v-col>
    
</v-row>
</template>

<script setup>

    onMounted(()=>{
        if(JSON.parse(localStorage.getItem('employee_token'))['user'] === 'admin') {
            navigateTo('/admin')
        }
        else {
            alert("SignIn with an admin account")
            navigateTo('/SignIn')
        }
    })
</script>