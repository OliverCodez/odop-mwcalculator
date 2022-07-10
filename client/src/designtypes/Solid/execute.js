import config from '../../config';
export function getExecuteNames() {
    var result;
    if (config.node.env !== "production") {
      result = [
          'mk70PoundGoldBar',
          'mkStandardGoldBar',
          'mkStartup',
          'mkSolidStartups',
          'mkUSPS_MachinableParcels',
          'mkUSPS_MaxVolume',
      ];
    } else {
      result = [];
    }
//    console.log('In getExecuteNames result=',result);
    return result;
}

export function getDemoNames() {
    var result = [];
//    console.log('In getDemoNames result=',result);
    return result;
}

export function getTutorialNames() {
    var result = [
        'tutor'
    ];
//    console.log('In getTutorialNames result=',result);
    return result;
}
