angular.module('orderCloud')
    .controller('ProductImagesCtrl', ProductImagesController)
;

function ProductImagesController(OrderCloudSDK, SelectedProduct, toastr) {
    var vm = this;
    vm.model = angular.copy(SelectedProduct);
    vm.defaultImage = vm.model.xp && vm.model.xp.image ? vm.model.xp.image.URL : null;
    vm.additionalImages = vm.model.xp && vm.model.xp.image && vm.model.xp.image.Items && vm.model.xp.image.Items.length ? vm.model.xp.image.Items : null;

    vm.toggleZoom = toggleZoom;

    function toggleZoom() {
        return OrderCloudSDK.Products.Patch(vm.model.ID, {
            xp: {
                imageZoom: vm.model.xp.imageZoom
            }
        }).then(function(data) {
            var message;
            if(data.xp.imageZoom) {
                message = 'Zoom enabled on images for ' + vm.model.Name;
            } else {
                message = 'Zoom disabled on images for ' + vm.model.Name;
            }
            toastr.success(message, 'Success');
        });
    }
}