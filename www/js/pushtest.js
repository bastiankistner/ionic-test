/* global device */

var senderID = "691189984723";

var pushNotification;

document.addEventListener("deviceready", function(){
    pushNotification = window.plugins.pushNotification;
    
    initPushNotifications();
    
    
    // test for iOS
    if (device.platform == 'iOS' ||device.platform == 'ios') {
        var badgeCount = 5;
        pushNotification.setApplicationIconBadgeNumber(iOSBadgeHandlerSuccessCallback, iOSBadgeHandlerErrorCallback, badgeCount);
    }
    
    
});

function iOSBadgeHandlerSuccessCallback (result) {
    console.log(result);
}

function iOSBadgeHandlerErrorCallback (error) {
    console.log(error);
}



function initPushNotifications() {
    //$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
    if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
        pushNotification.register(
        successHandler,
        errorHandler,
        {
            "senderID": senderID,
            "ecb":"onNotification"
        });
    } else if ( device.platform == 'blackberry10'){
       console.log('blackberry 10 not implemented here');
    } else {
        pushNotification.register(
        iOSTokenHandler,
        errorHandler,
        {
            "badge":"true",
            "sound":"true",
            "alert":"true",
            "ecb":"onNotificationAPN"
        });
    }
}

function iOSTokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    alert('device token = ' + result);
}

function successHandler(result) {
    alert(result);
}

function errorHandler(error) {
    alert(error);
}