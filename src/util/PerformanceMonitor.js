J3D.Performance = (function() {

    function PerformanceMonitor() {

        this.clear = function() {
            this.numTransforms = 0;
            this.dirVecCalls = 0;
            this.vectorsPerFrame = 0;
            this.programChaged = 0;
            this.localMatrixUpdate = 0;
        }

        this.printInfo = function() {

            var i = '';

            i += '<ul>'
            i += '<li>' + J3D.getVersion() + '</li>';
            i += '<li>Transforms ' + this.numTransforms + '</li>';
            i += '<li>Vectors/frame ' + this.vectorsPerFrame + '</li>';
            i += '<li>Vectors total ' + this.numVectors + '</li>';
            i += '<li>Matrices ' + this.numMatrices + '</li>';
            i += '<li>Program changed ' + this.programChaged + '</li>';
            i += '<li>Loc matrix updt ' + this.localMatrixUpdate + '</li>';
//            i += '<li>Directional vector calls ' + this.dirVecCalls + '</li>';
            i += '</ul>';

            this.domElement.innerHTML = i;


        }

        this.domElement = document.createElement('div');
        this.clear();

        this.numVectors = 0;
        this.numMatrices = 0;
    }

    return new PerformanceMonitor();

})();