import { Client } from 'src/plugins/XcontactSDK.mjs'
import { reactive, toRefs } from 'vue'

const state = reactive({
  session: null,
  incall: false,
  callid: null,
  status: 'Desconetado',
  numero: '',
})

const config = {
  server: process.env.XC_HOST,
  ramal: process.env.XC_RAMAL,
  senha: process.env.XC_SENHA,
}

let client = null

export default function useWebRTC() {
  function RegistrarRamal() {
    const baseUrl = config.server + ':8089'

    const registerOptions = {
      userAgent: `Xcontact-Netwall 1.0`,
      hackWssInTransport: true,
      account: {
        user: config.ramal,
        password: config.senha,
        name: config.ramal,
        uri: `${config.ramal}@${baseUrl}`,
      },
      transport: {
        wsServers: `wss://${baseUrl}/ws`,
        iceServers: [],
        userAgentString: `Xcontact-Netwall 1.0`,
      },
      media: {
        input: {
          id: 'default', // Microphone
          audioProcessing: false,
          volume: 1.0,
          muted: false,
        },
        output: {
          id: 'default', // Speaker
          volume: 1.0,
          muted: false,
        },
      },
    }

    console.log('registerOptions', registerOptions)

    client = new Client(registerOptions)
    client.connect()

    client.on('statusUpdate', (data) => {
      console.log('statusUpdate', data)
      if (data === 'connected') {
        state.status = 'Conectado'
      } else {
        state.status = 'Desconectado'
      }
    })
  }

  async function Desligar() {
    try {
      if (state.session) {
        await state.session.terminate()
      }
    } catch (error) {
      console.log('Erro ao desligar', error)
    }
  }

  function enviarDTMF(tecla) {
    const dtmf = tecla + ''
    if (state.session) {
      state.session.dtmf(dtmf)
    }
  }

  async function Discar(numero) {
    try {
      numero = numero.replace(/\D/g, '').trim()
      console.log('Discando para', numero)
      state.numero = numero

      const invite = await client.invite(numero)
      if (invite) {
        state.session = invite.session
        state.incall = true

        invite.session.on('progress', (dados) => {
          console.log('Chamada em progresso', dados)
          state.callid = dados.callId
          console.log('callid', state.callid)
        })

        invite.session.on('accepted', (dados) => {
          console.log('Chamada aceita', dados)
          if (!state.callid) {
            state.callid = dados.callId
          }
          console.log('callid', state.callid)
        })

        invite.session.on('failed', (dados) => {
          console.log('Chamada falhou', dados)
          state.incall = false
          state.callid = null
        })

        invite.session.on('terminated', (dados) => {
          console.log('Chamada terminada', dados)
          state.incall = false
          state.callid = null
        })
      } else {
        console.log('Erro ao discar')
        state.incall = false
        state.callid = null
      }
    } catch (error) {
      console.log('Erro ao discar', error)
      state.incall = false
      state.callid = null
    }
  }

  return {
    ...toRefs(state),
    RegistrarRamal,
    Discar,
    Desligar,
    enviarDTMF,
  }
}
