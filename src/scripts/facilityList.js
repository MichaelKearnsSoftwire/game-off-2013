define('facilityList', ['underscore', 'availableFacilities', 'facilitiesUI'], function(_, availableFacilities,
                                                                                       FacilitiesUI) {
    'use strict';

    return function() {
        var facilities = [];
        var currentEnergy = 0;
        var facilitiesUI = new FacilitiesUI(this, availableFacilities);

        this.addFacility = function(facilityName, currentTime) {
            facilities.push([availableFacilities[facilityName], currentTime]);
            facilitiesUI.update(facilities);
        };

        this.removeFacility = function(facility) {
            var facilityIndex = _.map(facilities, function(x) { return x[0]; }).indexOf(facility);
            facilities.splice(facilityIndex, 1);
            facilitiesUI.update(facilities);
        };

        this.getFacilityCount = function() {
            return facilities.length;
        };

        this.getFacility = function(index) {
            return facilities[index][0];
        };

        this.update = function(unfloodedLandArea) {
            var foodDelta =  _.reduce(facilities, function(sum, next) {
                return sum + next[0].normalDelta.food;
            }, 0);
            var pollutionDelta = _.reduce(facilities, function(sum, next) { return sum + next[0].normalDelta.pollution; }, 0);
            var energyDelta = _.reduce(facilities, function(sum, next) { return sum + next[0].normalDelta.energy; }, 0);
            currentEnergy += energyDelta;

            var consumedLandArea = _.reduce(facilities, function(sum, next) { return sum + next[0].landCost; }, 0);
            var buildableLandArea = unfloodedLandArea - consumedLandArea;



            facilitiesUI.setAvailableLandArea(buildableLandArea);
            facilitiesUI.update(facilities);

            return {
                buildableLandArea: buildableLandArea,
                pollutionDelta: pollutionDelta,
                foodDelta: foodDelta
            };
        };
    };
});
