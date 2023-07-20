<template>
<v-row>
 <v-col>
    <v-text-field label="Ticket Id"
      type="input" v-model="input_tikcet_id">

    </v-text-field>
 </v-col>
 <v-col> <v-btn @click="findTicket()">Find
    <v-dialog transition="dialog-bottom-transition" width="auto" v-model="viewTicketDialog" >
              <v-card min-width="420">
                <v-toolbar color="primary" title="Your Ticket Details"></v-toolbar>
                <v-card-text>
                  <v-container>
                    <v-row>
                      Ticket Id: {{ dialogTicket.ticket_id }}
                    </v-row>
                    <v-row>
                      <v-col class="text-h6 pa-2">
                        From
                      </v-col>
                      <v-col class="text-h6 pa-2">
                        Destination
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="text-h6 pa-2">
                        {{ dialogTicket.source }}
                      </v-col>
                      <v-col class="text-h6 pa-2">
                        {{ dialogTicket.destination }}
                      </v-col>
                    </v-row>
                    <v-row>
                    Created At <span style="font-size: 12px; font-weight: bold; margin-left: 10px; margin-top: 3px;">{{ dialogTicket.created_at }}</span>
                    </v-row>
                <v-row>
                  Valid Upto <span style="font-size: 12px; font-weight: bold; margin-left: 10px; margin-top: 3px;">{{ dialogTicket.valid_upto }}</span>
                </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn v-if="dialogTicket.status === 'checkedin'" variant="text" @click="updateTicket(dialogTicket)">Update Ticket</v-btn>
                  <v-btn v-if="dialogTicket.status === 'active'" variant="text" >Check In</v-btn>
                  <v-btn  v-else-if="dialogTicket.status === 'checkedin'" variant="text" >Check Out</v-btn>
                  <v-btn  v-else variant="text">Checked Out</v-btn>
                  <v-btn variant="text" @click="viewTicketDialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
 </v-btn></v-col>
    
</v-row>
</template>

<script setup>
import axios from 'axios';

    const dialogTicket = ref({});
    const input_tikcet_id = ref("")
    const viewTicketDialog = ref(false)
    const myToken = ref("")

    async function updateTicket(ticket) {
        await axios.put(`http://localhost:11001/api/tickets/admin`,ticket,{headers:{'authorization': myToken.value,'Content-Type': 'application/json'}}).then(res=>{
    if(res.data.ok == true) {
      alert("Successfully Updated Ticket")
    }
    else {
      alert(res.data.result)
    }
  })
    }
    async function findTicket() {
        if(input_tikcet_id.value) {
            await axios.get(`http://localhost:11001/api/admin/tickets?tid=${input_tikcet_id.value}`).then(res=>{
                if(res.data.ok == true) {
                    dialogTicket.value = res.data.result
                    viewTicketDialog.value = true
                }
                else {
                    alert(res.data.result)
                }
            })
        }
    }
    onMounted(()=>{
        myToken.value = JSON.parse(localStorage.getItem('employee_token'))['token']
        console.log(typeof(myToken.value))
        if(JSON.parse(localStorage.getItem('employee_token'))['user'] === 'admin') {
            navigateTo('/admin')
        }
        else {
            alert("SignIn with an admin account")
            navigateTo('/SignIn')
        }
    })
</script>