class Skiing {
    availablePaths = [];
    mapSize = {
        x: 4,
        y: 4
    };
    currentPosition = {
        x: 0,
        y: 0
    }

    constructor(private data?: any[]) {

    }
    start() {
        for (let y = 0; y < this.mapSize.y; y++) {
            for (let x = 0; x < this.mapSize.x; x++) {
                let p = [];
                p.push(this.data[y][x]);
                this.explore(x, y, p);
            }
        }
        let _sortedPath = this.availablePaths.sort((a: any, b: any) => {
            let _a = a.reduce((q, w) => {
                return q + w;
            });
            let _b = b.reduce((e, r) => {
                return e + r;
            });

            if (_a > _b)
                return -1;
            if (_a < _b)
                return 1;
            return 0;
        });

        // Filter longest path
        if (_sortedPath.length > 1) {
            let _maxWeight = _sortedPath.map(a => {
                return a.length;
            }).sort((_a, _b) => _a - _b).reverse()[0];

            _sortedPath = _sortedPath.filter(a => a.length === _maxWeight);
        }

        // Filter steepest path 
        if (_sortedPath.length > 1) {
            let _maxStep = _sortedPath.map(a => {
                return (a[0] - a[a.length - 1]);
            })[0];

            _sortedPath = _sortedPath.filter(a => (a[0] - a[a.length - 1]) === _maxStep);
        }
        _sortedPath = _sortedPath[0];

        console.log("Longest path:", _sortedPath, "Drop:", (_sortedPath[0] - _sortedPath[_sortedPath.length - 1]));
    }
    explore(x: number, y: number, path: any[]) {
        if (y == this.mapSize.y - 1) {
            this.availablePaths.push(path);
        }
        // Right Node
        if (x < (this.mapSize.x - 1)) {
            if (this.data[y][x + 1] < this.data[y][x]) {
                // console.log("Increasing X");
                let p = path.concat();
                p.push(this.data[y][x + 1]);
                this.explore(x + 1, y, p.concat());
            }
        }

        // Left node
        if (x > 0) {
            // console.log("Decreasing X");
            if (this.data[y][x - 1] < this.data[y][x]) {
                let p = path.concat();
                p.push(this.data[y][x - 1]);
                this.explore(x - 1, y, p.concat());
            }
        }

        // Bottom Node
        if (y < this.mapSize.y - 1) {
            if (this.data[y + 1][x] < this.data[y][x]) {
                if (x == 3 && y == 2)
                    console.log("Increasing Y", this.data[y + 1][x], this.data[y][x], this.data[y + 1][x] < this.data[y][x]);
                let p = path.concat();
                p.push(this.data[y + 1][x]);
                this.explore(x, y + 1, p.concat());
            }
        }

        // Top Node
        if (y > 0) {
            if (this.data[y - 1][x] < this.data[y][x]) {
                // console.log("Decreasing Y");
                let p = path.concat();
                p.push(this.data[y - 1][x]);
                this.explore(x, y - 1, p.concat());
            }
        }
    }
    getInput() {
        const readline = require('readline');
        var _data = [];

        const rl = readline.createInterface({
            input: process.stdin
        });

        rl.question('', (matrixSize) => {
            let x, y;
            let _d = matrixSize.split(" ");
            x = parseInt(_d[0]);
            y = parseInt(_d[1]);
            this.readLine(y, x, rl);
        });

    }
    private readLine(y, x, rl) {
        if (y < 1) {
            this.data = _data;
            this.start();
            rl.close();
            return;
        }
        rl.question('', (matrixSize) => {
            var _d = matrixSize.split(" ").map(function (item) {
                return parseInt(item, 10);
            });;
            _data.push(_d);
            this.readLine(--y, x, rl)
        });
    }
}

var _data = []
var obj = new Skiing();
obj.getInput();
