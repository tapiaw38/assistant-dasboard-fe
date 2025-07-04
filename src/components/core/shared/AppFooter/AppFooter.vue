<script setup lang="ts">
const currentYear = new Date().getFullYear()
const socialLinks = [
  {
    icon: 'pi pi-facebook',
    url: 'https://www.facebook.com/nymia-app',
  },
  {
    icon: 'pi pi-twitter',
    url: 'https://twitter.com/nymia-app',
  },
  {
    icon: 'pi pi-instagram',
    url: 'https://www.instagram.com/nymia-app',
  },
  {
    icon: 'pi pi-linkedin',
    url: 'https://www.linkedin.com/company/nymia-app',
  },
]
</script>

<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <p>&copy; {{ currentYear }} Nymia App. All rights reserved.</p>
        </div>
        <div class="footer-section">
          <ul class="social-links">
            <li v-for="link in socialLinks" :key="link.url">
              <a :href="link.url">
                <i :class="link.icon" />
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-section">
          <ul class="footer-links">
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: #f8f9fa;
  padding: 2rem 0;
  text-align: center;
  font-size: 0.875rem;
  color: #6c757d;
}

.app-footer .container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.footer-section {
  margin: 0.5rem 0;
}

.social-links {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}

.social-links li a {
  color: #6c757d;
  font-size: 1.25rem;
  transition: color 0.3s;
}

.social-links li a:hover {
  color: #007bff;
}

.footer-links {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}

.footer-links li a {
  color: #6c757d;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links li a:hover {
  color: #007bff;
}

@media (max-width: 768px) {
  .app-footer {
    padding: 1rem 0;
    text-align: center;
    font-size: 0.75rem;
    color: #6c757d;
  }

  .app-footer .container {
    max-width: 100%;
    margin: 0 auto;
  }

  .footer-content {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .footer-section {
    margin: 0.5rem 0;
  }
}
</style>
