export default class Particle {
  constructor(args) {
    this.position = args.position
    this.velocity = args.velocity
    this.radius = args.size;
    this.lifeSpan = args.lifeSpan;
    this.inertia = 0.98;

    this.isPaused = false
  }

  destroy(){
    this.delete = true;
  }

  pause(){
    this.velocity = {x:0, y:0}
    this.isPaused = true
  }

  unPause(){
    this.isPaused = false
    this.velocity = {x:0.5, y:0.5}
  }

  render(state){
    // Move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x *= this.inertia;
    this.velocity.y *= this.inertia;

    // Shrink
    if(!this.isPaused){
      this.radius -= 0.1;
      this.lifeSpan -= 1
    }
    if(this.radius < 0.1) {
      this.radius = 0.1;
    }
    if(this.lifeSpan < 0){
      this.destroy()
    }

    // Draw
    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.fillStyle = '#ffffff';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, -this.radius);
    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
  }
}
