define('facilityList', ['underscore', 'availableFacilities',  'facility'],
    function(_, availableFacilities,  Facility) {
    'use strict';

    return function() {
        var facilities = [];
        var baseEnergyOutput = 5;
        this.addFacility = function(facilityName, currentTime) {
            facilities.push([new Facility(availableFacilities[facilityName]), currentTime]);
        };

        this.removeFacility = function(facility) {
            var facilityIndex = _.map(facilities, function(x) { return x[0]; }).indexOf(facility);
            facilities.splice(facilityIndex, 1);
        };

        this.getFacilityCount = function() {
            return facilities.length;
        };

        this.getFacility = function(index) {
            return facilities[index][0];
        };

        this.update = function(currentTime, unfloodedLandArea) {

            var grossEnergyProduced = _.reduce(facilities, function(sum, next) {
                var delta = next[0].energyDelta();
                var energyProduced = delta > 0 ? delta : 0;
                return sum + energyProduced;
            }, baseEnergyOutput);

            _.reduce(facilities, function(energy, next) {
                return next[0].update(energy);
            }, grossEnergyProduced);

            var foodDelta =  _.reduce(facilities, function(sum, next) {
                return sum + next[0].foodDelta();
            }, 0);
            var pollutionDelta = _.reduce(facilities, function(sum, next) { return sum + next[0].pollutionDelta(); }, 0);

            var consumedLandArea = _.reduce(this.facilities, function(sum, next) { return sum + next.landCost; }, 0);
            return {
                buildableLandArea: unfloodedLandArea - consumedLandArea,
                pollutionDelta: pollutionDelta,
                foodDelta: foodDelta
            };
        };
    };
});
