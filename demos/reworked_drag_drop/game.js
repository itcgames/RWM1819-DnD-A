class Game {
  constructor() {
    this.rect = new Square(100, 100, 50, 50, "#e01414");
    this.dnd = new DragDrop();
    this.dnd.addDraggable(this.rect);
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("canvas");
    this.context2D = canvas.getContext("2d");
    
    window.addEventListener("mousedown", this.dnd.dragstart.bind(this.dnd));
    window.addEventListener("mouseup", this.dnd.dragend.bind(this.dnd));
  }

  update() {
    this.dnd.update();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.dnd.render(ctx);
  }

  loop() {
    this.update();
    this.draw(this.context2D);
    /** Use bind function to keep the 'this' context throughout loop usage */
    window.requestAnimationFrame(this.loop.bind(this));
  }
}