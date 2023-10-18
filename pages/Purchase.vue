<template>
  <div class="section">
    <p class="section-title">
      ¡Gracias por enviarnos tus datos!
    </p>
    <p class="section-title">
      Por favor, YAPEAR S/ 10 al 906894857 ¡Envíanos la captura de pantalla del pago por WhatsApp al mismo número, y te enviaremos tu video! <a href="/" class="number">+593 349494949</a>
    </p>
    <img 
      src="@/assets/qr-code.jpg" 
      alt="Código de pago" 
      class="section-image">
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
    text-align: center;
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