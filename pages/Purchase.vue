<script setup>
const copyToClipboard = (event) => {
  const range = document.createRange();
  range.selectNode(event.target);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
  alert('Número copiado al portapapeles');
};
</script>

<template>
  <div class="section">
    <p class="section-title">
      ¡Gracias por enviarnos tus datos!
    </p>
    <p class="section-title">
      Por favor, YAPEAR S/ 10 al <span class="number" @click="copyToClipboard"> 906894857</span> ¡Envíanos la captura de pantalla del pago por WhatsApp al mismo número, y te enviaremos tu video! <a href="https://api.whatsapp.com/send/?phone=51906894857&text=Estoy+interesado+en+adquirir+un+video&type=phone_number&app_absent=0" class="number">+51 906 894 857</a>
    </p>
    <img 
      src="@/assets/qr-code.jpg" 
      alt="Código de pago" 
      class="section-image">
    <p class="section-title">
      Cualquier consulta, escribenos al WhatsApp o Instagram!
    </p>
    <p class="section-icons">
      <a href="https://www.instagram.com/videobox.pe?igshid=MjEwN2IyYWYwYw%3D%3D">
        <i class="fa-brands fa-instagram" />
      </a>
      <a href="https://api.whatsapp.com/send/?phone=51906894857&text=Estoy+interesado+en+adquirir+un+video&type=phone_number&app_absent=0">
      <i class="fa-brands fa-whatsapp" />
      </a>
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
    text-align: center;
    .number {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &-image {
    width: 100%;
    border-radius: 8px;
    @media (min-width: $mobile-lower-breakpoint) {
      max-width: $mobile-lower-breakpoint;
    }
  }
  &-icons {
    font-size: $h2-font-size;
    text-align: center;
    display: flex;
    gap: 16px;
  }
}
</style>