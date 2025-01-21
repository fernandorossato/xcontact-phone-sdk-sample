<template>
  <q-dialog v-model="incall" position="bottom" persistent seamless>
    <q-card style="width: 450px">
      <q-card-section class="row items-center no-wrap">
        <div>
          <div class="text-weight-bold">Falando com: {{ numero }}</div>
          <div class="text-grey">Callid: {{ callid }}</div>
        </div>
        <q-btn flat dense icon="dialpad" class="q-ml-lg">
          <q-menu anchor="bottom middle" self="top middle">
            <dialPad />
          </q-menu>
        </q-btn>

        <q-space />        
        <q-btn label="Desligar" color="red" @click="Desligar" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import useWebRTC from '../state/webrtc'
import dialPad from 'src/components/dialPad.vue'

const { Desligar, callid, incall, numero } = useWebRTC()
</script>