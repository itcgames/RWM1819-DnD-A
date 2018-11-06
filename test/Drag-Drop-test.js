/* DragDrop tests */

describe('DragDrop', function () {
  'use strict';

  var dragDrop = new DragDrop();

  it('exists', function () { //Checking that DragDrop exists and all of its functions are defined
    expect(DragDrop).to.be.a('function');
    expect(dragDrop.dragstart).to.be.a('function');
    expect(dragDrop.dragend).to.be.a('function');
  });
});