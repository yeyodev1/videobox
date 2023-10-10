<template>
  <div class="section">
    <p class="section-title">
      Envía tu pago mediante el siguiente código QR
    </p>
    <img 
      src="@/assets/qr-code.jpg" 
      alt="Código de pago" 
      class="section-image">
    <p class="section-title">
      Después envía la captura al siguiente WhatsApp: <a href="/" class="number">+593 349494949></a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.section {
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  &-title {
    font-size: $body-font-size;
    .number {
      text-decoration: underline;
    }
  }
  &-image {
    width: 100%;
    border-radius: 8px;
    @media (min-width: $mobile-lower-breakpoint) {
      max-width: $mobile-lower-breakpoint;
    }
  }
}
</style>