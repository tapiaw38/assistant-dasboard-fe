<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'
import Button from 'primevue/button'
import Card from 'primevue/card'
import AppFooter from '@/components/core/shared/AppFooter/AppFooter.vue'
import { createAssistant } from 'seely-ai-assistant'

const router = useRouter()

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const hero = ref<HTMLElement | null>(null)
const features = ref<HTMLElement | null>(null)
const featuresText1 = ref<HTMLElement | null>(null)
const featuresText2 = ref<HTMLElement | null>(null)
const howItWorks = ref<HTMLElement | null>(null)
const cta = ref<HTMLElement | null>(null)
const plans = ref<HTMLElement | null>(null)
const arrow = ref<HTMLElement | null>(null)

const featuresList = [
  {
    icon: '🧠',
    title: 'Recomendaciones inteligentes',
    text: 'Aumenta la conversión con sugerencias personalizadas.',
  },
  {
    icon: '🤖',
    title: 'Soporte automatizado',
    text: 'Chatbot 24/7 que responde y asiste a tus clientes.',
  },
  {
    icon: '⚙️',
    title: 'Fácil integración',
    text: 'Instala el paquete npm y actívalo en minutos.',
  },
]

const steps = [
  'Regístrate y configura tu cuenta.',
  'Configura el bot de soporte.',
  'Instala el paquete npm y listo.',
  'Observa cómo aumentan tus ventas.',
]

onMounted(() => {
  const fadeUp = (el: Element) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      },
    })
  }

  if (hero.value) {
    gsap.from(hero.value.children, {
      opacity: 0,
      y: 30,
      stagger: 0.3,
      duration: 1,
    })
  }

  if (features.value) {
    gsap.from(features.value.querySelectorAll('.feature-box'), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: features.value,
        start: 'top 85%',
      },
    })
  }

  if (featuresText1.value) {
    gsap.fromTo(
      featuresText1.value,
      { opacity: 0, text: '' },
      {
        opacity: 1,
        duration: 2,
        text: {
          value: featuresText1.value.textContent || 'Texto de prueba',
          delimiter: '',
        },
        scrollTrigger: {
          trigger: featuresText1.value,
          start: 'left 85%',
        },
      },
    )
  }

  if (featuresText2.value) {
    gsap.fromTo(
      featuresText2.value,
      { opacity: 0, text: '' },
      {
        opacity: 1,
        duration: 2,
        text: {
          value: featuresText2.value.textContent || 'Texto de prueba',
          delimiter: '',
        },
        scrollTrigger: {
          trigger: featuresText2.value,
          start: 'top 85%',
        },
      },
    )
  }

  if (howItWorks.value) {
    gsap.from(howItWorks.value.querySelectorAll('.step'), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: howItWorks.value,
        start: 'top 85%',
      },
    })
  }

  if (cta.value) {
    gsap.from(cta.value.children, {
      opacity: 0,
      y: 30,
      stagger: 0.3,
      duration: 1,
    })
  }

  if (plans.value) {
    gsap.from(plans.value.querySelectorAll('.card'), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: plans.value,
        start: 'top 85%',
      },
    })
  }

  if (arrow.value) {
    gsap.from(arrow.value, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(arrow.value, {
          y: '+=10',
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      },
    })
  }

  fadeUp(howItWorks.value!)
  fadeUp(cta.value!)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let assistant: any = null

onMounted(() => {
  const initializeAssistant = () => {
    assistant = createAssistant({
      apiKey: import.meta.env.VITE_SEELY_API_KEY,
      apiBaseUrl: import.meta.env.VITE_SEELY_API_BASE_URL,
      title: 'Seely',
      placeholder: 'Escribe tu mensaje aquí...',
      position: 'bottom-right',
      initialMessage: 'Hola, ¿en qué puedo ayudarte?',
      buttonOptions: {
        backgroundColor: '#9333ea',
        color: '#ffffff',
        icon: '<i class="pi pi-comments"></i>',
        size: 'medium',
      },
      theme: {
        primaryColor: '#9333ea',
        textColor: '#424242',
        backgroundColor: '#ffffff',
        userMessageBgColor: '#9333ea',
        userMessageTextColor: '#ffffff',
        assistantMessageBgColor: '#f3e5f5',
        assistantMessageTextColor: '#4a148c',
        inputBorderColor: '#9333ea',
        inputBgColor: '#f5f0ff',
        inputTextColor: '#4a148c',
      },
    })
  }

  initializeAssistant()
})

onBeforeUnmount(() => {
  if (assistant) {
    assistant.unmount()
  }
})

function scrollToSection() {
  features.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="surface-ground text-color font-sans">
    <!-- HERO -->
    <section
      ref="hero"
      class="min-h-screen flex flex-column align-items-center justify-content-center text-center p-6 hero-bg"
    >
      <h1 class="text-5xl font-bold mb-4">
        Impulsa tu eCommerce con <code class="font-light">Seely</code>
      </h1>
      <p class="text-xl mb-6">El asistente virtual que aumenta tus ventas y automatiza tu tienda</p>
      <div
        class="flex flex-column gap-2 absolute bottom-0 right-0 left-0 mb-8 pb-8"
        @click="scrollToSection()"
      >
        <label for="scrollToSection" class="font-bold cursor-pointer">Ver más</label>
        <i ref="arrow" class="pi pi-arrow-down font-bold text-1sm cursor-pointer"></i>
      </div>
    </section>

    <!-- FEATURES -->
    <section
      ref="features"
      class="flex flex-column py-8 px-4 max-w-6xl mx-auto justify-content-center align-items-center"
    >
      <h2 class="text-3xl text-center mb-8">¿Por qué elegir Seely?</h2>

      <p class="text-lg font-bold mb-2 mx-3" ref="featuresText1">
        Seely, es un asistente virtual que puedes integrar a tu aplicacion web de manera simple y
        responde a tus clientes de manera más eficiente sobre productos y servicios que ofreces.
      </p>

      <p class="text-lg font-bold mb-8 mx-3" ref="featuresText2">
        Seely tambien puede enviarte preguntas de los clientes que no esten en el contexto de tu
        negocio, mediante un chatbot que sera intermediario entre tus clientes y tu.
      </p>

      <div class="flex flex-wrap justify-content-center gap-4">
        <Card
          class="feature-box w-72 text-center"
          v-for="(item, index) in featuresList"
          :key="index"
        >
          <template #title>
            <span class="text-3xl">{{ item.icon }}</span>
            <h3 class="mt-3 text-lg font-semibold">{{ item.title }}</h3>
          </template>
          <template #content>
            <p>{{ item.text }}</p>
          </template>
        </Card>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section ref="howItWorks" class="how-it-works py-8 px-4 max-w-4xl mx-auto">
      <h2 class="text-3xl text-center mb-6 font-bold">¿Cómo funciona?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 align-items-center justify-content-center">
        <div
          class="flex flex-row justify-content-center align-items-center gap-4 step"
          v-for="(step, index) in steps"
          :key="index"
        >
          <div
            class="text-2xl font-bold bg-primary text-white rounded-full flex step-circle"
            ref="stepCircle"
          >
            {{ index + 1 }}
          </div>
          <p class="text-lg step-text font-light">{{ step }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section
      ref="cta"
      class="cta text-center bg-purple-900 text-white p-8 rounded-xl mx-4 md:mx-auto md:max-w-4xl mt-12"
    >
      <div class="flex flex-column align-items-center mt-5 mb-5">
        <h2 class="text-3xl font-bold mb-6">¿Listo para vender más con IA?</h2>
        <p class="text-lg mb-6 font-light">
          Prueba gratis por un mes con el plan Básico y descubre cómo Seely puede transformar tu
          negocio.
        </p>
      </div>
      <div
        class="flex flex-column md:flex-row align-items-center justify-content-center gap-6 my-6"
      >
        <div class="flex align-items-center gap-3">
          <span class="text-4xl">🤖</span>
          <p class="text-lg font-light">
            La IA es el futuro de las ventas, transformando tu negocio para adaptarse y prosperar.
          </p>
        </div>
        <div class="flex align-items-center gap-3">
          <span class="text-4xl">🚀</span>
          <p class="text-lg font-light">
            Impulsa tus ventas con recomendaciones inteligentes y personalizadas que conectan con
            tus clientes.
          </p>
        </div>
        <div class="flex align-items-center gap-3">
          <span class="text-4xl">💼</span>
          <p class="text-lg font-light">
            Haz más efectivas tus ventas con la funcionalidad de chatear con los usuarios para
            responder preguntas específicas.
          </p>
        </div>
      </div>
      <RouterLink to="/auth">
        <Button label="Pruebalo gratis" class="p-button-lg p-button-warning font-bold" />
      </RouterLink>
    </section>

    <!-- PLANS -->
    <section class="flex flex-column py-8 px-4 max-w-6xl mx-auto">
      <h2 class="text-3xl text-center mb-8 font-bold">Planes para todos los negocios</h2>
      <div
        class="plans grid grid-cols-1 md:grid-cols-3 gap-6 justify-content-center align-content-center"
        ref="plans"
      >
        <Card class="text-center card p-4">
          <template #title>
            <h3 class="text-xl font-bold">Free Beta</h3>
          </template>
          <template #content>
            <p class="text-lg font-light mb-4">Ideal para probar Seely.</p>
            <p class="text-2xl font-bold mb-4">$0/mes</p>
            <ul class="text-left mb-4">
              <li>✔ 1 Bot de soporte</li>
              <li>✔ Hasta 100 interacciones</li>
              <li>✔ Integración básica</li>
            </ul>
            <Button
              label="Probar gratis"
              class="p-button-success font-bold"
              @click="router.push('/auth')"
            />
          </template>
        </Card>

        <Card class="text-center card p-4 bg-black-alpha-10 text-gray-400">
          <template #title>
            <h3 class="text-xl font-bold">Básico</h3>
          </template>
          <template #content>
            <p class="text-lg font-light mb-4">Ideal para pequeños negocios.</p>
            <p class="text-2xl font-bold mb-4">$9.99/mes</p>
            <ul class="text-left mb-4">
              <li>✔ 1 Bot de soporte</li>
              <li>✔ Hasta 1,000 interacciones</li>
              <li>✔ Integración básica</li>
            </ul>
            <Button label="Elegir plan" class="p-button-success font-bold" disabled />
          </template>
        </Card>

        <Card class="text-center card p-4 bg-black-alpha-10 text-gray-400">
          <template #title>
            <h3 class="text-xl font-bold">Pro</h3>
          </template>
          <template #content>
            <p class="text-lg font-light mb-4">Para negocios en crecimiento.</p>
            <p class="text-2xl font-bold mb-4">$29.99/mes</p>
            <ul class="text-left mb-4">
              <li>✔ 3 Bots de soporte</li>
              <li>✔ Hasta 10,000 interacciones</li>
              <li>✔ Integración avanzada</li>
            </ul>
            <Button label="Elegir plan" class="p-button-warning font-bold" disabled />
          </template>
        </Card>

        <Card class="text-center card p-4 bg-black-alpha-10 text-gray-400">
          <template #title>
            <h3 class="text-xl font-bold">Premium</h3>
          </template>
          <template #content>
            <p class="text-lg font-light mb-4">Para grandes empresas.</p>
            <p class="text-2xl font-bold mb-4">$99.99/mes</p>
            <ul class="text-left mb-4">
              <li>✔ Bots ilimitados</li>
              <li>✔ Interacciones ilimitadas</li>
              <li>✔ Soporte prioritario</li>
              <li>✔ Integración con WhatsApp Business</li>
            </ul>
            <Button label="Elegir plan" class="p-button-danger font-bold" disabled />
          </template>
        </Card>
      </div>
    </section>

    <!-- FOOTER -->
    <AppFooter />
  </div>
</template>

<style scoped>
.feature-box :deep(.p-card) {
  transition: transform 0.3s ease;
}
.feature-box:hover :deep(.p-card) {
  transform: translateY(-5px);
}

.hero-bg {
  background: linear-gradient(135deg, #dbf342, #9333ea);
  color: white;
}

.cta {
  background: linear-gradient(180deg, #0ff31a, #9333ea);
}

.step-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  width: 60px !important;
  height: 60px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.step-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .hero-bg {
    background: linear-gradient(135deg, #dbf342, #9333ea);
    color: white;
  }

  .how-it-works {
    font-size: 1.5rem !important;

    .step {
      font-size: 1rem !important;
    }

    .step-circle {
      font-size: 1rem !important;
      width: 30px !important;
      height: 30px !important;
    }
  }

  .cta {
    padding: 10px !important;
    margin: 0 !important;
    background: linear-gradient(135deg, #dbf342, #9333ea);
    color: white;

    h2 {
      font-size: 1.2rem !important;
      color: white;
    }

    p {
      font-size: 1rem !important;
      color: white;
    }
  }

  .plans {
    display: flex;
    flex-direction: column;
    gap: 10px !important;

    .card {
      max-width: 70% !important;
      padding: 10px !important;
      margin: 0 !important;
      width: 100% !important;

      h3 {
        font-size: 1rem !important;
      }

      p {
        font-size: 1rem !important;
      }

      li {
        font-size: 1rem !important;
      }
    }
  }
}
</style>
