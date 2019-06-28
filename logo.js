//   LOGO
var canvas, context;
canvas = document.getElementById('canvas');

if (canvas.getContext) {

  context = canvas.getContext('2d');

  var g1 = context.createRadialGradient(
      160, // X coordinate of grad. start
      120, // Y coordinate of grad. start
      0,   // Radius of the start circle
      320, // X coordinate of grad. end
      220, // Y coordinate of grad. end
      300);// Radius of the end circle
  g1.addColorStop(0, '#ffffff');
  g1.addColorStop(1, '#999999');

  // base circle
  context.lineWidth = 0;
  context.strokeStyle = '#000000';
  context.fillStyle = g1;
  context.beginPath();
  context.arc(
      101,        // X coordinate of arc start
      90,        // Y coordinate of arc start
      50,        // Radius
      0,          // Start angle
      Math.PI * 2,// End angle
      true);      // Anticlockwise

  context.stroke();

  var g2 = context.createRadialGradient(360,
                                        320,
                                        0,
                                        260,
                                        220,
                                        200);

  g2.addColorStop(0, '#ffffff');
  g2.addColorStop(1, '#999999');

  // inner circle
  context.fillStyle = g2;
  context.beginPath();
  context.arc(101,
              90,
              80,
              0,
              Math.PI * 2,
              true);
  context.stroke();

  context.fillStyle = 'rgba(000, 000, 000, 0.5)';
  context.font = '90px Arial';
  context.fillText('G', 65, 120);
}