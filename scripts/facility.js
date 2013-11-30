define('facility', function() {
    'use strict';

    return function(facilityTemplate) {
        var timeBuilt = 0;
        this.isPowered = false;

        this.name = facilityTemplate.name;
        this.landCost = facilityTemplate.landCost;

        this.energyDelta = function() {
            return this.isPowered ? this.baseEnergyDelta() : 0;
        };

        this.baseEnergyDelta = function() {
            return this.getDeltas().energy;
        };

        this.pollutionDelta = function() {
            return this.isPowered ? this.getDeltas().pollution : 0;
        };

        this.foodDelta = function() {
            return this.isPowered ? this.getDeltas().food : 0;
        };

        this.getDeltas = function() {
            return this.isBuilt() ? facilityTemplate.normalDelta : facilityTemplate.buildDelta ;
        };

        this.isBuilt = function()
        {
            return timeBuilt >= facilityTemplate.buildDuration;
        };

        this.update = function(remainingPower) {
            if (remainingPower >= -this.baseEnergyDelta()) {
                timeBuilt++;
                this.isPowered = true;
                return remainingPower + this.baseEnergyDelta();
            } else {
                this.isPowered = false;
                return remainingPower;
            }
        };
    };
});
