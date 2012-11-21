J3D.Performance = (function() {

    function PerformanceMonitor() {

        this.clear = function() {
            this.numTransforms = 0;
            this.dirVecCalls = 0;
            this.vectorsPerFrame = 0;
            this.programChaged = 0;
            this.localMatrixUpdate = 0;
            this.numColorArrays = 0;
            this.numVectorArrays = 0;
        }

        var addp = function(n, v) {
            return '<li>' + n + ' ' + v + '</li>';
        }

        this.printInfo = function() {

            var i = '';
            i += addp('',                       J3D.getVersion());
            i += addp('Transforms',             this.numTransforms);
            i += addp('Vectors/frame',          this.vectorsPerFrame);
            i += addp('Vector array/frame',     this.numVectorArrays);
            i += addp('Num color array/frame',  this.numColorArrays);
            i += addp('Vectors total',          this.numVectors);
            i += addp('Matrices',               this.numMatrices);
            i += addp('Program changed',        this.programChaged);
            i += addp('Loc matrix updt',        this.localMatrixUpdate);
            i += addp('Num colors',             this.numColors);
            i += addp('Dir vector calls',       this.dirVecCalls);

            this.domElement.innerHTML = '<ul>' + i + '</ul>';
        }

        this.domElement = document.createElement('div');
        this.clear();

        this.numVectors = 0;
        this.numMatrices = 0;
        this.numColors = 0;

    }

    return new PerformanceMonitor();

})();