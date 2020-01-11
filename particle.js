class Particle {
    constructor(x, y ) {
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.maxspeed = 3;
        this.sight = 50;
        this.rays = [];
        for(let a = 0; a < 360 ; a += 45) {
            this.rays.push(new Ray(this.pos, radians(a)));

        }
        this.brain = new NeuralNetwork(this.rays.length, this.rays.length, 1);
    }

    applyForce(force){
        this.acc.add(force);
    }

    update()
    {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.acc.set(0,0)
    }

    look(walls){

        const inputs = [];
         for(let i = 0;i < this.rays.length; i++ ){
            const ray = this.rays[i];
            let record = this.sight; 
            let closest = null;
            for(let wall of walls){
                
                const point = ray.cast(wall)
                if(point){
                    const d = p5.Vector.dist(this.pos, point);
                    if(d<record && d < this.sight){
                        record = d;
                        closest = point;
                    }
                    //record = min(d, record);
                    }
                    
                }

                // if(record < 2){
                //     console.log("hit wall");

                // }
                inputs[i] = map(record, 0 , 50, 1, 0);
                
                

                if(closest){
                    stroke(255, 100);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
                }

    }
                    const output = this.brain.predict(inputs);
                    const angle = map(output[0], 0, 1, 0, TWO_PI);
                    const steering = p5.Vector.fromAngle(angle);
                    steering.setMag(this.maxspeed);
                    steering.sub(this.vel);
                    this.applyForce(steering);

                    
}

    show() {
        fill(255, 100);
        ellipse(this.pos.x, this.pos.y, 8);
            for(let ray of this.rays){
                //ray.show();
            }
        }
    }
