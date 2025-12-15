const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function vec(x, y) {
    return { x, y };
}

// Fixed endpoints
const P0 = vec(100, canvas.height / 2);
const P3 = vec(canvas.width - 100, canvas.height / 2);

// Dynamic control points
let P1 = vec(canvas.width * 0.3, canvas.height / 2 + 150);
let P2 = vec(canvas.width * 0.7, canvas.height / 2 + 150);

// Rest positions
const restP1 = vec(P1.x, P1.y);
const restP2 = vec(P2.x, P2.y);

// Velocities
let v1 = vec(0, 0);
let v2 = vec(0, 0);

let mouse = vec(0, 0);

canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const k = 0.02;       // spring stiffness
const damping = 0.15;

function updateSpring(point, velocity, rest, target) {
    const ax = -k * (point.x - target.x) - damping * velocity.x;
    const ay = -k * (point.y - target.y) - damping * velocity.y;

    velocity.x += ax;
    velocity.y += ay;

    point.x += velocity.x;
    point.y += velocity.y;
}

function bezierPoint(t, P0, P1, P2, P3) {
    const u = 1 - t;
    return {
        x:
            u*u*u*P0.x +
            3*u*u*t*P1.x +
            3*u*t*t*P2.x +
            t*t*t*P3.x,
        y:
            u*u*u*P0.y +
            3*u*u*t*P1.y +
            3*u*t*t*P2.y +
            t*t*t*P3.y
    };
}

function bezierTangent(t, P0, P1, P2, P3) {
    const u = 1 - t;
    return {
        x:
            3*u*u*(P1.x - P0.x) +
            6*u*t*(P2.x - P1.x) +
            3*t*t*(P3.x - P2.x),
        y:
            3*u*u*(P1.y - P0.y) +
            6*u*t*(P2.y - P1.y) +
            3*t*t*(P3.y - P2.y)
    };
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw curve
    ctx.beginPath();
    for (let t = 0; t <= 1; t += 0.01) {
        const p = bezierPoint(t, P0, P1, P2, P3);
        if (t === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw control points
    [P0, P1, P2, P3].forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
    });

    // Draw tangents
    for (let t = 0.1; t <= 0.9; t += 0.1) {
        const p = bezierPoint(t, P0, P1, P2, P3);
        const tan = bezierTangent(t, P0, P1, P2, P3);
        const len = Math.hypot(tan.x, tan.y);
        const scale = 30 / len;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + tan.x * scale, p.y + tan.y * scale);
        ctx.strokeStyle = "green";
        ctx.stroke();
    }
}


function animate() {
    // Mouse → target mapping
    const target1 = vec(
        restP1.x + (mouse.x - canvas.width / 2) * 0.3,
        restP1.y + (mouse.y - canvas.height / 2) * 0.3
    );

    const target2 = vec(
        restP2.x - (mouse.x - canvas.width / 2) * 0.3,
        restP2.y + (mouse.y - canvas.height / 2) * 0.3
    );

    updateSpring(P1, v1, restP1, target1);
    updateSpring(P2, v2, restP2, target2);

    draw();
    requestAnimationFrame(animate);
}

animate();
