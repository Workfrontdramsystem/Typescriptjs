import {IRectangleArea} from './IRectangleArea';

export abstract class MyGraphicsPrimitive2D {
  public rectangleArea: IRectangleArea
  constructor() {
    this.rectangleArea = {
      x0: 0,
      y0: 0,
      width: 99,
      height: 99
    }
  }
  public move(x: number, y: number): void {
    console.log('do something', x, y)
  }
}
