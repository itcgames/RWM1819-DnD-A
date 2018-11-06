/* global Drag-Drop, describe, it, expect, should */

class DragDrop
{
  constructor()
  {
    document.addEventListener("dragstart", this.dragstart);
    document.addEventListener("dragend", this.dragend);
    this.currentPosX = 0;
    this.currentPosY = 0;
  }
  dragstart(e)
  {
    if (e.target.draggable)
    {
      this.dragged = e.target;
      this.currentPosX = e.clientX;
      this.currentPosY = e.clientY;
      console.log(this.currentPosX, this.currentPosY);
    }
  }
  dragend(e)
  {
    if (e.target.draggable)
    {
    this.dragend = e.target;
    this.currentPosX = e.clientX;
    this.currentPosY = e.clientY;
    console.log(this.currentPosX, this.currentPosY);
    e.target.parentElement.style.left = this.currentPosX + "px";
    e.target.parentElement.style.top = this.currentPosY + "px";
    }
  }
}