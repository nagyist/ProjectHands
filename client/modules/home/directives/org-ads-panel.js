angular.module('ProjectHands.home')

    .directive('orgAdsPanel', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'modules/home/templates/directives/org-ads-panel.html',
            controller: function ($scope, HomeService) {

                // $scope.ads = [
                //     {
                //         header: "הפרויקט - מדוע הוקם",
                //         text: "פרויקט ידיים קם בהשראתו ולזכרו של סבא מנחם מוזס זל ששרד את התופת של אושוויץ והפליא לבנות בארץ חיים צנועים ומלאים, עם חיוך וקריצה, עם יצירתיות וכשרון אדיר, ועם רגישות מיוחדת לאדם, לחי ולסביבה."
                //     },
                //     {
                //         header: "מי המתנדבים",
                //         text: "המכנה המשותף לכל המתנדבים הוא ידיים טובות וקצת ניסון טכני. המתנדבים הם אנשים רגילים מכל המקצועות (הייטקיסטים, מורים, כבאים, רואי חשבון, סטודנטים, אנשי עסקים, נגרים, ועוד) שנהנים לעבוד עם הידיים ולתת לחוש הטכני ביטוי."
                //     },
                //     {
                //         header: "איך זה עובד?",
                //         text: "אנחנו עובדים מול גורמי רווחה שונים על מנת לאתר אנשים שגרים בדירות שזקוקות לשיפוץ משמעותי ובתנאים קשים. לפעמים זוג קשישים, לפעמים אדם נכה, ולפעמים משפחה קשת יום. לאחר מכן אנחנו מגיעים לביקור בדירה כדי לבדוק מהם הצרכים ולהכין תוכנית עבודה, רשימת חומרים נדרשים וכו. כל התהליך מתבצע ברגישות גבוהה לצנעת הפרט ולכבודם של בעלי הבית, ובשיתוף מלא איתם. כל דירה כזאת משודכת לצוות של כ 5-6 מתנדבים מהאזור שקובע לעצמו תאריך לשיפוץ. השאיפה היא שבכל צוות יהיו חברים קבועים שיעבדו ביחד אחת למספר חודשים."
                //     },
                //     {
                //         header: "השיפוץ:",
                //         text: "אנחנו עושים שיפוצים רכים: תיקוני טיח, צביעה, התקנת מדפים, מאווררים, קירות גבס, תיקוני מנעולים, קרמיקה, תריסים, רהיטים וכו. תאורה, ברזים, חידוש אמבטיה ועוד. השיפות מתחיל ונגמר באותו יום, בתוך מספר שעות. הנסיון שהצטבר מלמד שבתכנון חכם, בעבודת צוות טובה ועם קצת יצירתיות ניתן להספיק המון ולשדרג בצורה משמעותית ביותר את תנאי המחייה בבית. בשיפוץ ניתן דגש על אסתטיקה, אווירה נעימה ונוחות בבית. בחלק מהמקרים אנחנו אפילו מביאים אתנו תמונות יפות שבעלי הבית יכולים לבחור מתוכן ולתלות על הקיר. התוצאות של העבודה בדרכ מרשימות ומרגשות מאוד את בעלי הבית ועוד יותר את צוות המתנדבים..."
                //     },
                //     {
                //         header: "מאיפה הכסף?",
                //         text: "מתרומות של אנשים טובים, כמובן. עלות שיפוץ דירה נעה בין 600 ל- 200 שקלים. הכסף מיועד לחומרי הבנייה בלבד, שנקנים במחירי עלות מעסקים שנרתמו לטובת הפרויקט. את כלי העבודה המתנדבים מביאים איתם מהבית."
                //     }
                // ];
                
                $scope.ad = {
                    title: '',
                    content: ''
                };

                $scope.ads = [];
                
                $scope.getAds = function () {
                    HomeService.getAds()
                        .then(function (result) {
                            console.log('result ' + result.toString());
                            $scope.ads = result;
                        })
                        .catch(function (error) {
                            console.log('error ' + error.toString());
                        });
                };

                $scope.getAds();


                $scope.upload = function (title, content) {

                    if ($scope.adsForm.$invalid)
                        return;

                    HomeService.uploadAd(title, content)
                        .then(function (result) {
                            console.log('result ' + result.toString());
                            $scope.ads.push(result.ops[0]);
                            resetForm();
                        })
                        .catch(function (error) {
                            console.log('error ' + error.toString());
                        });
                };

                function resetForm() {
                    $scope.ad = {
                        title: '',
                        content: ''
                    };
                }

                $scope.deleteAd = function (id, index) {
                    HomeService.deleteAd(id)
                        .then(function (result) {
                            console.log('result ' + result.toString());
                            $scope.ads.splice(index, 1);

                        })
                        .catch(function (error) {
                            console.log('error ' + error.toString());
                        });
                }
            }
        };

    });
