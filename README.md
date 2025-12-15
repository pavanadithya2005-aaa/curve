
# Interactive Bézier Curve with Physics & Sensor Control

## 📌 Assignment Title
**Interactive Cubic Bézier Curve with Spring Physics**

---

## 🎯 Objective
The goal of this project is to implement an **interactive cubic Bézier curve** that behaves like a **springy rope** and responds smoothly to real-time input.

The project demonstrates concepts from:
- Bézier curve mathematics
- Vector calculus (tangents)
- Spring–damping physics
- Real-time graphics rendering

---

## 🧠 Project Overview
This project renders a **cubic Bézier curve** on an HTML5 canvas using **pure JavaScript**.  
The curve reacts dynamically to **mouse movement**, causing the control points to move with **spring-like behavior**.

Key features:
- Manual Bézier curve implementation (no libraries)
- Tangent vector visualization along the curve
- Smooth spring-damped motion for control points
- Real-time animation at ~60 FPS

---

## 🛠️ Technologies Used
- HTML5 Canvas
- JavaScript (Vanilla)
- RequestAnimationFrame for real-time rendering

---

## 📐 Mathematical Model

### 1️⃣ Cubic Bézier Curve Equation
The curve is defined using four control points:

\[
B(t) = (1−t)^3 P_0 + 3(1−t)^2 t P_1 + 3(1−t) t^2 P_2 + t^3 P_3
\]

- \( P_0 \) and \( P_3 \) are fixed endpoints
- \( P_1 \) and \( P_2 \) are dynamic control points
- The curve is sampled using small `t` steps (0 → 1)

---

### 2️⃣ Tangent Vector Computation
Tangents are calculated using the derivative of the Bézier curve:

\[
B'(t) = 3(1−t)^2(P_1−P_0) + 6(1−t)t(P_2−P_1) + 3t^2(P_3−P_2)
\]

- Tangents are normalized
- Short green lines are drawn at intervals along the curve

---

## ⚙️ Physics Model (Spring–Damping)

The control points follow a **spring-damping system**:

\[
a = -k(position - target) - damping \times velocity
\]

Where:
- `k` is the spring stiffness
- `damping` controls oscillation reduction
- This creates smooth, natural motion

---

## 🖱️ Interaction Logic
- Mouse movement controls the target positions of the control points
- Each control point moves toward its target using spring physics
- This simulates a rope-like response

---

## 🎨 Rendering Details
- **Blue curve** → Bézier path
- **Red points** → Control points
- **Green lines** → Tangent vectors
- Canvas resizes dynamically with the window

---

## 🚀 How to Run the Project
1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. Move the mouse to interact with the curve

No additional setup is required.

---

## 📂 Project Structure
