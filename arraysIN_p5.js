var list = 120;

//arrays x e y de partida
let posx1 = [];
let posy1 = [];

//arrays x e y de chegada
let posx2 = [];
let posy2 = [];

let velx = [];
let vely = [];

let t = 0;

let cx = 0;
let ny = 0;

function setup() {
  createCanvas(720, 720, WEBGL);
  
  //configuração inicial dos pontos
  for (let i = 0; i < list; i++) {
    posx1[i] = width/2+cos(i*0.03)*width/2;
    posy1[i] = height/2+sin(i*0.03)*height/2;
    velx[i] = 0+noise(i*0.003)*18;
    vely[i] = 0+noise(i*0.03)*13;
  }

  for (let i = 0; i < list; i++) {
    posx2[i] = width/2+cos(i*0.7)*width/2.5;
    posy2[i] = height/2+sin(i*0.7)*height/2.5;
  }
  
  smooth(8);
}

function draw() {
  background(240);

  t += 0.01;
  
  noStroke();
  translate(-width/2,-height/2);
  beginShape();
  for (let i = 0; i < list; i++) {

    if (mouseIsPressed) {
      if (dist(posx1[i], posy1[i], mouseX+cos(i*0.1)*10, mouseY+sin(i*0.1)*10) < 150) {
        if (posx1[i] - mouseX > 20) {
         posx1[i] = posx1[i]+noise(i*0.11)*20;
        } else {
         posx1[i] = posx1[i]-noise(i*0.22)*20;
        }
        if (posx1[i] - (posx2[i] - mouseX) > 50) {
         posx2[i] = posx1[i];
        }else{
         posx2[i] = posx2[i];
        }
        if (posy1[i] - mouseY > 20) {
         posy1[i] = posy1[i]+noise(i*0.13)*20;
        } else {
         posy1[i] = posy1[i]-noise(i*0.17)*20;
        }
        if (posy1[i] - (posy2[i] - mouseY) > 50) {
         posy2[i] = posy1[i];
        }else{
         posy2[i] = posy2[i];
        }
      }
    }

    //obtendo a diferença e testando
    if (posx1[i] - posx2[i] > 0) {
      //se a diferença for maior que 0 a posição 1 decrementa
      posx1[i]-= velx[i];
      //quando a posição 1 decresce até a posição 2, permanece nesta
      if (posx1[i] <= posx2[i]) {
        posx1[i] = posx2[i];
      }
    } else {
      //se a diferença for menor que 0 a posição 1 incrementa
      posx1[i]+=velx[i];
      //quando a posição 1 alcança a posição 2, permanece nesta
      if (posx1[i] >= posx2[i]) {
        posx1[i] = posx2[i];
      }
    }
    if (posy1[i] - posy2[i] > 0) {
      posy1[i]-=vely[i];
      if (posy1[i] <= posy2[i]) {
        posy1[i] = posy2[i];
      }
    } else {
      posy1[i]+=vely[i];
      if (posy1[i] >= posy2[i]) {
        posy1[i] = posy2[i];
      }
    }
    
    strokeWeight(1);
    stroke(0);
    fill(
      127+tan(posx1[i]*0.0103)*127, 
      127+tan(posx1[i]*0.01015)*127, 
      127+tan(posx1[i]*0.01020)*127
      );

    cx = cos(posx1[i]*0.01+t)*80;
    ny = map(noise(posy1[i]*0.01+t), 0, 1, -1, 1)*80;
    
    vertex(posx1[i]+cx, posy1[i]+ny);
  }
  endShape();

}


function keyPressed() {

  //aqui repete-se a ideia da poisção 1 para posição 2
  if (key == '1') {
    for (let i = 0; i < posx1.length; i++) {
      //então a posição 1 sempre se inicia com a posição
      //na qual já estava estacionada na interpolação inicial
      posx1[i] = posx2[i];
      posy1[i] = posy2[i];

      posx2[i] = width/2+cos(i*0.7)*width/2.5;
      posy2[i] = height/2+sin(i*0.7)*height/2.5;
    }
  }

  if (key == '2') {
    for (let i = 0; i < posx1.length; i++) {
      posx1[i] = posx2[i];
      posy1[i] = posy2[i];

      posx2[i] = width/2+cos(i*0.1)*width/2.5;
      posy2[i] = height/2+sin(i*0.4)*height/2.5;
    }
  }

  if (key == '3') {
    for (let i = 0; i < posx1.length; i++) {
      posx1[i] = posx2[i];
      posy1[i] = posy2[i];

      posx2[i] = width/2+cos(i*0.1)*width/2.5;
      posy2[i] = height/2+sin(i*0.3)*height/2.5;
    }
  }
  if (key == '4') {
    for (let i = 0; i < posx1.length; i++) {
      posx1[i] = posx2[i];
      posy1[i] = posy2[i];

      posx2[i] = width/2+cos(i*0.12)*width/2.5;
      posy2[i] = height/2+sin(i*0.3)*height/2.5;
    }
  }
  if (key == '5') {
    for (let i = 0; i < posx1.length; i++) {
      posx1[i] = posx2[i];
      posy1[i] = posy2[i];

      posx2[i] = width/2+cos(i*0.4)*width/2.5;
      posy2[i] = height/2+sin(i*0.3)*height/2.5;
    }
  }
}
