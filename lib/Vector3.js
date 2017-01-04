'use strict'

const ArrayType = (typeof Float32Array !== 'undefined') ? Float32Array : Array

class Vector3 {
  constructor (values) {
    this.data = new ArrayType(3)

    if (values) {
      if (values.length === 3) {
        this.data[0] = values[0]
        this.data[1] = values[1]
        this.data[2] = values[2]
      } else if (values.length === 1) {
        this.data[0] = values[0]
        this.data[1] = values[0]
        this.data[2] = values[0]
      }
    }
  }

  toString () {
    return '(' + this.data[0] + ',' + this.data[1] + ',' + this.data[2] + ')'
  }

  toMatrix3 (result) {
    let Matrix3 = Vector3.Matrix3 || (Vector3.Matrix3 = require('./Matrix3'))

    result = result || new Matrix3()

    result.data[1] = result.data[2] = result.data[3] = result.data[5] = result.data[6] = result.data[7] = 0

    result.data[0] = this.data[0]
    result.data[4] = this.data[1]
    result.data[8] = this.data[2]

    return result
  }

  add (other, result) {
    result = result || new Vector3()

    if (result === this) {
      this.data[0] += other.data[0]
      this.data[1] += other.data[1]
      this.data[2] += other.data[2]
    } else {
      result.data[0] = this.data[0] + other.data[0]
      result.data[1] = this.data[1] + other.data[1]
      result.data[2] = this.data[2] + other.data[2]
    }

    return result
  }

  multiply (matrix, result) {
    result = result || new Vector3()

    let a = this.data[0]
    let b = this.data[1]
    let c = this.data[2]

    result.data[0] = matrix.data[0] * a + matrix.data[1] * b + matrix.data[2] * c
    result.data[1] = matrix.data[3] * a + matrix.data[4] * b + matrix.data[5] * c
    result.data[2] = matrix.data[6] * a + matrix.data[7] * b + matrix.data[8] * c

    return result
  }
}

module.exports = Vector3
