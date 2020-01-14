const mutationRate = 0.1;
let ray;
let walls= [];  //boundary_obs
let population = [];
let xoff = 5000;
let yoff = 100000;
let start, end;
const total = 100;
let savedParticles = [];
function setup()
{

  tf.setBackend('cpu');
  createCanvas(600, 400);
  // for(let i =0; i<5; i++){
  //   let x1 = random(width);
  //   let x2 = random(width);
  //   let y1 = random(height);
  //   let y2 = random(height);
  //   walls[i] = new Boundary(x1, y1, x2, y2)
  // }
  walls.push(new Boundary(50, height , 100, 399));
  walls.push(new Boundary(399, 50 , 399, 100));

  walls.push(new Boundary(50, height , 50, 200));
  walls.push(new Boundary(50, 200 , 150, 50));
  walls.push(new Boundary(150, 50 , height, 50));

  walls.push(new Boundary(100, height , 100, 200));
  walls.push(new Boundary(100, 200 , 175, 100));
  walls.push(new Boundary(175, 100 , height, 100)); 
  
  start = createVector(75, 350);
  end = createVector(350, 75);  
  // //ray = new Ray(100, 200)
  // wall = new Boundary(300,100,300,300);
  for(let i = 0; i < total; i++){
    population[i] = new Particle();
  } 
  
}
function draw()
{
  
  background(0);
  for(let wall of walls ){
  wall.show();
  }
  for(let particle of population){
  particle.check(end);
  particle.look(walls);
  //particle.applyForce(createVector(0, -.1));
  particle.update();
  particle.show();
  }

  for(let i = population.length-1; i>=0; i--){
    const particle = population[i];
    if(particle.dead || particle.finish){
      savedParticles.push(population.splice(i, 1)[0]);
    }
  }

  if(population.length == 0 ){
    nextGeneration();
  }
  xoff +=.01;
  yoff +=.01;
  
  //ellipse(start.x, start.y, 10);
  ellipse(end.x, end.y, 10);
  // //ray.lookAt(mouseX, mouseY);
  // let point = ray.cast(wall);
  // //console.log(point);
  // if(point){
  //   fill(255);
  //   ellipse(point.x, point.y, 8, 8);
  // }
}
