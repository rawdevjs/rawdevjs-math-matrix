'use strict'

const Matrix4 = require('./Matrix4')
const Vector3 = require('./Vector3')

const ArrayType = (typeof Float32Array !== 'undefined') ? Float32Array : Array

class Matrix3 {
  constructor (values) {
    this.data = new ArrayType(9)

    if (values) {
      if (values.length === 9) {
        this.data[0] = values[0]
        this.data[1] = values[1]
        this.data[2] = values[2]
        this.data[3] = values[3]
        this.data[4] = values[4]
        this.data[5] = values[5]
        this.data[6] = values[6]
        this.data[7] = values[7]
        this.data[8] = values[8]
      } else if (values.length === 3) {
        this.data[0] = values[0]
        this.data[1] = 0
        this.data[2] = 0
        this.data[3] = 0
        this.data[4] = values[1]
        this.data[5] = 0
        this.data[6] = 0
        this.data[7] = 0
        this.data[8] = values[2]
      }
    } else {
      this.data[0] = 1
      this.data[1] = 0
      this.data[2] = 0
      this.data[3] = 0
      this.data[4] = 1
      this.data[5] = 0
      this.data[6] = 0
      this.data[7] = 0
      this.data[8] = 1
    }
  }

  toString () {
    return '(' +
      this.data[0].toFixed(4) + ',' +
      this.data[1].toFixed(4) + ',' +
      this.data[2].toFixed(4) + ',' +
      this.data[3].toFixed(4) + ',' +
      this.data[4].toFixed(4) + ',' +
      this.data[5].toFixed(4) + ',' +
      this.data[6].toFixed(4) + ',' +
      this.data[7].toFixed(4) + ',' +
      this.data[8].toFixed(4) + ')'
  }

  toVector3 (result) {
    result = result || new Vector3()

    result.data[0] = this.data[0]
    result.data[1] = this.data[4]
    result.data[2] = this.data[8]

    return result
  }

  toMatrix4 (result) {
    result = result || new Matrix4()

    result.data[0] = this.data[0]
    result.data[1] = this.data[1]
    result.data[2] = this.data[2]

    result.data[4] = this.data[3]
    result.data[5] = this.data[4]
    result.data[6] = this.data[5]

    result.data[8] = this.data[6]
    result.data[9] = this.data[7]
    result.data[10] = this.data[8]

    return result
  }

  scale (vector, result) {
    result = result || new Matrix3()

    let x = vector.data[0]
    let y = vector.data[1]
    let z = vector.data[2]

    if (result === this) {
      this.data[0] *= x
      this.data[1] *= x
      this.data[2] *= x
      this.data[3] *= y
      this.data[4] *= y
      this.data[5] *= y
      this.data[6] *= z
      this.data[7] *= z
      this.data[8] *= z
    } else {
      result.data[0] = this.data[0] * x
      result.data[1] = this.data[1] * x
      result.data[2] = this.data[2] * x
      result.data[3] = this.data[3] * y
      result.data[4] = this.data[4] * y
      result.data[5] = this.data[5] * y
      result.data[6] = this.data[6] * z
      result.data[7] = this.data[7] * z
      result.data[8] = this.data[8] * z
    }

    return result
  }

  multiply (other, result) {
    result = result || new Matrix3()

    let a00 = this.data[0]
    let a01 = this.data[1]
    let a02 = this.data[2]
    let a10 = this.data[3]
    let a11 = this.data[4]
    let a12 = this.data[5]
    let a20 = this.data[6]
    let a21 = this.data[7]
    let a22 = this.data[8]

    let b00 = other.data[0]
    let b01 = other.data[1]
    let b02 = other.data[2]
    let b10 = other.data[3]
    let b11 = other.data[4]
    let b12 = other.data[5]
    let b20 = other.data[6]
    let b21 = other.data[7]
    let b22 = other.data[8]

    result.data[0] = a00 * b00 + a01 * b10 + a02 * b20
    result.data[1] = a00 * b01 + a01 * b11 + a02 * b21
    result.data[2] = a00 * b02 + a01 * b12 + a02 * b22
    result.data[3] = a10 * b00 + a11 * b10 + a12 * b20
    result.data[4] = a10 * b01 + a11 * b11 + a12 * b21
    result.data[5] = a10 * b02 + a11 * b12 + a12 * b22
    result.data[6] = a20 * b00 + a21 * b10 + a22 * b20
    result.data[7] = a20 * b01 + a21 * b11 + a22 * b21
    result.data[8] = a20 * b02 + a21 * b12 + a22 * b22

    return result
  }

  inverse (result) {
    result = result || new Matrix3()

    let a00 = this.data[0]
    let a01 = this.data[1]
    let a02 = this.data[2]
    let a10 = this.data[3]
    let a11 = this.data[4]
    let a12 = this.data[5]
    let a20 = this.data[6]
    let a21 = this.data[7]
    let a22 = this.data[8]

    let invDet = 1.0 / (a00 * a11 * a22 + a01 * a12 * a20 + a02 * a10 * a21 - a02 * a11 * a20 - a01 * a10 * a22 - a00 * a12 * a21)

    result.data[0] = (a11 * a22 - a12 * a21) * invDet
    result.data[1] = (a02 * a21 - a01 * a22) * invDet
    result.data[2] = (a01 * a12 - a02 * a11) * invDet
    result.data[3] = (a12 * a20 - a10 * a22) * invDet
    result.data[4] = (a00 * a22 - a02 * a20) * invDet
    result.data[5] = (a02 * a10 - a00 * a12) * invDet
    result.data[6] = (a10 * a21 - a11 * a20) * invDet
    result.data[7] = (a01 * a20 - a00 * a21) * invDet
    result.data[8] = (a00 * a11 - a01 * a10) * invDet

    return result
  }
}

module.exports = Matrix3
