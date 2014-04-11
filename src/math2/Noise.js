SQR.Noise = {
    random3_seed: 1
};

SQR.Noise.isPrime = function(n) {
    for (var c = 2; c <= n - 1; c++) {
        if (n % c == 0) return false;
    }
    return true;
};


// RETURNS CONSTANT VALUE (1) AFTER SOME TIME
// From http://freespace.virgin.net/hugo.elias/models/m_perlin.htm
SQR.Noise.random1 = function(seed) {
    seed = ( seed << 13) ^ seed;
    return ( 1.0 - ( (seed * (seed * seed * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824);
}

// OBVIOUS PATTERNS
// Adapted from https://github.com/ashima/webgl-noise/blob/master/src/classicnoise2D.glsl
SQR.Noise.random2 = function(seed) {
    seed = ( seed << 13) ^ seed;
    seed = (seed * 16807 + 16807) % 255;
    return seed;
}

// GOOD RANDOM, but sequential...
// http://www.firstpr.com.au/dsp/rand31/#Source
// http://lab.polygonal.de/?p=162
SQR.Noise.random3 = function() {
    var seed = SQR.Noise.random3_seed;
    var mod = 2147483647;
    var mul = 16807;
    SQR.Noise.random3_seed = (seed * mul) % mod;
    return SQR.Noise.random3_seed / mod;
}