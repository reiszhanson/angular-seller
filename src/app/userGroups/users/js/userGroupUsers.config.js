angular.module('orderCloud')
    .config(UserGroupUsersConfig)
;

function UserGroupUsersConfig($stateProvider) {
    $stateProvider
        .state('userGroup.users', {
            url: '/users?search&page&pageSize&searchOn&sortBy&filters',
            templateUrl: 'userGroups/users/templates/userGroupUsers.html',
            controller: 'UserGroupUsersCtrl',
            controllerAs: 'userGroupUsers',
            resolve: {
                Parameters: function($stateParams, OrderCloudParameters) {
                    return OrderCloudParameters.Get($stateParams);
                },
                CurrentAssignments: function($stateParams, ocUsers) {
                    return ocUsers.Assignments.Get($stateParams.buyerid, $stateParams.usergroupid);
                },
                UserList: function(Parameters, CurrentAssignments, ocUsers, OrderCloud) {
                    return OrderCloud.Users.List(null, Parameters.search, Parameters.page, Parameters.pageSize, Parameters.searchOn, Parameters.sortBy, Parameters.filters, Parameters.buyerid)
                        .then(function(data) {
                            return ocUsers.Assignments.Map(CurrentAssignments, data);
                        })
                }
            }
        })
    ;
}