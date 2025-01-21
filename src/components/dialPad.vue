<template>
  <div class="column">
    <div class="col">
      <div
        class="col content-center"
        style="max-width: 700px; min-width: 240px"
      >
        <div class="row q-mb-md q-gutter-xs">
          <div class="col text-center" v-for="i in [1, 2, 3]" :key="i">
            <q-btn
              style="min-width: 100%"
              :key="i"
              :label="i"
              @click="enviarDTMF(i)"
            />
          </div>
        </div>
        <div class="row q-mb-md q-gutter-xs">
          <div class="col" v-for="i in [4, 5, 6]" :key="i">
            <q-btn
              style="min-width: 100%"
              :key="i"
              :label="i"
              @click="enviarDTMF(i)"
            />
          </div>
        </div>
        <div class="row q-mb-md q-gutter-xs">
          <div class="col" v-for="i in [7, 8, 9]" :key="i">
            <q-btn
              style="min-width: 100%"
              :key="i"
              :label="i"
              @click="enviarDTMF(i)"
            />
          </div>
        </div>
        <div class="row q-gutter-xs">
          <div class="col">
            <q-btn style="min-width: 100%" label="*" @click="enviarDTMF('*')" />
          </div>
          <div class="col">
            <q-btn style="min-width: 100%" label="0" @click="enviarDTMF(0)" />
          </div>
          <div class="col">
            <q-btn style="min-width: 100%" label="#" @click="enviarDTMF('#')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import useWebRTC from '../state/webrtc'

const { enviarDTMF } = useWebRTC()
</script>