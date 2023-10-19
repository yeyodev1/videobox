let currentBrightness = 1;  
let currentContrast = 1;  

export function adjustBrightness(videoElement: HTMLVideoElement, delta: number) {
  currentBrightness = Math.max(0, currentBrightness + delta);  
  videoElement.style.filter = `brightness(${currentBrightness}) contrast(${currentContrast})`;
}

export function adjustContrast(videoElement: HTMLVideoElement, delta: number) {
  currentContrast = Math.max(0, currentContrast + delta);  
  videoElement.style.filter = `brightness(${currentBrightness}) contrast(${currentContrast})`;
}