define(['require', 'arrayUtils', 'construction'], function(require, arrayUtils) {
    var cells = [];
    var construction;

    beforeEach(function() {
        setupGrid();
        construction = require('construction');
    });

    describe('placeBuilding', function() {
        it('should place building on neighbouring cells', function() {
            var site = construction.placeBuilding(cells, cells[0], 2);

            expect(site.length).toBe(2);
            expect(site[0]).toBe(cells[0]);
            expect(site[1].neighbours).toContain(cells[0]);
        });

        it('should place building on closest neighbours to root', function() {
            var site = construction.placeBuilding(cells, cells[0], 4);

            expect(site.length).toBe(4);
            expect(site).toContain(cells[0]);

            for (var i = 0; i < site.length; ++i) {
                console.log(cells.indexOf(site[i]));
            }


//            expect(site).toContain(cells[1]);
//            expect(site).toContain(cells[5]);
//            expect(site).toContain(cells[6]);
        });

        it('should not allow building to be placed over water', function() {

        });

        it('should not allow building to be placed over another building', function() {

        });
    });

    /**
     * Sets up a simple 20-cell hex grid, with
     * cell indices in the following layout:
     *
     *         00  01  02  03  04
     *       05  06  07  08  09
     *         10  11  12  13  14
     *       15  16  17  18  19
     */
    function setupGrid() {
        for (var i = 0; i < 20; ++i) {
            var cell = {
                neighbours: [],
                attributes: ['land']
            };
            cells.push(cell);

            if (i % 5 > 0) {
                linkNeighbours(i, i-1);
            }
            var rowIndex = Math.floor(i / 5);


            if (i > 4) {
                linkNeighbours(i, rowIndex === 2 ? i - 4 : i - 5);

                if (rowIndex === 2 || i % 5 > 0) {
                    linkNeighbours(i, rowIndex === 2 ? i - 5: i - 6);
                }
            }
        }
    }

    function linkNeighbours(i, j) {
//        if (i === 0 || j === 0) {
//            console.log(i,j);
//        }
        arrayUtils.addIfNotPresent(cells[i].neighbours, cells[j]);
        arrayUtils.addIfNotPresent(cells[j].neighbours, cells[i]);
    }
});