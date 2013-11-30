define('globe', ['jquery', 'd3'], function ($, d3) {
    'use strict';

    return {
        create: function (parent, cells) {
            var origin = [0, -5];

            var projection = d3.geo.orthographic()
                .rotate(origin)
                .scale((parent.clientHeight / 2) - 10)
                .clipAngle(90);

            var path = d3.geo.path().projection(projection);

            var svg = d3.select(parent).append('svg')
                .attr('width', parent.clientWidth)
                .attr('height', parent.clientHeight);

            var polygons = svg.selectAll('path')
                .data(cells)
                .enter().append('path');

            var redraw = function() {
                polygons
                    .attr('class', function (cell) {
                        return cell.attributes.join(' ');
                    })
                    .attr('d', path);
            };

            cells.forEach(function (cell, index) {
                cell.polygon = polygons[0][index];
            });

            redraw();

            $(document).keydown(function (e) {
                switch (e.keyCode) {
                case 37:
                    origin[0] -= 5;
                    projection.rotate(origin);
                    redraw();
                    break;
                case 39:
                    origin[0] += 5;
                    projection.rotate(origin);
                    redraw();
                    break;
                default:
                    break;
                }
            });

            return {
                redraw: redraw
            };
        }
    };
});