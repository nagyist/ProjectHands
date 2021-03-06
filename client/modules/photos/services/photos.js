angular.module('ProjectHands.photos')

    .factory("PhotosService", function ($rootScope, $resource, $cookies, Upload, $q) {

        var baseUrl = '/api/photos';

        ///profile methods
        function profileUpload(album, file) {
            var deferred = $q.defer();
            Upload.upload({
                url: baseUrl + '/profileUpload',
                data: {
                    album: album,
                    file: file
                }
            }).then(function (resp) {
                deferred.resolve(resp.data);
            }, null, function (evt) {

            }).catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function profileDelete(fileId) {
            var deferred = $q.defer();
            $resource(baseUrl + '/profileDelete').delete({
                file_id: fileId
            })
                .$promise
                .then(function (result) {
                    deferred.resolve(result);

                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function profileGet(album) {
            var deferred = $q.defer();
            $resource(baseUrl + '/profileGet').query({
                album: album
            }).$promise
                .then(function (result) {
                    deferred.resolve(result);

                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        ///

        ///home methods i am using the service in
        function renoUpload(album, file) {
            var deferred = $q.defer();
            Upload.upload({
                url: baseUrl + '/renoUpload',
                data: {
                    album: album,
                    file: file
                }
            }).then(function (resp) {
                deferred.resolve(resp.data);
            }, null, function (evt) {

            }).catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function renoDelete(fileId) {
            var deferred = $q.defer();
            $resource(baseUrl + '/renoDelete').delete({
                file_id: fileId
            })
                .$promise
                .then(function (result) {
                    deferred.resolve(result);

                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function renoGet(album) {
            var deferred = $q.defer();
            $resource(baseUrl + '/renoGet').query({
                album: album
            }).$promise
                .then(function (result) {
                    deferred.resolve(result);

                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        ///

        ///
        function homeUpload(album, file) {
            var deferred = $q.defer();
            Upload.upload({
                url: baseUrl + '/homeUpload',
                data: {
                    album: album,
                    file: file
                }
            }).then(function (resp) {
                deferred.resolve(resp.data);
            }, null, function (evt) {

            }).catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function homeDelete(fileId) {
            var deferred = $q.defer();
            $resource(baseUrl + '/homeDelete').delete({
                file_id: fileId
            })
                .$promise
                .then(function (result) {
                    deferred.resolve(result);

                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function homeGet(album) {
            var deferred = $q.defer();
            $resource(baseUrl + '/homeGet').query({
                album: album
            }).$promise
                .then(function (result) {
                    deferred.resolve(result);

                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        ///

        function uploadPhoto(album, file) {
            var deferred = $q.defer();
            Upload.upload({
                url: baseUrl + '/uploads',
                data: {
                    album: album,
                    file: file
                }
            }).then(function (resp) {
                deferred.resolve(resp.data);
            }, null, function (evt) {

            }).catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function deletePhoto(fileId) {
            var deferred = $q.defer();
            $resource(baseUrl + '/delete').delete({
                file_id: fileId
            })
                .$promise
                .then(function (result) {
                    deferred.resolve(result);

                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getPhotos(album) {
            var deferred = $q.defer();
            $resource(baseUrl + '/album').query({
                album: album
            }).$promise
                .then(function (result) {
                    console.log(result);
                    deferred.resolve(result);

                })
                .catch(function (error) {
                    console.log(error);
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            renoUpload: renoUpload,
            renoDelete: renoDelete,
            renoGet: renoGet,
            homeUpload: homeUpload,
            homeDelete: homeDelete,
            homeGet: homeGet,
            profileUpload: profileUpload,
            profileDelete: profileDelete,
            profileGet: profileGet
        };
    });
