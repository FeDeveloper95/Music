// Scaricare la traccia direttamente quando il pulsante viene cliccato
document.getElementById('download-track').addEventListener('click', function() {
  const link = document.createElement('a');
  link.href = 'Perfect_as_a_Star.mp3';
  link.download = 'Perfect_as_a_Star.mp3';
  link.click();
});
