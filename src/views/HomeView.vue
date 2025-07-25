<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import Button from "primevue/button";
import Card from "primevue/card";
import AppFooter from "@/components/core/shared/AppFooter/AppFooter.vue";
import ContactForm from "@/components/core/ContactForm/ContactForm.vue";

const router = useRouter();

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const hero = ref<HTMLElement | null>(null);
const features = ref<HTMLElement | null>(null);
const featuresText1 = ref<HTMLElement | null>(null);
const featuresText2 = ref<HTMLElement | null>(null);
const howItWorks = ref<HTMLElement | null>(null);
const cta = ref<HTMLElement | null>(null);
const plans = ref<HTMLElement | null>(null);
const arrow = ref<HTMLElement | null>(null);

const featuresList = [
  {
    icon: "🧠",
    title: "Conversaciones inteligentes",
    text: "Respuestas precisas y relevantes para tus clientes.",
  },
  {
    icon: "🤖",
    title: "Soporte automatizado",
    text: "Resuelve problemas comunes sin intervención humana.",
  },
  {
    icon: "⚙️",
    title: "Fácil integración",
    text: "Conéctalo a tu sitio web o aplicación en minutos.",
  },
];

const steps = [
  "Regístrate y configura tu cuenta.",
  "Crea tu asistente virtual.",
  "Elige las integraciones que necesitas.",
  "Deja que Nymia trabaje por ti.",
];

onMounted(() => {
  const code = router.currentRoute.value.query.code;
  if (code) {
    console.log("Query param code:", code);
  }

  const fadeUp = (el: Element) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      },
    });
  };

  if (hero.value) {
    gsap.from(hero.value.children, {
      opacity: 0,
      y: 30,
      stagger: 0.3,
      duration: 1,
    });
  }

  if (features.value) {
    gsap.from(features.value.querySelectorAll(".feature-box"), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: features.value,
        start: "top 85%",
      },
    });
  }

  if (featuresText1.value) {
    gsap.fromTo(
      featuresText1.value,
      { opacity: 0, text: "" },
      {
        opacity: 1,
        duration: 2,
        text: {
          value: featuresText1.value.textContent || "Texto de prueba",
          delimiter: "",
        },
        scrollTrigger: {
          trigger: featuresText1.value,
          start: "left 85%",
        },
      }
    );
  }

  if (featuresText2.value) {
    gsap.fromTo(
      featuresText2.value,
      { opacity: 0, text: "" },
      {
        opacity: 1,
        duration: 2,
        text: {
          value: featuresText2.value.textContent || "Texto de prueba",
          delimiter: "",
        },
        scrollTrigger: {
          trigger: featuresText2.value,
          start: "top 85%",
        },
      }
    );
  }

  if (howItWorks.value) {
    gsap.from(howItWorks.value.querySelectorAll(".step"), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: howItWorks.value,
        start: "top 85%",
      },
    });
  }

  if (cta.value) {
    gsap.from(cta.value.children, {
      opacity: 0,
      y: 30,
      stagger: 0.3,
      duration: 1,
    });
  }

  if (plans.value) {
    gsap.from(plans.value.querySelectorAll(".card"), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: plans.value,
        start: "top 85%",
      },
    });
  }

  if (arrow.value) {
    gsap.from(arrow.value, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(arrow.value, {
          y: "+=10",
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      },
    });
  }

  fadeUp(howItWorks.value!);
  fadeUp(cta.value!);
});

function scrollToSection() {
  features.value?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <div class="surface-ground text-color font-sans home-view">
    <!-- HERO -->
    <section
      ref="hero"
      class="min-h-screen flex flex-column align-items-center justify-content-center text-center p-6 hero-bg"
    >
      <h1 class="text-5xl font-bold mb-4">
        Automatiza tu negocio con <code class="font-light">Nymia</code>
      </h1>
      <p class="text-xl mb-6">
        El asistente virtual que aumenta productividad y mejora la experiencia de tus
        clientes
      </p>
      <div
        class="flex flex-column gap-2 absolute bottom-0 right-0 left-0 mb-5"
        @click="scrollToSection()"
      >
        <label
          for="scrollToSection"
          class="absolute left-0 bottom-100 right-0 font-bold cursor-pointer"
          >Ver más</label
        >
        <i
          ref="arrow"
          class="pi pi-arrow-down left-0 bottom-0 right-0 font-bold text-1sm cursor-pointer"
        ></i>
      </div>
    </section>

    <!-- FEATURES -->
    <section
      ref="features"
      class="flex flex-column py-8 px-4 max-w-6xl mx-auto justify-content-center align-items-center"
    >
      <h2 class="text-3xl text-center mb-8">¿Por qué elegir Nymia?</h2>

      <p class="text-lg font-bold mb-2 mx-3" ref="featuresText1">
        En <code>Nymia</code>, brindamos una plataforma y servicios diseñados para que
        puedas integrar inteligencia artificial en tu sitio web, canales de atención o
        sistemas de trabajo.
      </p>

      <p class="text-lg font-bold mb-8 mx-3" ref="featuresText2">
        Nuestro enfoque se basa en automatizar tareas, mejorar la experiencia del cliente
        y aumentar la eficiencia operativa mediante soluciones adaptadas a tu industria y
        forma de trabajo.
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
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 align-items-center justify-content-center"
      >
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
        <h2 class="text-3xl font-bold mb-6">¿Listo para integrar IA en tu aplicación?</h2>
        <p class="text-lg mb-6 font-light">
          Prueba gratis por 15 dias el plan Básico y descubre cómo Nymia puede transformar
          tu negocio.
        </p>
      </div>
      <div
        class="flex flex-column md:flex-row align-items-center justify-content-center gap-6 my-6"
      >
        <div class="flex align-items-center gap-3">
          <span class="text-4xl">🤖</span>
          <p class="text-lg font-light">
            La IA de Nymia está diseñada para aprender y adaptarse a las necesidades de tu
            negocio.
          </p>
        </div>
        <div class="flex align-items-center gap-3">
          <span class="text-4xl">🚀</span>
          <p class="text-lg font-light">
            Impulsa tu negocio con la integración de IA y automatiza tareas repetitivas.
          </p>
        </div>
        <div class="flex align-items-center gap-3">
          <span class="text-4xl">💼</span>
          <p class="text-lg font-light">
            Haz más efectivo tu equipo y mejora la experiencia del cliente con Nymia.
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
        <Card class="text-center plan-card p-4">
          <template #title>
            <h3 class="text-xl font-bold">Free Beta x10 dias</h3>
          </template>
          <template #content>
            <p class="text-lg font-light mb-4">Ideal para probar Nymia.</p>
            <p class="text-2xl font-bold mb-4">$0/mes</p>
            <ul class="text-left mb-4">
              <li>✔ Asistente inteligente</li>
              <li>✔ Comprensión contextual</li>
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

        <Card class="text-center plan-card p-4 bg-black-alpha-10 text-gray-400">
          <template #title>
            <h3 class="text-xl font-bold">Básico</h3>
          </template>
          <template #content>
            <p class="text-lg font-light mb-4">Ideal para pequeños negocios.</p>
            <p class="text-2xl font-bold mb-4">$19.99/mes</p>
            <ul class="text-left mb-4">
              <li>✔ Asistente inteligente</li>
              <li>✔ Comprensión contextual</li>
              <li>✔ Hasta 1,000 interacciones</li>
              <li>✔ Integración básica</li>
            </ul>
            <Button label="Elegir plan" class="p-button-success font-bold" disabled />
          </template>
        </Card>

        <Card class="text-center plan-card p-4 bg-black-alpha-10 text-gray-400">
          <template #title>
            <h3 class="text-xl font-bold">Pro</h3>
          </template>
          <template #content>
            <p class="text-lg font-light mb-4">Para negocios en crecimiento.</p>
            <p class="text-2xl font-bold mb-4">$49.99/mes</p>
            <ul class="text-left mb-4">
              <li>✔ Asistentes inteligentes</li>
              <li>✔ Comprensión contextual</li>
              <li>✔ Procesamiento de datos</li>
              <li>✔ Hasta 10,000 interacciones</li>
              <li>✔ Integración básica</li>
            </ul>
            <Button label="Elegir plan" class="p-button-warning font-bold" disabled />
          </template>
        </Card>

        <Card class="text-center plan-card p-4 bg-black-alpha-10 text-gray-400">
          <template #title>
            <h3 class="text-xl font-bold">Premium</h3>
          </template>
          <template #content>
            <p class="text-lg font-light mb-4">Para grandes empresas.</p>
            <p class="text-2xl font-bold mb-4">$99.99/mes</p>
            <ul class="text-left mb-4">
              <li>✔ Asistentes inteligentes</li>
              <li>✔ Comprensión contextual</li>
              <li>✔ Procesamiento de datos</li>
              <li>✔ Interacciones ilimitadas</li>
              <li>✔ Soporte prioritario</li>
              <li>✔ WhatsApp Business</li>
            </ul>
            <Button label="Elegir plan" class="p-button-danger font-bold" disabled />
          </template>
        </Card>
      </div>
    </section>

    <!-- CONTACT FORM -->
    <section
      class="flex flex-column justify-content-center align-items-center py-2 px-4 max-w-6xl mx-auto"
    >
      <h2 class="text-3xl text-center mb-8 font-bold">Contáctanos</h2>
      <ContactForm />
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
  background-image: url("@/assets/icons/nymia-icon.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: overlay;
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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
  }

  .plan-card {
    max-width: 70%;
    padding: 10px;
    margin: 0;
    width: 100%;
    max-width: 320px;
    min-width: 280px;

    h3 {
      font-size: 1rem;
    }

    p {
      font-size: 1rem;
    }

    li {
      font-size: 1rem;
      list-style: none !important;
    }
  }
}
</style>
