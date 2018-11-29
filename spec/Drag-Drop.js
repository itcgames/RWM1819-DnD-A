/* global Drag-Drop, describe, it, expect, should */

class DragDrop {
  constructor() {
    this.currentPosX = 0;
    this.currentPosY = 0;
    this.offsetx = 0;
    this.offsety = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    /** @type {Array<{x: number, y: number, width: number, height: number}>} */
    this.draggableObjects = [];
    /** @type {{ position: { x: number, y: number }, }} */
    this.dragTarget = null;
    window.addEventListener("mousemove", this.mouseMove.bind(this.dnd));

  }


  mouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  addDraggable(object) {
    this.draggableObjects.push(object);
  }

  removeTargetDraggable() {
    this.draggableObjects[this.dragIndex] = null;
  }

  clearDraggables() {
    for (var index in this.draggableObjects) {
      this.draggableObjects[index] = null;
    }
  }


  /**
   * 
   * @param {MouseEvent} e 
   */
  dragstart(e) {
    if (e.button !== 0 && this.dragTarget !== null) { return; }
    for (var index in this.draggableObjects) {
      if (this.pointIntersection(e.clientX, e.clientY, this.draggableObjects[index]) == true) {
        this.dragTarget = this.draggableObjects[index];
        this.dragIndex = index;
        this.offsetx = e.clientX - this.dragTarget.x;
        this.offsety = e.clientY - this.dragTarget.y;
      }
    }
  }
  dragmove(e) {
    event.preventDefault();
    if (e.target.parentElement.draggable) {
      var targetRect = e.target.parentElement.square;
      if (e.target.parentElement.intersected == false) {
        e.target.parentElement.previousX = targetRect.x;
        e.target.parentElement.previousY = targetRect.y;
      }
      targetRect.x = parseFloat(e.clientX) - parseFloat(this.offsetx);
      targetRect.y = parseFloat(e.clientY) - parseFloat(this.offsety);
      var all = document.getElementsByTagName("div");

      for (var i = 0, max = all.length; i < max; i++) {


        if (all[i].id != e.target.parentElement.id) {
          if (haveIntersection(all[i].square, targetRect)) {
            all[i].style.backgroundColor = "blue";
            console.log("Intersection");
            if (e.target.parentElement.intersected == false) {
              e.target.parentElement.intersected = true;
              e.target.parentElement.intersectX = parseFloat(e.target.parentElement.previousX);
              e.target.parentElement.intersectY = parseFloat(e.target.parentElement.previousY);
            }
            break;
          }
          else {
            e.target.parentElement.intersected = false;
            all[i].style.backgroundColor = "";
          }
        }
        this.currentPosX = parseFloat(e.target.parentElement.previousX);
        this.currentPosY = parseFloat(e.target.parentElement.previousY);
        e.target.parentElement.style.left = this.currentPosX + "px";
        e.target.parentElement.style.top = this.currentPosY + "px";
        e.target.parentElement.posx = this.currentPosX;
        e.target.parentElement.posy = this.currentPosY;
      };
      if (targetRect.x < 0) {
        console.log("test");
      }

      e.target.parentElement.square = targetRect;
    }
  }
  dragend(e) {

    if (e.button !== 0 && this.dragTarget !== null) { return; }
    this.dragTarget = null;
  }

  render(ctx) {
    for (var index in this.draggableObjects) {
      this.draggableObjects[index].render(ctx);
    }
  }

  haveIntersection(r1, r2) {
    return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
    );
  }

  update() {
    if (this.dragTarget != null) {
      this.dragTarget.x = this.mouseX - this.offsetx;
      this.dragTarget.y = this.mouseY - this.offsety;
      this.draggableObjects[this.dragIndex] = this.dragTarget;
    }
  }


  /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {{ x: number, y: number, width: number, height: number }} r 
   *  x and y are the top left corner of the rectangle.
   */
  pointIntersection(x, y, r) {
    return (x > r.x && x < r.x + r.width
      && y > r.y && y < r.y + r.height);
  }
}