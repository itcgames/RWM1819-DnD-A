class Game {
  constructor() {
    this.rect = new Square(100, 100, 50, 50, "#e01414");
    this.dnd = new DragDrop();
    this.dnd.addDraggable(this.rect);
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("canvas");
    this.context2D = canvas.getContext("2d");
  }

  update() {
    if (this.dnd.dragTarget != null) {
      this.dnd.dragTarget.x = this.dnd.mouseX - this.dnd.offsetx;
      this.dnd.dragTarget.y = this.dnd.mouseY - this.dnd.offsety;
      this.dnd.draggableObjects[this.dnd.dragIndex] = this.dnd.dragTarget;
    }
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