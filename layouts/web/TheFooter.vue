<script setup lang="ts">
function getYear(): number {
  const date = new Date();
  const currentYear = date.getFullYear();
  return currentYear;
}
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <span>
        <a href="https://github.com/yeyodev1" target="_blank">
          <i class="fa-brands fa-github"></i>
        </a>
      </span>
      <span>
        <a href="https://www.instagram.com/yeyo.dev/" target="_blank">
          <i class="fa-brands fa-instagram"></i>
        </a>
      </span>
    </div>
    <div class="yeyodev">
      <div class="yeyodev-details">
        <p>Copyright</p>
        <i class="fa-regular fa-copyright" />
        <p class="yeyodev-details-author">
          <a href="https://www.yeyo.dev/" target="_blank">YeyoDev <i class="fa-solid fa-heart" /> {{ getYear() }}</a> - Todos los derechos reservados
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  &-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    span {
      color: $white;
      font-size: $h3-font-size;
    }
  }
}
.yeyodev {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-details {
    color: $white;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
    p {
      font-size: 1rem;
      a {
        font-size: 1rem;
        color: $white;
        text-decoration: none;
        i {
          color: #DA87B1;
        }
      }
    }
    }
  }
</style>