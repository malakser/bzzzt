document.body.innerHTML = '<canvas></canvas1>';
canvas = document.querySelector('canvas');

canvas.style = 'border: 1px solid black';
canvas.width = 600;
canvas.height = 300;

ctx = canvas.getContext('2d');



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

line = ([p1, p2]) => {
  ctx.moveTo(p1[0], p1[1]);
  ctx.lineTo(p2[0], p2[1]);
}

mark = p => {
  line([vsub(p, [5, 0]), vadd(p, [5, 0])]);
  line([vsub(p, [0, 5]), vadd(p, [0, 5])]);
}


cross = ([a, b], [c, d]) => {
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

P = cross;

E = (l1, l2) => [l1[0], cross(l1, l2)];
E2 = (l1, l2) =>E([l1[1], l1[0]], l2);// [cross(l1, l2), l1[1]];
//TODO what about parallel edge case

w = canvas.width;
h = canvas.height;


ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.beginPath();
g =  [[0, h], [w, h]];
s =  [[0, 0], [w, 0]];
v1 = [0.1*w, 0.2*h];
v2 = [0.9*w, 0.2*h];
p1 = [0.5*w, 0.6*h];
p2 = [0.5*w, 0.85*h];
l1 = E([v1, p1], g);
l2 = E([v2, p1], g);
l3 = E([v1, p2], g);
l4 = E([v2, p2], g);
p3 = P(l1, l4);
p4 = P(l2, l3);
pc = P([p1, p2], [p3, p4]);
l5 = E([v1, pc], g);
l6 = E([v2, pc], g);
p5 = P(l5, l2);
p6 = P(l6, l1);
p7 = P(l6, l3);
p8 = P(l5, l4);
l7 = E2(E([p5, p7], g), s);
l8 = E2(E([p6, p8], g), s);
l9 = E([v1, P(l7, l2)], g);
l10 = E([v2, P(l8, l1)], g);
l11 = E([v1, P(l8, l10)], g);
l12 = E([v2, P(l7, l9)], g);
l13 = E([v1, P(l8, l12)], g);
l14 = E([v2, P(l7, l11)], g);
line(l1);
line(l2);
line(l3);
line(l4);
line([p1, p2]);
line([p3, p4]);
line(l5);
line(l6);
line(l7);
line(l8);
line(l9);
line(l10);
line(l11);
line(l12);
line(l13);
line(l14);
//mark(cross([a, b], [c, d]));
//l(cross([a, b], [c, d]));
ctx.closePath();
ctx.stroke();




