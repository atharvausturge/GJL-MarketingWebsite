let gameState = "title";
let player1, player2;
let platforms = [];
let goal;
let level = 0;
let ropeLength = 150;
let gravity = 0.55;
let levels = [];
let particles = [];
let titleAlpha = 0;
let transitionTimer = 0;
let transitionFrom = -1;
let stars = [];
// Track which keys were JUST pressed this frame (for jump)
let justPressed = {};

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('p5-game-slot');
    textFont('monospace');
    for (let i = 0; i < 80; i++) {
        stars.push({ x: random(width), y: random(height * 0.6), s: random(1, 3), b: random(100, 255), speed: random(0.3, 1.2) });
    }
    setupLevels();
}

function keyPressed() {
    justPressed[keyCode] = true;
    return false; // prevent browser scrolling with arrows
}
function keyReleased() {
    return false;
}

// For held keys (movement) — use p5's built-in keyIsDown
function isHeld(k) {
    if (k === 'ArrowUp') return keyIsDown(UP_ARROW);
    if (k === 'ArrowDown') return keyIsDown(DOWN_ARROW);
    if (k === 'ArrowLeft') return keyIsDown(LEFT_ARROW);
    if (k === 'ArrowRight') return keyIsDown(RIGHT_ARROW);
    return keyIsDown(k.toUpperCase().charCodeAt(0));
}

// For one-shot keys (jump) — only true the frame it was pressed
function wasJustPressed(k) {
    let code;
    if (k === 'ArrowUp') code = UP_ARROW;
    else if (k === 'ArrowDown') code = DOWN_ARROW;
    else if (k === 'ArrowLeft') code = LEFT_ARROW;
    else if (k === 'ArrowRight') code = RIGHT_ARROW;
    else code = k.toUpperCase().charCodeAt(0);
    return !!justPressed[code];
}

// Call at end of every draw() to clear one-shot presses
function clearJustPressed() {
    justPressed = {};
}

function setupLevels() {
    levels.push({
        rope: 150, platforms: [
            new Platform(80, 540, 150, 16), new Platform(270, 490, 130, 16),
            new Platform(450, 440, 130, 16), new Platform(590, 380, 130, 16),
            new Platform(430, 320, 130, 16), new Platform(260, 260, 130, 16)
        ], goal: { x: 300, y: 180, w: 40, h: 40 }
    });
    levels.push({
        rope: 160, platforms: [
            new Platform(60, 540, 130, 16), new Platform(230, 500, 110, 16),
            new Platform(390, 455, 110, 16), new Platform(560, 400, 110, 16),
            new Platform(630, 330, 100, 16), new Platform(470, 270, 100, 16),
            new Platform(310, 210, 100, 16)
        ], goal: { x: 350, y: 140, w: 40, h: 40 }
    });
    levels.push({
        rope: 170, platforms: [
            new Platform(80, 540, 120, 16), new Platform(220, 495, 95, 16),
            new Platform(360, 450, 95, 16), new Platform(500, 405, 95, 16),
            new Platform(640, 360, 95, 16), new Platform(520, 300, 90, 16),
            new Platform(380, 240, 90, 16), new Platform(240, 180, 90, 16)
        ], goal: { x: 260, y: 110, w: 40, h: 40 }
    });
    levels.push({
        rope: 180, platforms: [
            new Platform(70, 540, 110, 16), new Platform(230, 500, 85, 16),
            new Platform(110, 445, 85, 16), new Platform(290, 390, 80, 16),
            new Platform(460, 335, 80, 16), new Platform(620, 280, 80, 16),
            new Platform(470, 220, 75, 16), new Platform(295, 145, 90, 16)
        ], goal: { x: 320, y: 90, w: 40, h: 40 }
    });
    levels.push({
        rope: 190, platforms: [
            new Platform(60, 540, 100, 16), new Platform(210, 500, 75, 16),
            new Platform(360, 455, 70, 16), new Platform(520, 410, 70, 16),
            new Platform(660, 350, 65, 16), new Platform(530, 290, 65, 16),
            new Platform(390, 230, 65, 16), new Platform(240, 170, 90, 16),
            new Platform(390, 110, 80, 16)
        ], goal: { x: 405, y: 50, w: 40, h: 40 }
    });
    levels.push({
        rope: 200, platforms: [
            new Platform(60, 540, 100, 16), new Platform(280, 500, 80, 16),
            new Platform(100, 450, 75, 16), new Platform(340, 400, 75, 16),
            new Platform(560, 360, 75, 16), new Platform(680, 300, 70, 16),
            new Platform(500, 245, 70, 16), new Platform(310, 190, 65, 16),
            new Platform(140, 135, 65, 16), new Platform(330, 80, 60, 16)
        ], goal: { x: 345, y: 30, w: 40, h: 40 }
    });
    levels.push({
        rope: 210, platforms: [
            new Platform(50, 540, 90, 16), new Platform(230, 510, 60, 16),
            new Platform(420, 470, 60, 16), new Platform(620, 430, 60, 16),
            new Platform(700, 370, 55, 16), new Platform(560, 310, 55, 16),
            new Platform(380, 260, 55, 16), new Platform(180, 215, 55, 16),
            new Platform(60, 160, 55, 16), new Platform(220, 105, 50, 16),
            new Platform(430, 60, 50, 16)
        ], goal: { x: 445, y: 10, w: 40, h: 40 }
    });
    levels.push({
        rope: 220, platforms: [
            new Platform(55, 540, 80, 16), new Platform(200, 510, 50, 16),
            new Platform(360, 475, 50, 16), new Platform(530, 435, 50, 16),
            new Platform(680, 390, 50, 16), new Platform(580, 335, 45, 16),
            new Platform(430, 280, 45, 16), new Platform(275, 230, 45, 16),
            new Platform(120, 180, 45, 16), new Platform(270, 125, 42, 16),
            new Platform(470, 80, 42, 16), new Platform(650, 40, 42, 16)
        ], goal: { x: 660, y: -10, w: 40, h: 40 }
    });
}

function startGame() {
    gameState = "play";
    loadLevel(0);
}

function loadLevel(i) {
    level = i;
    ropeLength = levels[i].rope;
    platforms = levels[i].platforms;
    goal = levels[i].goal;
    player1 = new Player(platforms[0].x + 10, platforms[0].y - 30, [70, 130, 230], ['w', 'a', 's', 'd'], 'P1');
    player2 = new Player(platforms[0].x + 50, platforms[0].y - 30, [230, 70, 80], ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'], 'P2');
    particles = [];
    transitionTimer = 30;
    transitionFrom = i - 1;
}

function mousePressed() {
    if (gameState === "title") startGame();
    if (gameState === "win") {
        gameState = "title";
    }
}

function draw() {
    if (gameState === "title") drawTitle();
    else if (gameState === "play") drawGame();
    else if (gameState === "win") drawWin();
    clearJustPressed();
}

function drawStars() {
    for (let s of stars) {
        let flicker = sin(frameCount * 0.03 * s.speed + s.x) * 40;
        fill(255, 255, 200, s.b + flicker);
        noStroke();
        ellipse(s.x, s.y, s.s);
    }
}

function drawSky() {
    // gradient sky
    for (let y = 0; y < height; y++) {
        let t = y / height;
        let r = lerp(15, 40, t);
        let g = lerp(10, 25, t);
        let b = lerp(50, 60, t);
        stroke(r, g, b);
        line(0, y, width, y);
    }
    drawStars();
}

function drawCastleBG() {
    // ground
    noStroke();
    fill(50, 40, 35);
    rect(0, height - 40, width, 40);
    // ground detail
    fill(60, 50, 42);
    for (let x = 0; x < width; x += 20) {
        rect(x, height - 40, 10, 4, 2);
    }

    // castle walls
    fill(65, 55, 50, 120);
    rect(30, 220, 740, 340);

    // stone texture
    fill(75, 65, 58, 80);
    for (let row = 0; row < 8; row++) {
        let offset = (row % 2) * 30;
        for (let col = 0; col < 14; col++) {
            rect(30 + offset + col * 55, 220 + row * 42, 52, 39, 1);
        }
    }

    // battlements
    fill(55, 45, 40);
    for (let x = 30; x < 770; x += 32) {
        rect(x, 200, 22, 24, 2);
    }

    // towers
    fill(60, 50, 44);
    rect(20, 140, 50, 420);
    rect(730, 140, 50, 420);
    // tower tops
    fill(55, 45, 40);
    triangle(20, 140, 45, 90, 70, 140);
    triangle(730, 140, 755, 90, 780, 140);
    // tower windows
    fill(30, 60, 90);
    ellipse(45, 180, 16, 22);
    ellipse(755, 180, 16, 22);
    fill(40, 80, 120);
    ellipse(45, 178, 12, 16);
    ellipse(755, 178, 12, 16);
}

function drawTitle() {
    drawSky();
    drawCastleBG();

    titleAlpha = min(titleAlpha + 4, 255);

    // title glow
    let glowPulse = sin(frameCount * 0.04) * 20 + 30;
    drawingContext.shadowBlur = glowPulse;
    drawingContext.shadowColor = 'rgba(255,200,50,0.6)';

    textAlign(CENTER, CENTER);
    textSize(56);
    fill(255, 210, 50, titleAlpha);
    stroke(80, 50, 10);
    strokeWeight(4);
    text("ROYAL ROPE", width / 2, height / 2 - 70);

    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = 'transparent';

    noStroke();
    fill(220, 210, 200, titleAlpha);
    textSize(15);
    text("Scale the castle together. Cooperate or fall.", width / 2, height / 2 - 20);

    // controls
    fill(140, 170, 220, titleAlpha);
    textSize(13);
    text("BLUE: W A S D    |    RED: Arrow Keys", width / 2, height / 2 + 10);

    // play prompt
    let pulse = sin(frameCount * 0.06) * 30 + 225;
    fill(255, 220, 100, pulse);
    textSize(20);
    text("[ CLICK TO PLAY ]", width / 2, height / 2 + 55);

    // decorative rope
    stroke(160, 120, 60);
    strokeWeight(3);
    noFill();
    let cx = width / 2;
    beginShape();
    for (let i = -120; i <= 120; i += 4) {
        let yy = height / 2 + 90 + sin(i * 0.03 + frameCount * 0.02) * 12 + (i * i) * 0.0008;
        vertex(cx + i, yy);
    }
    endShape();
}

function drawWin() {
    drawSky();
    drawCastleBG();

    // firework particles
    if (frameCount % 8 === 0) {
        let fx = random(100, 700), fy = random(80, 300);
        for (let i = 0; i < 20; i++) {
            particles.push({
                x: fx, y: fy,
                vx: random(-3, 3), vy: random(-4, 1),
                life: random(30, 60),
                col: [random(150, 255), random(100, 255), random(50, 255)],
                size: random(2, 5)
            });
        }
    }

    updateParticles();

    drawingContext.shadowBlur = 30;
    drawingContext.shadowColor = 'rgba(50,255,100,0.5)';
    textAlign(CENTER, CENTER);
    textSize(54);
    fill(100, 255, 130);
    stroke(20, 60, 30);
    strokeWeight(3);
    text("ESCAPED!", width / 2, height / 2 - 30);
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = 'transparent';

    noStroke();
    fill(220);
    textSize(18);
    text("All " + levels.length + " levels conquered!", width / 2, height / 2 + 25);

    let pulse = sin(frameCount * 0.06) * 30 + 225;
    fill(255, 220, 100, pulse);
    textSize(16);
    text("[ CLICK TO RETURN ]", width / 2, height / 2 + 65);
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.life--;
        noStroke();
        fill(p.col[0], p.col[1], p.col[2], map(p.life, 0, 60, 0, 255));
        ellipse(p.x, p.y, p.size);
        if (p.life <= 0) particles.splice(i, 1);
    }
}

function drawGame() {
    drawSky();
    drawCastleBG();

    // transition overlay
    if (transitionTimer > 0) {
        let a = map(transitionTimer, 30, 0, 200, 0);
        fill(0, 0, 0, a);
        rect(0, 0, width, height);
        transitionTimer--;
    }

    // HUD
    noStroke();
    fill(0, 0, 0, 100);
    rect(0, 0, width, 42);
    fill(255, 210, 50);
    textAlign(LEFT, CENTER);
    textSize(16);
    text("Level " + (level + 1) + " / " + levels.length, 16, 20);

    // rope tension indicator
    let d = dist(player1.x + player1.w / 2, player1.y + player1.h / 2, player2.x + player2.w / 2, player2.y + player2.h / 2);
    let tension = constrain(d / ropeLength, 0, 1);
    let barW = 100;
    fill(40, 40, 40, 150);
    rect(width - barW - 20, 10, barW, 10, 5);
    let tensionCol = lerpColor(color(80, 200, 80), color(255, 60, 60), tension);
    fill(tensionCol);
    rect(width - barW - 20, 10, barW * tension, 10, 5);
    fill(200);
    textAlign(RIGHT, CENTER);
    textSize(10);
    text("ROPE", width - barW - 26, 15);

    // platforms
    for (let p of platforms) p.show();

    // goal
    drawGoal();

    // rope visual
    drawRope();

    // update physics
    player1.update();
    player2.update();
    player1.collide(platforms);
    player2.collide(platforms);
    applyRope(player1, player2);

    // draw players
    player1.show();
    player2.show();

    // landing particles
    updateParticles();

    // goal check
    if (player1.onGoal(goal) && player2.onGoal(goal)) {
        // burst particles
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: goal.x + goal.w / 2, y: goal.y + goal.h / 2,
                vx: random(-4, 4), vy: random(-5, 0),
                life: random(20, 50),
                col: [255, random(180, 240), 50],
                size: random(2, 6)
            });
        }
        if (level < levels.length - 1) loadLevel(level + 1);
        else gameState = "win";
    }
}

function drawGoal() {
    let pulse = sin(frameCount * 0.08) * 8;
    // glow
    drawingContext.shadowBlur = 15 + pulse;
    drawingContext.shadowColor = 'rgba(255,215,0,0.7)';
    fill(255, 215, 50, 200);
    stroke(200, 160, 30);
    strokeWeight(2);
    rect(goal.x, goal.y, goal.w, goal.h, 4);
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = 'transparent';

    // flag icon
    noStroke();
    fill(255, 80, 80);
    triangle(goal.x + 14, goal.y + 6, goal.x + 30, goal.y + 13, goal.x + 14, goal.y + 20);
    fill(60);
    rect(goal.x + 12, goal.y + 5, 3, goal.h - 10);
}

function drawRope() {
    let x1 = player1.x + player1.w / 2;
    let y1 = player1.y + player1.h * 0.6;
    let x2 = player2.x + player2.w / 2;
    let y2 = player2.y + player2.h * 0.6;
    let d = dist(x1, y1, x2, y2);
    let tension = constrain(d / ropeLength, 0, 1);

    let sag = map(tension, 0, 1, 40, 2);
    let midX = (x1 + x2) / 2;
    let midY = (y1 + y2) / 2 + sag;

    // rope shadow
    stroke(0, 0, 0, 40);
    strokeWeight(5);
    noFill();
    bezier(x1, y1 + 3, midX - 20, midY + 3, midX + 20, midY + 3, x2, y2 + 3);

    // main rope
    let ropeR = lerp(180, 255, tension);
    let ropeG = lerp(140, 80, tension);
    let ropeB = lerp(80, 50, tension);
    stroke(ropeR, ropeG, ropeB);
    strokeWeight(3);
    bezier(x1, y1, midX - 20, midY, midX + 20, midY, x2, y2);

    // highlight
    stroke(255, 255, 200, 60);
    strokeWeight(1);
    bezier(x1, y1 - 1, midX - 20, midY - 2, midX + 20, midY - 2, x2, y2 - 1);
}

// IMPROVED ROPE PHYSICS
function applyRope(a, b) {
    let dx = b.x - a.x;
    let dy = b.y - a.y;
    let d = sqrt(dx * dx + dy * dy);

    if (d > ropeLength) {
        let diff = d - ropeLength;
        let nx = dx / d;
        let ny = dy / d;

        // position correction — split evenly
        a.x += nx * diff * 0.5;
        a.y += ny * diff * 0.5;
        b.x -= nx * diff * 0.5;
        b.y -= ny * diff * 0.5;

        // gentle velocity damping along rope axis (no wild energy injection)
        let relVy = b.vy - a.vy;
        a.vy += ny * diff * 0.008;
        b.vy -= ny * diff * 0.008;
    }
}

class Player {
    constructor(x, y, col, keys, label) {
        this.x = x; this.y = y;
        this.vx = 0; this.vy = 0;
        this.col = col; this.keys = keys;
        this.label = label;
        this.w = 20; this.h = 28;
        this.onGround = false;
        this.facing = 1;
        this.jumpBuf = 0; // coyote frames
        this.groundFrames = 0;
    }

    update() {
        let speed = 2.8;

        if (isHeld(this.keys[1])) { this.vx = -speed; this.facing = -1; }
        else if (isHeld(this.keys[3])) { this.vx = speed; this.facing = 1; }
        else { this.vx *= 0.7; if (abs(this.vx) < 0.1) this.vx = 0; }

        this.x += this.vx;

        // coyote time — allows jump a few frames after leaving a ledge
        if (this.onGround) this.groundFrames = 5;
        else this.groundFrames = max(0, this.groundFrames - 1);

        // jump only on fresh press + must be on ground (or within coyote window)
        if (wasJustPressed(this.keys[0]) && this.groundFrames > 0) {
            this.vy = -11;
            this.groundFrames = 0;
            this.onGround = false;
        }

        this.vy += gravity;
        this.vy = min(this.vy, 14); // terminal velocity
        this.y += this.vy;

        // clamp to canvas
        this.x = constrain(this.x, 0, width - this.w);
    }

    // FULL COLLISION: top, bottom, left, right
    collide(plats) {
        this.onGround = false;

        for (let p of plats) {
            // check overlap
            if (this.x + this.w > p.x && this.x < p.x + p.w &&
                this.y + this.h > p.y && this.y < p.y + p.h) {

                // calculate overlap amounts from each side
                let overlapBottom = (this.y + this.h) - p.y;      // player bottom into platform top
                let overlapTop = (p.y + p.h) - this.y;            // player top into platform bottom
                let overlapRight = (this.x + this.w) - p.x;       // player right into platform left
                let overlapLeft = (p.x + p.w) - this.x;           // player left into platform right

                let minOverlap = min(overlapBottom, overlapTop, overlapRight, overlapLeft);

                if (minOverlap === overlapBottom) {
                    // landing on top
                    this.y = p.y - this.h;
                    if (this.vy > 2) {
                        // landing particles
                        for (let i = 0; i < 4; i++) {
                            particles.push({
                                x: this.x + random(this.w), y: p.y,
                                vx: random(-1.5, 1.5), vy: random(-2, -0.5),
                                life: random(10, 20),
                                col: [160, 120, 70], size: random(2, 4)
                            });
                        }
                    }
                    this.vy = 0;
                    this.onGround = true;
                } else if (minOverlap === overlapTop) {
                    // bonking head on underside
                    this.y = p.y + p.h;
                    this.vy = max(this.vy, 1); // bounce down slightly
                } else if (minOverlap === overlapRight) {
                    // hitting left side of platform
                    this.x = p.x - this.w;
                    this.vx = 0;
                } else if (minOverlap === overlapLeft) {
                    // hitting right side of platform
                    this.x = p.x + p.w;
                    this.vx = 0;
                }
            }
        }

        // floor
        if (this.y > height - 40 - this.h) {
            this.y = height - 40 - this.h;
            this.vy = 0;
            this.onGround = true;
        }
    }

    onGoal(g) {
        return this.x < g.x + g.w && this.x + this.w > g.x &&
            this.y < g.y + g.h && this.y + this.h > g.y;
    }

    show() {
        push();
        let bx = this.x, by = this.y;
        let squash = this.onGround && abs(this.vx) > 1 ? sin(frameCount * 0.3) * 1 : 0;

        // shadow
        fill(0, 0, 0, 30);
        noStroke();
        ellipse(bx + this.w / 2, by + this.h + 2, this.w + 4, 6);

        // body
        fill(this.col[0], this.col[1], this.col[2]);
        stroke(this.col[0] * 0.6, this.col[1] * 0.6, this.col[2] * 0.6);
        strokeWeight(1);
        rect(bx + 2, by + 8, this.w - 4, this.h - 8, 3);

        // head
        fill(240, 210, 175);
        stroke(200, 170, 135);
        strokeWeight(1);
        ellipse(bx + this.w / 2, by + 4, 14, 14);

        // eyes
        noStroke();
        fill(40);
        let eyeOff = this.facing * 2;
        ellipse(bx + this.w / 2 + eyeOff - 2, by + 3, 2.5, 3);
        ellipse(bx + this.w / 2 + eyeOff + 2, by + 3, 2.5, 3);

        // hat/crown
        fill(this.col[0], this.col[1], this.col[2]);
        stroke(this.col[0] * 0.7, this.col[1] * 0.7, this.col[2] * 0.7);
        strokeWeight(1);
        // crown base
        rect(bx + this.w / 2 - 7, by - 5, 14, 6, 1);
        // crown points
        noStroke();
        fill(this.col[0], this.col[1], this.col[2]);
        triangle(bx + this.w / 2 - 7, by - 5, bx + this.w / 2 - 5, by - 12, bx + this.w / 2 - 2, by - 5);
        triangle(bx + this.w / 2 - 2, by - 5, bx + this.w / 2, by - 14, bx + this.w / 2 + 2, by - 5);
        triangle(bx + this.w / 2 + 2, by - 5, bx + this.w / 2 + 5, by - 12, bx + this.w / 2 + 7, by - 5);

        // crown gems
        fill(255, 255, 100);
        ellipse(bx + this.w / 2, by - 10, 3, 3);

        // label
        noStroke();
        fill(255, 255, 255, 180);
        textAlign(CENTER, CENTER);
        textSize(8);
        text(this.label, bx + this.w / 2, by + this.h + 12);

        pop();
    }
}

class Platform {
    constructor(x, y, w, h) {
        this.x = x; this.y = y; this.w = w; this.h = h;
    }
    show() {
        noStroke();
        // shadow
        fill(0, 0, 0, 40);
        rect(this.x + 3, this.y + 3, this.w, this.h, 3);
        // main
        fill(120, 80, 45);
        rect(this.x, this.y, this.w, this.h, 3);
        // top highlight
        fill(150, 105, 60);
        rect(this.x, this.y, this.w, 4, 3, 3, 0, 0);
        // edge marks
        fill(100, 65, 35);
        rect(this.x + 1, this.y + this.h - 3, this.w - 2, 3, 0, 0, 3, 3);
        // stone lines
        stroke(110, 72, 40);
        strokeWeight(1);
        for (let sx = this.x + 15; sx < this.x + this.w - 5; sx += 20) {
            line(sx, this.y + 5, sx, this.y + this.h - 3);
        }
    }
}
