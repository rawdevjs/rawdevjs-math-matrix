'use strict'

const Matrix3 = require('./Matrix3')
const Vector3 = require('./Vector3')

const ArrayType = (typeof Float32Array !== 'undefined') ? Float32Array : Array

class Matrix4 {
  constructor (values) {
    this.data = new ArrayType(16)

    if (values) {
      if (values.length === 16) {
        this.data[0] = values[0]
        this.data[1] = values[1]
        this.data[2] = values[2]
        this.data[3] = values[3]
        this.data[4] = values[4]
        this.data[5] = values[5]
        this.data[6] = values[6]
        this.data[7] = values[7]
        this.data[8] = values[8]
        this.data[9] = values[9]
        this.data[10] = values[10]
        this.data[11] = values[11]
        this.data[12] = values[12]
        this.data[13] = values[13]
        this.data[14] = values[14]
        this.data[15] = values[15]
      } else if (values.length === 12) {
        this.data[0] = values[0]
        this.data[1] = values[1]
        this.data[2] = values[2]
        this.data[3] = values[3]
        this.data[4] = values[4]
        this.data[5] = values[5]
        this.data[6] = values[6]
        this.data[7] = values[7]
        this.data[8] = values[8]
        this.data[9] = values[9]
        this.data[10] = values[10]
        this.data[11] = values[11]
        this.data[12] = 0
        this.data[13] = 0
        this.data[14] = 0
        this.data[15] = 1
      } else if (values.length === 4) {
        this.data[0] = values[0]
        this.data[1] = 0
        this.data[2] = 0
        this.data[3] = 0
        this.data[4] = 0
        this.data[5] = values[1]
        this.data[6] = 0
        this.data[7] = 0
        this.data[8] = 0
        this.data[9] = 0
        this.data[10] = values[2]
        this.data[11] = 0
        this.data[12] = 0
        this.data[13] = 0
        this.data[14] = 0
        this.data[15] = values[3]
      }
    } else {
      this.data[0] = 1
      this.data[1] = 0
      this.data[2] = 0
      this.data[3] = 0
      this.data[4] = 0
      this.data[5] = 1
      this.data[6] = 0
      this.data[7] = 0
      this.data[8] = 0
      this.data[9] = 0
      this.data[10] = 1
      this.data[11] = 0
      this.data[12] = 0
      this.data[13] = 0
      this.data[14] = 0
      this.data[15] = 1
    }
  }

  toString () {
    return '(' +
      this.data[0] + ',' +
      this.data[1] + ',' +
      this.data[2] + ',' +
      this.data[3] + ',' +
      this.data[4] + ',' +
      this.data[5] + ',' +
      this.data[6] + ',' +
      this.data[7] + ',' +
      this.data[8] + ',' +
      this.data[9] + ',' +
      this.data[10] + ',' +
      this.data[11] + ',' +
      this.data[12] + ',' +
      this.data[13] + ',' +
      this.data[14] + ',' +
      this.data[15] + ')'
  }

  toVector3 (result) {
    result = result || Vector3()

    result.data[0] = this.data[0]
    result.data[1] = this.data[5]
    result.data[2] = this.data[10]

    return result
  }

  toMatrix3 (result) {
    result = result || new Matrix3()

    result.data[0] = this.data[0]
    result.data[1] = this.data[1]
    result.data[2] = this.data[2]

    result.data[3] = this.data[4]
    result.data[4] = this.data[5]
    result.data[5] = this.data[6]

    result.data[6] = this.data[8]
    result.data[7] = this.data[9]
    result.data[8] = this.data[10]

    return result
  }

  scale (vector, result) {
    result = result || new Matrix4()

    let x = vector.data[0]
    let y = vector.data[1]
    let z = vector.data[2]

    if (result === this) {
      this.data[0] *= x
      this.data[1] *= x
      this.data[2] *= x
      this.data[3] *= x
      this.data[4] *= y
      this.data[5] *= y
      this.data[6] *= y
      this.data[7] *= y
      this.data[8] *= z
      this.data[9] *= z
      this.data[10] *= z
      this.data[11] *= z
    } else {
      result.data[0] = this.data[0] * x
      result.data[1] = this.data[1] * x
      result.data[2] = this.data[2] * x
      result.data[3] = this.data[3] * x
      result.data[4] = this.data[4] * y
      result.data[5] = this.data[5] * y
      result.data[6] = this.data[6] * y
      result.data[7] = this.data[7] * y
      result.data[8] = this.data[8] * z
      result.data[9] = this.data[9] * z
      result.data[10] = this.data[10] * z
      result.data[11] = this.data[11] * z
      result.data[12] = this.data[12]
      result.data[13] = this.data[13]
      result.data[14] = this.data[14]
      result.data[15] = this.data[15]
    }

    return result
  }

  translate (vector, result) {
    result = result || new Matrix4()

    let x = vector.data[0]
    let y = vector.data[1]
    let z = vector.data[2]

    if (result === this) {
      this.data[12] = this.data[0] * x + this.data[4] * y + this.data[8] * z + this.data[12]
      this.data[13] = this.data[1] * x + this.data[5] * y + this.data[9] * z + this.data[13]
      this.data[14] = this.data[2] * x + this.data[6] * y + this.data[10] * z + this.data[14]
      this.data[15] = this.data[3] * x + this.data[7] * y + this.data[11] * z + this.data[15]
    } else {
      let a00 = this.data[0]
      let a01 = this.data[1]
      let a02 = this.data[2]
      let a03 = this.data[3]
      let a10 = this.data[4]
      let a11 = this.data[5]
      let a12 = this.data[6]
      let a13 = this.data[7]
      let a20 = this.data[8]
      let a21 = this.data[9]
      let a22 = this.data[10]
      let a23 = this.data[8]

      result.data[0] = a00
      result.data[1] = a01
      result.data[2] = a02
      result.data[3] = a03
      result.data[4] = a10
      result.data[5] = a11
      result.data[6] = a12
      result.data[7] = a13
      result.data[8] = a20
      result.data[9] = a21
      result.data[10] = a22
      result.data[11] = a23

      result.data[12] = a00 * x + a10 * y + a20 * z + this.data[12]
      result.data[13] = a01 * x + a11 * y + a21 * z + this.data[13]
      result.data[14] = a02 * x + a12 * y + a22 * z + this.data[14]
      result.data[15] = a03 * x + a13 * y + a23 * z + this.data[15]
    }

    return result
  }

  rotateZ (angle, result) {
    result = result || new Matrix4()

    let s = Math.sin(angle)
    let c = Math.cos(angle)

    let a00 = this.data[0]
    let a01 = this.data[1]
    let a02 = this.data[2]
    let a03 = this.data[3]
    let a10 = this.data[4]
    let a11 = this.data[5]
    let a12 = this.data[6]
    let a13 = this.data[7]

    result.data[0] = a00 * c + a10 * s
    result.data[1] = a01 * c + a11 * s
    result.data[2] = a02 * c + a12 * s
    result.data[3] = a03 * c + a13 * s

    result.data[4] = a00 * -s + a10 * c
    result.data[5] = a01 * -s + a11 * c
    result.data[6] = a02 * -s + a12 * c
    result.data[7] = a03 * -s + a13 * c

    if (result !== this) {
      result.data[8] = this.data[8]
      result.data[9] = this.data[9]
      result.data[10] = this.data[10]
      result.data[11] = this.data[11]
      result.data[12] = this.data[12]
      result.data[13] = this.data[13]
      result.data[14] = this.data[14]
      result.data[15] = this.data[15]
    }

    return result
  }
}

module.exports = Matrix4
