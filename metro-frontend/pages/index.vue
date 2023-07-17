<template>
    <v-card
    :loading="isUpdating"
    color="blue-grey-darken-1"
    class="mx-auto"
    max-width="420"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="green-lighten-3"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      cover
      height="200"
      src="../assets/metro1.jpeg"
    >
    </v-img>
    <v-form>
      <v-row>
      <v-col cols="5">
      <v-autocomplete
            v-model="source_station"
            :items="items"
            item-title="station_name"
            item-value= "station_id"
            label="Source"
          >
      </v-autocomplete>
    </v-col>
    <v-col cols="5">
      <v-autocomplete
            v-model="destined_station"
            :items="items"
            item-title="station_name"
            item-value= "station_id"
            label="Destination"
          >
      </v-autocomplete>
    </v-col>
  </v-row>
      
      
    </v-form>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :loading="isUpdating"
        :variant="isUpdating ? 'tonal' : undefined"
        color="blue-grey-lighten-3"
        @click="getTicketDetails()"
      >
      Next
      <v-dialog
        transition="dialog-bottom-transition"
        width="auto"
        v-model="dialog"
        activator="parent"
      >
          <v-card min-width="420">
            <v-toolbar
              color="primary"
              title="Your Ticket Details"
            ></v-toolbar>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col   class="text-h6 pa-2">
                    From
                  </v-col>
                  <v-cols class="text-h6 pa-2">
                    Destination
                  </v-cols>
                </v-row>
                <!-- <v-row >
                  <v-col   class="text-h6 pa-2">
                    {{ source_station }}
                  </v-col>
                  <v-cols class="text-h6 pa-2">
                    {{ destined_station }}
                  </v-cols>
                </v-row> -->
                <v-row>
                  Valid Upto  10-08-2000
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                variant="text"
                @click="dialog = false"
              >PAY</v-btn>
              <v-btn
                variant="text"
                @click="dialog = false"
              >CANCEL</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
      </v-btn>
      
    </v-card-actions>
  </v-card>
   

</template>

<script setup lang="ts">
import axios from 'axios';

const items = ref([]);
const source_station = ref("");
const destined_station = ref("");
const isUpdating = ref(false);
const timeout=  ref(null);
const dialog = ref(false);

watch(isUpdating ,(val)=> {
        clearTimeout(timeout.value)

        if (val) {
          timeout.value = setTimeout(() => (isUpdating.value = false), 3000)
        }
      },
)

watch(destined_station,()=>{
  if(source_station.value && destined_station.value) {
    console.log(source_station.value)
  }
}
)

async function getTicketDetails() {
   isUpdating.value = true;
   await axios.get(`http://localhost:11001/api/ticket-price?src=${source_station.value}&des=${destined_station.value}`).then(res=>{
    console.log(res.status !== 500,"JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJjj")
    if(res.status !== 500) {
      isUpdating.value= false
      dialog.value = false
      console.log(res.status)
    }
    })    
}
  onMounted(async ()=>{
    await axios.get('http://localhost:11001/api/station-list/').then(res=>{
      items.value = res.data
    })
  })
</script>
