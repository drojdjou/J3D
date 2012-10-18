J3D.V2 = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    // Keep and internal array representation of the vector to quickly send it as uniform to a shader
    this.array = new Float32Array([this.x, this.y]);
}

/**
 * Adds two vectors. Vectors can be recylced to avoid creating vec vectors like this:
 *
 * a.sum(a, b);
 *
 * Since this method returns the current instance, method calls can be chained:
 *
 * a.sum(a, b).sum(a, c) means: a + b + c
 *
 * @param a a vector
 * @param b another vector
 * @returns this vector
 */
J3D.V2.prototype.sum = function(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
}

/**
 * Subtracts this vector from v. Used to get a vector going from current to v.
 * In order to limit creation of new objects pass en existing vector as 2nd argument.
 *
 * @param v the vector to subtract from the current vector
 * @param r the resulting vector, if omitted, new vector is returned
 * @returns the resulting vector
 */
J3D.V2.prototype.sub = function(v, r) {
    r = r || new J3D.V2();
    r.x = v.x - this.x;
    r.y = v.y - this.y;
    return r;
}

/**
 * @returns the vector in array form
 */
J3D.V2.prototype.toUniform = function() {
    this.array[0] = this.x;
    this.array[1] = this.y;
    return this.array;
}

/**
 * @returns true if it's a zero vector
 */
J3D.V2.prototype.isZero = function() {
    return this.x == 0 && this.y == 0;
}

/**
 * @returns a random vector where x and y are in range [-1, 1]
 */
J3D.V2.random = function() {
    return new J3D.V2(Math.random() * 2 - 1, Math.random() * 2 - 1);
}
