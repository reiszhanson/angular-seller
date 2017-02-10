angular.module('orderCloud')
    .controller('OrderLineItemEditModalCtrl', OrderLineItemEditModalController)
;

function OrderLineItemEditModalController($uibModalInstance, OrderCloud, BuyerID, OrderID, LineItem) {
    var vm = this;
    var originalLineItemID = angular.copy(LineItem.ID);
    vm.lineItem = angular.copy(LineItem);
    if (vm.lineItem.DateNeeded) vm.lineItem.DateNeeded = new Date(vm.lineItem.DateNeeded);

    vm.updateValidity = function() {
        if (vm.form.ID.$error['LineItem.UnavailableID']) vm.form.ID.$setValidity('LineItem.UnavailableID', true);
    };

    vm.submit = function() {
        var partial = _.pick(vm.lineItem, ['ID', 'Quantity', 'UnitPrice', 'DateNeeded']);
        if (partial.DateNeeded) partial.DateNeeded = new Date(partial.DateNeeded);
        vm.loading = OrderCloud.LineItems.Patch(OrderID, originalLineItemID, partial, BuyerID)
            .then(function(data) {
                data.OriginalID = originalLineItemID;
                $uibModalInstance.close(data);
            })
            .catch(function(ex) {
                if (ex.status == 409) {
                    vm.form.ID.$setValidity('LineItem.UnavailableID', false);
                    vm.form.ID.$$element[0].focus();
                } else {
                    $exceptionHandler(ex);
                }
            });
    };

    vm.cancel = function() {
        $uibModalInstance.dismiss();
    };
}