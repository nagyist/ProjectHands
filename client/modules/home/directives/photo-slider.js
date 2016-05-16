angular.module('ProjectHands.home')

    .directive('photoSlider', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'modules/home/templates/directives/photo-slider.html',
            controller: function ($scope, $interval) {

                $scope.slides = [
                    {image: 'assets/img/home/jobs1.jpg', description: 'Image 00'},
                    {image: 'assets/img/home/jobs2.jpg', description: 'Image 01'},
                    {image: 'assets/img/home/jobs3.jpg', description: 'Image 02'},
                    {image: 'assets/img/home/jobs4.jpg', description: 'Image 04'},
                    {image: 'assets/img/home/jobs5.jpg', description: 'Image 05'},
                    {image: 'assets/img/home/jobs6.jpg', description: 'Image 06'},
                    {image: 'assets/img/home/jobs7.jpg', description: 'Image 07'},
                    {image: 'assets/img/home/jobs8.jpg', description: 'Image 08'},
                    {image: 'assets/img/home/jobs9.jpg', description: 'Image 09'}
                ];

                $scope.direction = 'left';
                $scope.currentIndex = 0;

                $scope.setCurrentSlideIndex = function (index) {
                    $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
                    $scope.currentIndex = index;
                };

                $scope.isCurrentSlideIndex = function (index) {
                    return $scope.currentIndex === index;
                };

                $scope.prevSlide = function () {
                    $scope.direction = 'left';
                    $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
                };

                $scope.nextSlide = function () {
                    $scope.direction = 'right';
                    $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
                };

                $scope.isMouseOver = false;
                var interval = 10000 / 3;

                $interval(function () {
                    if ($scope.isMouseOver===false)
                        $scope.nextSlide();
                }, interval);//
            }
        };
    }).animation('.slide-animation', function () {
    return {
        beforeAddClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                var finishPoint = element.parent().width();
                if (scope.direction !== 'right') {
                    finishPoint = -finishPoint;
                }
                TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done});
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                element.removeClass('ng-hide');

                var startPoint = element.parent().width();
                if (scope.direction === 'right') {
                    startPoint = -startPoint;
                }

                TweenMax.fromTo(element, 0.5, {left: startPoint}, {left: 0, onComplete: done});
            }
            else {
                done();
            }
        }
    };
});