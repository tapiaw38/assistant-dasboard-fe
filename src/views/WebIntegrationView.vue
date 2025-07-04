<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Card from 'primevue/card'
import Prism from 'prismjs'

const codeConfigBlock = ref<HTMLElement | null>(null)
const codeMethodsBlock = ref<HTMLElement | null>(null)

const codeConfig = `// Assistant with full configuration
const assistant = createAssistant({
  // API Key for the assistant (required)
  apiKey: "your-api-key",
  // API URL for the assistant server (required)
  apiBaseUrl: "your-base-url",
  // General options
  title: "My Assistant",
  placeholder: "How can I help you?",
  position: "bottom-right", // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  initialMessage: "Hello! I am your virtual assistant. How can I help you?",
  autoOpen: false, // If true, the chat will open automatically

  // Specific button options
  buttonOptions: {
    backgroundColor: "#4a90e2",
    color: "#ffffff",
    icon: "💬", // Emoticon or HTML for the button
    size: "medium", // 'small' | 'medium' | 'large'
    container: "#my-container", // Selector or element where to mount the button
  },

  // Chat theme options
  theme: {
    primaryColor: "#4a90e2", // Primary color (header and send button)
    textColor: "#333333", // General text color
    backgroundColor: "#ffffff", // Chat background color
    userMessageBgColor: "#4a90e2", // User message background color
    userMessageTextColor: "#ffffff", // User message text color
    assistantMessageBgColor: "#f1f1f1", // Assistant message background color
    assistantMessageTextColor: "#333333", // Assistant message text color
    inputBorderColor: "#e0e0e0", // Input border color
    inputBgColor: "#ffffff", // Input background color
    inputTextColor: "#333333", // Input text color
  },
});
`

const codeMethods = `// Open the chat
assistant.open();

// Close the chat
assistant.close();

// Toggle between open/closed
assistant.toggle();

// Check if it's open
const isOpen = assistant.isOpen();

// Hide the floating button (for example, when using your own button)
assistant.hideButton();

// Show the floating button
assistant.showButton();

// Unmount the assistant (remove from the DOM)
assistant.unmount();
`

onMounted(() => {
  if (codeConfigBlock.value) {
    codeConfigBlock.value.innerHTML = codeConfig
    Prism.highlightElement(codeConfigBlock.value)
  }
  if (codeMethodsBlock.value) {
    codeMethodsBlock.value.innerHTML = codeMethods
    Prism.highlightElement(codeMethodsBlock.value)
  }
})

watch(codeConfigBlock, (newValue) => {
  if (newValue) {
    Prism.highlightElement(newValue)
  }
})
watch(codeMethodsBlock, (newValue) => {
  if (newValue) {
    Prism.highlightElement(newValue)
  }
})
</script>

<template>
  <div class="web-integration-view">
    <div class="content-container">
      <div class="flex flex-column gap-2 align-items-start justify-content-center">
        <span class="text-2xl text-gray-500 font-bold">Integración Web</span>

        <Card class="mt-4 p-3 flex justify-content-center align-items-center">
          <template #header>
            <span class="text-lg font-bold">Integración con aplicaciones y sitios Web</span>
          </template>
          <template #content>
            <div class="flex flex-col gap-4">
              <p class="text-gray-500">
                La integración web consiste en agregar un chat a tu página web para interactuar con
                el asistente. Puedes personalizar el chat para que se ajuste a la estética de tu
                página web.
                <br />
              </p>
            </div>
          </template>
        </Card>
        <div class="config-container align-items-start justify-content-start mt-2">
          <Card>
            <template #title>
              <div class="flex justify-content-center flex-row">
                <span class="font-bold text-2xl text-gray-500">Configuración</span>
              </div>
            </template>
            <template #content>
              <div class="flex flex-column gap-2 code-section">
                <div class="flex flex-column gap-2">
                  <p class="text-1xl text-bold text-gray-500">
                    Base URL:
                    <code class="text-sm font-bold text-primary">assistant.nymia.com.ar</code>
                  </p>
                </div>

                <div class="flex flex-column gap-2">
                  <p class="text-1xl text-bold text-gray-500">
                    Paquete NPM:
                    <a
                      href="https://www.npmjs.com/package/nymia-ai-assistant"
                      target="_blank"
                      class="font-ligth"
                      >nymia assistant</a
                    >
                  </p>
                </div>

                <div class="flex flex-column gap-2">
                  <p class="text-1xl text-bold text-gray-500">
                    Crea tu api key en:
                    <RouterLink to="/my-account" class="font-ligth">Mi cuenta</RouterLink>
                  </p>
                </div>
                <div class="code-container">
                  <pre class="language-javascript">
                    <code ref="codeConfigBlock" class="language-javascript" v-pre></code>
                  </pre>
                </div>
              </div>
            </template>
          </Card>

          <Card>
            <template #title>
              <div class="flex justify-content-center flex-row">
                <span class="font-bold text-2xl text-gray-500">Métodos</span>
              </div>
            </template>
            <template #content>
              <div class="flex flex-column gap-2 code-section">
                <div class="code-container">
                  <pre class="language-javascript">
                      <code class="language-javascript" ref="codeMethodsBlock" v-pre></code>
                    </pre>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.web-integration-view {
  margin: 2rem auto;
  width: 100%;
  max-width: 1400px;
  padding: 2rem;
  min-height: 100vh;
  overflow-x: hidden;
}

.content-container {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}

.config-container {
  display: grid;
  gap: 2rem;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.code-section {
  width: 100%;
}

.code-container {
  width: 100%;
  border-radius: 8px;
  background-color: #f8f9fa;
}

pre {
  margin: 0;
  padding: 1rem;
  max-width: 100%;
  overflow-x: auto;
}

code {
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

:deep(.p-card) {
  width: 100%;
}

:deep(.p-card-content) {
  padding: 1rem;
}
</style>
