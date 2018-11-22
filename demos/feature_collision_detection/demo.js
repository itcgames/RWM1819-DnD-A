function main()
{
    var dragdrop = new DragDrop();
    this.createDiv("obstacle", '<img src=\'square.png\'>', 500, 100, false);
  this.createDiv("test", '<img src=\'square.png\'>', 100, 100, true);
}

function createDiv(name, imagePath, posX, posY, dragyn)
{
  var div = document.createElement("div");
  div.id = name;
  div.innerHTML= imagePath;
  div.draggable = dragyn;
  div.square = new Square(posX, posY, 122, 122, "#ffffff");
  //setting the position of our div
  div.style.position = "absolute";
  div.style.left = posX+'px';
  div.style.top = posY+'px';
  div.posx = posX;
  div.posy = posY;
  div.previousX = posX;
  div.previousY = posY;
  div.intersected = false;
  div.intersectX = 0;
  div.intersectY = 0;
  document.body.appendChild(div);
}

function haveIntersection(r1, r2) {
  return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
  );
}