# Xcontact Phone SDK Sample

Este projeto é um exemplo de implementação de um softphone WebRTC usando o **Xcontact SDK**. Embora este exemplo específico tenha sido desenvolvido com **Vue 3 e Quasar Framework**, o **Xcontact SDK** é agnóstico de framework e pode ser facilmente integrado em qualquer aplicação JavaScript, incluindo:

- ✅ **Vue.js** (demonstrado neste projeto)
- ✅ **React**
- ✅ **Angular**
- ✅ **HTML/JavaScript puro**
- ✅ **Node.js** (para aplicações server-side)

O projeto demonstra como registrar um ramal WebRTC no PBX Xcontact e realizar chamadas telefônicas através do navegador, servindo como referência para implementações em qualquer tecnologia web.

## 📋 Índice

- [Características](#características)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Documentação do SDK](#documentação-do-sdk)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Contribuição](#contribuição)
- [Licença](#licença)

## ✨ Características

- **Registro de Ramal WebRTC**: Conecta automaticamente com o PBX Xcontact
- **Chamadas de Saída**: Interface para discagem e realização de chamadas
- **Chamadas de Entrada**: Recebimento automático de chamadas
- **DTMF**: Envio de tons DTMF durante as chamadas
- **Interface Responsiva**: Desenvolvida com Quasar Framework
- **Estado Reativo**: Gerenciamento de estado com Vue 3 Composition API

## 🛠 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (versão 6.13.4 ou superior) ou **yarn** (versão 1.21.1 ou superior)
- **Navegador moderno** com suporte a WebRTC
- **Certificado SSL** (necessário para WebRTC em produção)

## 📦 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd xcontact-phone-sdk-sample
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

## ⚙️ Configuração

### Arquivo .env

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```ini
# Configurações do servidor Xcontact
XC_HOST=cliente1ws.xcontactcenter.com.br
XC_RAMAL=1000
XC_SENHA=123456
```

### Parâmetros de Configuração

- **XC_HOST**: URL do servidor Xcontact (sem protocolo)
- **XC_RAMAL**: Número do ramal a ser registrado
- **XC_SENHA**: Senha do ramal

## 🚀 Uso

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:9000`

### Produção

Para fazer o build para produção:

```bash
npm run build
# ou
yarn build
```

### Funcionalidades da Interface

1. **Conexão**: A aplicação conecta automaticamente ao servidor Xcontact
2. **Status**: Mostra o status da conexão (Conectado/Desconectado)
3. **Discagem**: Use o campo de entrada para digitar o número e clique em "Discar"
4. **Chamadas**: Durante uma chamada, use o botão "Dialpad" para enviar DTMF
5. **Desligar**: Use o botão "Desligar" para encerrar a chamada

---

## 📚 Documentação do SDK

O **Xcontact SDK** (`src/plugins/XcontactSDK.mjs`) é uma biblioteca JavaScript que permite integrar funcionalidades de telefonia WebRTC em aplicações web. Abaixo está a documentação completa para desenvolvedores.

### Importação

```javascript
import { Client } from 'src/plugins/XcontactSDK.mjs'
```

### Classe Client

A classe `Client` é o ponto de entrada principal do SDK.

#### Construtor

```javascript
const client = new Client(options)
```

#### Parâmetros de Configuração

```javascript
const registerOptions = {
  userAgent: 'Xcontact-phone 1.0',
  hackWssInTransport: true,
  account: {
    user: 'numero_do_ramal',
    password: 'senha_do_ramal',
    name: 'nome_do_ramal',
    uri: 'numero_do_ramal@servidor:porta',
  },
  transport: {
    wsServers: 'wss://servidor:porta/ws',
    iceServers: [],
    userAgentString: 'Xcontact-phone 1.0',
  },
  media: {
    input: {
      id: 'default',
      audioProcessing: false,
      volume: 1.0,
      muted: false,
    },
    output: {
      id: 'default',
      volume: 1.0,
      muted: false,
    },
  },
}
```

#### Métodos Principais

##### `connect()`

Conecta o cliente ao servidor Xcontact.

```javascript
client.connect()
```

##### `invite(numero)`

Inicia uma chamada para o número especificado.

```javascript
const invite = await client.invite('123456789')
if (invite) {
  const session = invite.session
  // Manipular eventos da sessão
}
```

**Retorno**: Promise que resolve com um objeto contendo a sessão da chamada.

#### Eventos do Client

##### `statusUpdate`

Disparado quando o status da conexão muda.

```javascript
client.on('statusUpdate', (status) => {
  console.log('Status:', status) // 'connected' ou 'disconnected'
})
```

##### `invite`

Disparado quando uma chamada é recebida.

```javascript
client.on('invite', (invite) => {
  console.log('Chamada recebida:', invite)

  // Aceitar a chamada
  invite.session.accept()

  // Ou rejeitar a chamada
  // invite.session.reject()
})
```

### Objeto Session

O objeto `session` representa uma chamada ativa e fornece métodos para controlar a chamada.

#### Métodos da Session

##### `accept()`

Aceita uma chamada recebida.

```javascript
invite.session.accept()
```

##### `reject()`

Rejeita uma chamada recebida.

```javascript
invite.session.reject()
```

##### `terminate()`

Encerra uma chamada ativa.

```javascript
await session.terminate()
```

##### `dtmf(tone)`

Envia um tom DTMF durante a chamada.

```javascript
session.dtmf('1') // Envia o tom '1'
session.dtmf('*') // Envia o tom '*'
session.dtmf('#') // Envia o tom '#'
```

#### Eventos da Session

##### `progress`

Disparado quando a chamada está em progresso.

```javascript
invite.session.on('progress', (data) => {
  console.log('Chamada em progresso:', data)
  console.log('Call ID:', data.callId)
})
```

##### `accepted`

Disparado quando a chamada é aceita.

```javascript
invite.session.on('accepted', (data) => {
  console.log('Chamada aceita:', data)
  console.log('Call ID:', data.callId)
})
```

##### `failed`

Disparado quando a chamada falha.

```javascript
invite.session.on('failed', (data) => {
  console.log('Chamada falhou:', data)
})
```

##### `terminated`

Disparado quando a chamada é encerrada.

```javascript
invite.session.on('terminated', (data) => {
  console.log('Chamada encerrada:', data)
})
```

### Exemplo de Implementação Completa

```javascript
import { Client } from 'src/plugins/XcontactSDK.mjs'

class XcontactPhone {
  constructor(config) {
    this.config = config
    this.client = null
    this.currentSession = null
    this.isConnected = false
  }

  async initialize() {
    const options = {
      userAgent: 'Meu Softphone 1.0',
      hackWssInTransport: true,
      account: {
        user: this.config.ramal,
        password: this.config.senha,
        name: this.config.ramal,
        uri: `${this.config.ramal}@${this.config.server}:8089`,
      },
      transport: {
        wsServers: `wss://${this.config.server}:8089/ws`,
        iceServers: [],
        userAgentString: 'Meu Softphone 1.0',
      },
      media: {
        input: { id: 'default', audioProcessing: false, volume: 1.0, muted: false },
        output: { id: 'default', volume: 1.0, muted: false },
      },
    }

    this.client = new Client(options)
    this.setupEventListeners()
    this.client.connect()
  }

  setupEventListeners() {
    // Status da conexão
    this.client.on('statusUpdate', (status) => {
      this.isConnected = status === 'connected'
      this.onStatusChange(status)
    })

    // Chamadas recebidas
    this.client.on('invite', (invite) => {
      this.currentSession = invite.session
      this.setupSessionEvents(invite.session)

      // Auto-aceitar ou mostrar interface para o usuário
      invite.session.accept()
    })
  }

  setupSessionEvents(session) {
    session.on('progress', (data) => {
      this.onCallProgress(data)
    })

    session.on('accepted', (data) => {
      this.onCallAccepted(data)
    })

    session.on('failed', (data) => {
      this.onCallFailed(data)
      this.currentSession = null
    })

    session.on('terminated', (data) => {
      this.onCallTerminated(data)
      this.currentSession = null
    })
  }

  async makeCall(number) {
    if (!this.isConnected) {
      throw new Error('Cliente não conectado')
    }

    try {
      const invite = await this.client.invite(number)
      if (invite) {
        this.currentSession = invite.session
        this.setupSessionEvents(invite.session)
        return invite.session
      }
    } catch (error) {
      console.error('Erro ao fazer chamada:', error)
      throw error
    }
  }

  async hangup() {
    if (this.currentSession) {
      await this.currentSession.terminate()
      this.currentSession = null
    }
  }

  sendDTMF(tone) {
    if (this.currentSession) {
      this.currentSession.dtmf(tone)
    }
  }

  // Callbacks para serem implementados pela aplicação
  onStatusChange(status) {
    console.log('Status mudou para:', status)
  }

  onCallProgress(data) {
    console.log('Chamada em progresso:', data)
  }

  onCallAccepted(data) {
    console.log('Chamada aceita:', data)
  }

  onCallFailed(data) {
    console.log('Chamada falhou:', data)
  }

  onCallTerminated(data) {
    console.log('Chamada encerrada:', data)
  }
}

// Uso
const phone = new XcontactPhone({
  server: 'cliente1ws.xcontactcenter.com.br',
  ramal: '1000',
  senha: '123456',
})

phone.initialize()
```

### Tratamento de Erros

```javascript
// Tratamento de erros na conexão
client.on('statusUpdate', (status) => {
  if (status === 'disconnected') {
    console.error('Conexão perdida com o servidor')
    // Implementar lógica de reconexão
  }
})

// Tratamento de erros em chamadas
try {
  const invite = await client.invite(numero)
} catch (error) {
  console.error('Erro ao fazer chamada:', error.message)
  // Mostrar mensagem de erro para o usuário
}
```

### Considerações de Segurança

1. **HTTPS Obrigatório**: WebRTC requer HTTPS em produção
2. **Validação de Entrada**: Sempre validar números de telefone
3. **Gerenciamento de Sessão**: Limpar sessões adequadamente
4. **Tratamento de Erros**: Implementar tratamento robusto de erros

---

## 🗂 Estrutura do Projeto

```
xcontact-phone-sdk-sample/
├── public/                 # Arquivos públicos
│   ├── favicon.ico
│   └── icons/
├── src/
│   ├── components/         # Componentes Vue
│   │   ├── dialPad.vue    # Teclado numérico
│   │   └── incallPopup.vue # Popup de chamada
│   ├── layouts/           # Layouts da aplicação
│   │   └── MainLayout.vue
│   ├── pages/             # Páginas da aplicação
│   │   ├── ErrorNotFound.vue
│   │   └── IndexPage.vue
│   ├── plugins/           # Plugins e SDKs
│   │   └── XcontactSDK.mjs # SDK do Xcontact
│   ├── router/            # Configuração de rotas
│   ├── state/             # Gerenciamento de estado
│   │   └── webrtc.js      # Estado do WebRTC
│   └── css/               # Estilos globais
├── .env                   # Variáveis de ambiente
├── package.json
├── quasar.config.js       # Configuração do Quasar
└── README.md
```

## 📜 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev        # Inicia servidor de desenvolvimento
npm run lint       # Executa linting do código
npm run format     # Formata o código
```

### Produção

```bash
npm run build      # Build para produção
```

### Testes

```bash
npm run test       # Executa testes (placeholder)
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🚀 Exemplos de Uso em Diferentes Frameworks

### Vue.js (Composition API)

```vue
<template>
  <div>
    <div>Status: {{ status }}</div>
    <input v-model="numero" placeholder="Digite o número" />
    <button @click="discar" :disabled="!isConnected">Discar</button>
    <button @click="desligar" v-if="emChamada">Desligar</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Client } from './plugins/XcontactSDK.mjs'

const status = ref('Desconectado')
const numero = ref('')
const emChamada = ref(false)
const isConnected = ref(false)
let client = null
let sessaoAtual = null

onMounted(() => {
  inicializarSDK()
})

function inicializarSDK() {
  const options = {
    userAgent: 'Vue Softphone 1.0',
    hackWssInTransport: true,
    account: {
      user: '1000',
      password: '123456',
      name: '1000',
      uri: '1000@servidor.com:8089',
    },
    transport: {
      wsServers: 'wss://servidor.com:8089/ws',
      iceServers: [],
    },
    media: {
      input: { id: 'default', volume: 1.0 },
      output: { id: 'default', volume: 1.0 },
    },
  }

  client = new Client(options)

  client.on('statusUpdate', (data) => {
    status.value = data === 'connected' ? 'Conectado' : 'Desconectado'
    isConnected.value = data === 'connected'
  })

  client.on('invite', (invite) => {
    sessaoAtual = invite.session
    emChamada.value = true
    invite.session.accept()

    invite.session.on('terminated', () => {
      emChamada.value = false
      sessaoAtual = null
    })
  })

  client.connect()
}

async function discar() {
  if (!client || !isConnected.value) return

  try {
    const invite = await client.invite(numero.value)
    if (invite) {
      sessaoAtual = invite.session
      emChamada.value = true

      invite.session.on('terminated', () => {
        emChamada.value = false
        sessaoAtual = null
      })
    }
  } catch (error) {
    console.error('Erro ao discar:', error)
  }
}

async function desligar() {
  if (sessaoAtual) {
    await sessaoAtual.terminate()
  }
}
</script>
```

### React (Hooks)

```jsx
import React, { useState, useEffect, useRef } from 'react'
import { Client } from './plugins/XcontactSDK.mjs'

function XcontactPhone() {
  const [status, setStatus] = useState('Desconectado')
  const [numero, setNumero] = useState('')
  const [emChamada, setEmChamada] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const clientRef = useRef(null)
  const sessaoRef = useRef(null)

  useEffect(() => {
    inicializarSDK()

    return () => {
      if (clientRef.current) {
        // Cleanup na desmontagem
      }
    }
  }, [])

  const inicializarSDK = () => {
    const options = {
      userAgent: 'React Softphone 1.0',
      hackWssInTransport: true,
      account: {
        user: '1000',
        password: '123456',
        name: '1000',
        uri: '1000@servidor.com:8089',
      },
      transport: {
        wsServers: 'wss://servidor.com:8089/ws',
        iceServers: [],
      },
      media: {
        input: { id: 'default', volume: 1.0 },
        output: { id: 'default', volume: 1.0 },
      },
    }

    clientRef.current = new Client(options)

    clientRef.current.on('statusUpdate', (data) => {
      setStatus(data === 'connected' ? 'Conectado' : 'Desconectado')
      setIsConnected(data === 'connected')
    })

    clientRef.current.on('invite', (invite) => {
      sessaoRef.current = invite.session
      setEmChamada(true)
      invite.session.accept()

      invite.session.on('terminated', () => {
        setEmChamada(false)
        sessaoRef.current = null
      })
    })

    clientRef.current.connect()
  }

  const discar = async () => {
    if (!clientRef.current || !isConnected) return

    try {
      const invite = await clientRef.current.invite(numero)
      if (invite) {
        sessaoRef.current = invite.session
        setEmChamada(true)

        invite.session.on('terminated', () => {
          setEmChamada(false)
          sessaoRef.current = null
        })
      }
    } catch (error) {
      console.error('Erro ao discar:', error)
    }
  }

  const desligar = async () => {
    if (sessaoRef.current) {
      await sessaoRef.current.terminate()
    }
  }

  return (
    <div>
      <div>Status: {status}</div>
      <input
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        placeholder="Digite o número"
      />
      <button onClick={discar} disabled={!isConnected}>
        Discar
      </button>
      {emChamada && <button onClick={desligar}>Desligar</button>}
    </div>
  )
}

export default XcontactPhone
```

### HTML/JavaScript Puro

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Xcontact Softphone</title>
  </head>
  <body>
    <div id="app">
      <div>Status: <span id="status">Desconectado</span></div>
      <input id="numero" type="text" placeholder="Digite o número" />
      <button id="discar" disabled>Discar</button>
      <button id="desligar" style="display: none;">Desligar</button>
    </div>

    <script type="module">
      import { Client } from './plugins/XcontactSDK.mjs'

      class XcontactPhone {
        constructor() {
          this.client = null
          this.sessaoAtual = null
          this.isConnected = false

          this.elementos = {
            status: document.getElementById('status'),
            numero: document.getElementById('numero'),
            discar: document.getElementById('discar'),
            desligar: document.getElementById('desligar'),
          }

          this.setupEventListeners()
          this.inicializarSDK()
        }

        setupEventListeners() {
          this.elementos.discar.addEventListener('click', () => this.discar())
          this.elementos.desligar.addEventListener('click', () => this.desligar())
        }

        inicializarSDK() {
          const options = {
            userAgent: 'HTML Softphone 1.0',
            hackWssInTransport: true,
            account: {
              user: '1000',
              password: '123456',
              name: '1000',
              uri: '1000@servidor.com:8089',
            },
            transport: {
              wsServers: 'wss://servidor.com:8089/ws',
              iceServers: [],
            },
            media: {
              input: { id: 'default', volume: 1.0 },
              output: { id: 'default', volume: 1.0 },
            },
          }

          this.client = new Client(options)

          this.client.on('statusUpdate', (data) => {
            this.isConnected = data === 'connected'
            this.elementos.status.textContent = this.isConnected ? 'Conectado' : 'Desconectado'
            this.elementos.discar.disabled = !this.isConnected
          })

          this.client.on('invite', (invite) => {
            this.sessaoAtual = invite.session
            this.updateUI(true)
            invite.session.accept()

            invite.session.on('terminated', () => {
              this.sessaoAtual = null
              this.updateUI(false)
            })
          })

          this.client.connect()
        }

        async discar() {
          if (!this.client || !this.isConnected) return

          const numero = this.elementos.numero.value
          if (!numero) return

          try {
            const invite = await this.client.invite(numero)
            if (invite) {
              this.sessaoAtual = invite.session
              this.updateUI(true)

              invite.session.on('terminated', () => {
                this.sessaoAtual = null
                this.updateUI(false)
              })
            }
          } catch (error) {
            console.error('Erro ao discar:', error)
            alert('Erro ao realizar chamada')
          }
        }

        async desligar() {
          if (this.sessaoAtual) {
            await this.sessaoAtual.terminate()
          }
        }

        updateUI(emChamada) {
          this.elementos.discar.style.display = emChamada ? 'none' : 'inline-block'
          this.elementos.desligar.style.display = emChamada ? 'inline-block' : 'none'
        }
      }

      // Inicializar quando a página carregar
      window.addEventListener('DOMContentLoaded', () => {
        new XcontactPhone()
      })
    </script>
  </body>
</html>
```

### Angular (Component)

```typescript
// xcontact-phone.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Client } from './plugins/XcontactSDK.mjs'

@Component({
  selector: 'app-xcontact-phone',
  template: `
    <div>
      <div>Status: {{ status }}</div>
      <input [(ngModel)]="numero" placeholder="Digite o número" />
      <button (click)="discar()" [disabled]="!isConnected">Discar</button>
      <button (click)="desligar()" *ngIf="emChamada">Desligar</button>
    </div>
  `,
})
export class XcontactPhoneComponent implements OnInit, OnDestroy {
  status = 'Desconectado'
  numero = ''
  emChamada = false
  isConnected = false

  private client: any = null
  private sessaoAtual: any = null

  ngOnInit() {
    this.inicializarSDK()
  }

  ngOnDestroy() {
    if (this.client) {
      // Cleanup
    }
  }

  private inicializarSDK() {
    const options = {
      userAgent: 'Angular Softphone 1.0',
      hackWssInTransport: true,
      account: {
        user: '1000',
        password: '123456',
        name: '1000',
        uri: '1000@servidor.com:8089',
      },
      transport: {
        wsServers: 'wss://servidor.com:8089/ws',
        iceServers: [],
      },
      media: {
        input: { id: 'default', volume: 1.0 },
        output: { id: 'default', volume: 1.0 },
      },
    }

    this.client = new Client(options)

    this.client.on('statusUpdate', (data: string) => {
      this.status = data === 'connected' ? 'Conectado' : 'Desconectado'
      this.isConnected = data === 'connected'
    })

    this.client.on('invite', (invite: any) => {
      this.sessaoAtual = invite.session
      this.emChamada = true
      invite.session.accept()

      invite.session.on('terminated', () => {
        this.emChamada = false
        this.sessaoAtual = null
      })
    })

    this.client.connect()
  }

  async discar() {
    if (!this.client || !this.isConnected) return

    try {
      const invite = await this.client.invite(this.numero)
      if (invite) {
        this.sessaoAtual = invite.session
        this.emChamada = true

        invite.session.on('terminated', () => {
          this.emChamada = false
          this.sessaoAtual = null
        })
      }
    } catch (error) {
      console.error('Erro ao discar:', error)
    }
  }

  async desligar() {
    if (this.sessaoAtual) {
      await this.sessaoAtual.terminate()
    }
  }
}
```

### Node.js (Server-side)

```javascript
// server.js
import { Client } from './plugins/XcontactSDK.mjs'

class XcontactServer {
  constructor(config) {
    this.config = config
    this.client = null
    this.activeSessions = new Map()
  }

  async initialize() {
    const options = {
      userAgent: 'Node.js Xcontact Server 1.0',
      hackWssInTransport: true,
      account: {
        user: this.config.ramal,
        password: this.config.senha,
        name: this.config.ramal,
        uri: `${this.config.ramal}@${this.config.server}:8089`,
      },
      transport: {
        wsServers: `wss://${this.config.server}:8089/ws`,
        iceServers: [],
      },
      media: {
        input: { id: 'default', volume: 1.0 },
        output: { id: 'default', volume: 1.0 },
      },
    }

    this.client = new Client(options)
    this.setupEventListeners()
    this.client.connect()
  }

  setupEventListeners() {
    this.client.on('statusUpdate', (status) => {
      console.log(`Status da conexão: ${status}`)
    })

    this.client.on('invite', (invite) => {
      console.log('Chamada recebida')

      // Aceitar automaticamente
      invite.session.accept()

      // Armazenar sessão
      this.activeSessions.set(invite.session.id, invite.session)

      invite.session.on('terminated', () => {
        console.log('Chamada encerrada')
        this.activeSessions.delete(invite.session.id)
      })
    })
  }

  async makeCall(numero) {
    try {
      const invite = await this.client.invite(numero)
      if (invite) {
        this.activeSessions.set(invite.session.id, invite.session)

        invite.session.on('terminated', () => {
          this.activeSessions.delete(invite.session.id)
        })

        return invite.session
      }
    } catch (error) {
      console.error('Erro ao fazer chamada:', error)
      throw error
    }
  }

  async hangupAll() {
    for (const [id, session] of this.activeSessions) {
      await session.terminate()
    }
    this.activeSessions.clear()
  }
}

// Uso
const server = new XcontactServer({
  server: 'cliente1ws.xcontactcenter.com.br',
  ramal: '1000',
  senha: '123456',
})

server.initialize()

// API REST para controle
import express from 'express'
const app = express()

app.post('/call/:numero', async (req, res) => {
  try {
    const session = await server.makeCall(req.params.numero)
    res.json({ success: true, sessionId: session.id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/hangup', async (req, res) => {
  await server.hangupAll()
  res.json({ success: true })
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
```

---

## 🆘 Suporte

Para suporte técnico ou dúvidas sobre o SDK:

- **Documentação**: Consulte esta documentação
- **Issues**: Abra uma issue no repositório
- **Email**: fer.rossato@gmail.com

---

**Desenvolvido com ❤️ usando Vue 3, Quasar Framework e Xcontact SDK**
