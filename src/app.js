document.body.innerHTML = '<canvas></canvas1>';
canvas = document.querySelector('canvas');

canvas.style = 'border: 1px solid black';
canvas.width = 600;
canvas.height = 300;

ctx = canvas.getContext('2d');


l = console.log

line = (p1, p2) => {
  ctx.moveTo(p1[0], p1[1]);
  ctx.lineTo(p2[0], p2[1]);
}

mark = p => {
  line([p[0] - 5, p[1]], [p[0] + 5, p[1]]);
  line([p[0], p[1] - 5], [p[0], p[1] + 5]);
}



vadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
vsub = (a, b) => [a[0] - b[0], a[1] - b[1]];
cmul = (c, v) => [c * v[0], c * v[1]];

dot = (a, b) => [a[0] * b[0] + a[1] * b[1]]

proj = (a, b) => {
  let c = dot(a, b) / dot(b, b);
  return [b[0] * c, b[1] * c];
}

orth = (a, b) => vsub(a, proj(a, b));

norm = v => Math.sqrt(dot(v, v));

cross = (a, b, c, d) => {
  ab = vsub(b, a);
  ac = vsub(c, a);
  ad = vsub(d, a);
  cx = norm(proj(ac, ab));
  cy = norm(orth(ac, ab));
  dx = norm(proj(ad, ab));
  dy = norm(orth(ad, ab));
  px = cy*(dx - cx)/(cy + dy) + cx;
  return vadd(a, cmul(px/norm(ab), ab));
}
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.beginPath();
a = [50, 50]
b = [200, 180]
c = [50, 100]
d = [200, 30]
line(a, b)
line(c, d)
mark(cross(a, b, c, d));
ctx.closePath();
ctx.stroke();

/*
 * line intersection
 * line and point symmetry reflection
 * circle inversion
 * line extension to the whole canvas
 * logarithmic spirals
 * logarithmic spiral sections
*/
