import { Analysis } from '@ptg/analysis-types';

export const twoRealizationAnalysis: Analysis = {
  correlation: -0.6313954277441398,
  analysisResults: [
    {
      rawTimeSeries: {
        dates: [
          '2024-05-31T00:00:00',
          '2024-06-30T00:00:00',
          '2024-07-31T00:00:00',
          '2024-08-31T00:00:00',
          '2024-09-30T00:00:00',
          '2024-10-31T00:00:00',
          '2024-11-30T00:00:00',
          '2024-12-31T00:00:00',
          '2025-01-31T00:00:00',
          '2025-02-28T00:00:00',
          '2025-03-31T00:00:00',
        ],
        values: [5.0, 4.9, 5.0, 5.0, 5.0, 4.9, 5.0, 5.1, 5.4, 5.4, 5.3],
      },
      inSamplePrediction: {
        dates: [
          '2024-06-30T00:00:00',
          '2024-07-31T00:00:00',
          '2024-08-31T00:00:00',
          '2024-09-30T00:00:00',
          '2024-10-31T00:00:00',
          '2024-11-30T00:00:00',
          '2024-12-31T00:00:00',
          '2025-01-31T00:00:00',
          '2025-02-28T00:00:00',
          '2025-03-31T00:00:00',
        ],
        values: [
          5.037236844904512, 4.943034605682039, 5.07464513171479,
          5.069959567288023, 5.02326238841583, 5.036731379742156,
          5.071234812883558, 5.207221991742338, 5.379559302370823,
          5.350365059910693,
        ],
        predictionLowerCi: [
          4.858734339402575, 4.764691463951533, 4.904385589694885,
          4.909887363176888, 4.863550566259368, 4.8887143928799075,
          4.923536262413612, 5.062795433842009, 5.235892065798286,
          5.206698194813232,
        ],
        predictionUpperCi: [
          5.215739350406449, 5.121377747412544, 5.244904673734694,
          5.230031771399157, 5.182974210572292, 5.184748366604404,
          5.218933363353504, 5.3516485496426665, 5.52322653894336,
          5.494031925008155,
        ],
      },
      forecast: {
        dates: ['2025-04-30T00:00:00'],
        values: [5.247261957159089],
        predictionLowerCi: [5.106995648921523],
        predictionUpperCi: [5.3875282653966545],
      },
      indicatorTrend: [
        'flat',
        'decreasing',
        'increasing',
        'flat',
        'flat',
        'decreasing',
        'increasing',
        'increasing',
        'increasing',
        'flat',
        'decreasing',
      ],
      seasonalDecomposition: {
        dates: [
          '2024-05-31T00:00:00',
          '2024-06-30T00:00:00',
          '2024-07-31T00:00:00',
          '2024-08-31T00:00:00',
          '2024-09-30T00:00:00',
          '2024-10-31T00:00:00',
          '2024-11-30T00:00:00',
          '2024-12-31T00:00:00',
          '2025-01-31T00:00:00',
          '2025-02-28T00:00:00',
          '2025-03-31T00:00:00',
        ],
        trendComponent: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        seasonalComponent: [
          0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        ],
        seasonalDecompositionResiduals: [
          0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        ],
      },
      indicatorEma: {
        dates: [
          '2024-05-31T00:00:00',
          '2024-06-30T00:00:00',
          '2024-07-31T00:00:00',
          '2024-08-31T00:00:00',
          '2024-09-30T00:00:00',
          '2024-10-31T00:00:00',
          '2024-11-30T00:00:00',
          '2024-12-31T00:00:00',
          '2025-01-31T00:00:00',
          '2025-02-28T00:00:00',
          '2025-03-31T00:00:00',
        ],
        values: [
          5.0, 4.944249333402444, 4.967251999792667, 4.978453024684694,
          4.984942078109977, 4.961577403395436, 4.971466138411094,
          5.002939322313321, 5.096554646838076, 5.166050084240416,
          5.19604590421855,
        ],
      },
      acfAnalysis: {
        acf: [
          1.0, 0.7107007575757572, 0.27817234848484745, -0.09966856060606206,
          -0.15459280303030423, -0.17826704545454589, -0.19673295454545395,
          -0.30634469696969574, -0.3039772727272714, -0.19483901515151428,
          -0.054450757575757174,
        ],
        acfLowerCi: [
          1.0, 0.11974938127309442, -0.5596856597498381, -0.9691809379661729,
          -1.0280858042143022, -1.0612631744321304, -1.0922094814769572,
          -1.2167900848088227, -1.2497351786195052, -1.1741224516450472,
          -1.0471796556744175,
        ],
        acfUpperCi: [
          1.0, 1.3016521338784202, 1.1160303567195329, 0.7698438167540487,
          0.7189001981536938, 0.7047290835230386, 0.6987435723860492,
          0.6041006908694313, 0.6417806331649625, 0.7844444213420186,
          0.9382781405229033,
        ],
      },
      pacfAnalysis: {
        pacf: [
          1.0, 0.7817708333333329, -0.697410607002424, -0.21525400794325897,
          1.1899046609070658,
        ],
        pacfLowerCi: [
          1.0, 0.19081945703067005, -1.2883619833050868, -0.8062053842459218,
          0.598953284604403,
        ],
        pacfUpperCi: [
          1.0, 1.3727222096359957, -0.10645923069976115, 0.3756973683594038,
          1.7808560372097286,
        ],
      },
      startDate: '2024-05-12T22:43:49+02:00',
      endDate: '2025-05-12T20:42:30.782000Z',
      realizationDetails: {
        realizationId: 40,
        indicatorName: 'Stopa bezrobocia rejestrowanego',
        indicatorSector: 'all',
        indicatorRegion: 'polska',
        indicatorFrequency: 'monthly',
      },
    },
    {
      rawTimeSeries: {
        dates: [
          '2024-05-31T00:00:00',
          '2024-06-30T00:00:00',
          '2024-07-31T00:00:00',
          '2024-08-31T00:00:00',
          '2024-09-30T00:00:00',
          '2024-10-31T00:00:00',
          '2024-11-30T00:00:00',
          '2024-12-31T00:00:00',
          '2025-01-31T00:00:00',
          '2025-02-28T00:00:00',
          '2025-03-31T00:00:00',
        ],
        values: [
          6488.0, 6485.0, 6489.0, 6470.0, 6462.0, 6458.0, 6463.0, 6454.0,
          6455.0, 6452.0, 6444.0,
        ],
      },
      inSamplePrediction: {
        dates: [
          '2024-06-30T00:00:00',
          '2024-07-31T00:00:00',
          '2024-08-31T00:00:00',
          '2024-09-30T00:00:00',
          '2024-10-31T00:00:00',
          '2024-11-30T00:00:00',
          '2024-12-31T00:00:00',
          '2025-01-31T00:00:00',
          '2025-02-28T00:00:00',
          '2025-03-31T00:00:00',
        ],
        values: [
          6483.492247561592, 6480.1977967319035, 6482.256457528652,
          6467.296267320423, 6457.151536469046, 6461.942389749585,
          6455.060575771683, 6451.363596983104, 6448.123476842062,
          6447.666609156135,
        ],
        predictionLowerCi: [
          6473.644010823086, 6470.606080969956, 6472.694272452807,
          6458.95043061667, 6448.86660971266, 6454.100984126618,
          6447.24875663133, 6443.552920045463, 6440.585449034492,
          6440.148279326476,
        ],
        predictionUpperCi: [
          6493.340484300098, 6489.789512493851, 6491.818642604498,
          6475.642104024176, 6465.436463225432, 6469.783795372553,
          6462.872394912036, 6459.174273920745, 6455.661504649632,
          6455.184938985793,
        ],
      },
      forecast: {
        dates: ['2025-04-30T00:00:00'],
        values: [6435.58913121528],
        predictionLowerCi: [6428.197457934283],
        predictionUpperCi: [6442.9808044962765],
      },
      indicatorTrend: [
        'flat',
        'decreasing',
        'increasing',
        'decreasing',
        'decreasing',
        'decreasing',
        'increasing',
        'decreasing',
        'increasing',
        'decreasing',
        'decreasing',
      ],
      seasonalDecomposition: {
        dates: [
          '2024-05-31T00:00:00',
          '2024-06-30T00:00:00',
          '2024-07-31T00:00:00',
          '2024-08-31T00:00:00',
          '2024-09-30T00:00:00',
          '2024-10-31T00:00:00',
          '2024-11-30T00:00:00',
          '2024-12-31T00:00:00',
          '2025-01-31T00:00:00',
          '2025-02-28T00:00:00',
          '2025-03-31T00:00:00',
        ],
        trendComponent: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        seasonalComponent: [
          0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        ],
        seasonalDecompositionResiduals: [
          0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        ],
      },
      indicatorEma: {
        dates: [
          '2024-05-31T00:00:00',
          '2024-06-30T00:00:00',
          '2024-07-31T00:00:00',
          '2024-08-31T00:00:00',
          '2024-09-30T00:00:00',
          '2024-10-31T00:00:00',
          '2024-11-30T00:00:00',
          '2024-12-31T00:00:00',
          '2025-01-31T00:00:00',
          '2025-02-28T00:00:00',
          '2025-03-31T00:00:00',
        ],
        values: [
          6488.0, 6486.3274800020745, 6487.430158941813, 6481.46840118735,
          6475.605327899295, 6470.7627013852925, 6468.764832844682,
          6465.1494719299635, 6462.756522534889, 6460.293050180803,
          6456.64449693352,
        ],
      },
      acfAnalysis: {
        acf: [
          1.0, 0.6665062067270267, 0.4140924795498916, 0.10102830923019859,
          -0.05963988692695543, -0.13502191814494774, -0.21168080079751878,
          -0.36224684883990654, -0.4146831086894144, -0.29853742472038886,
          -0.19981700738798513,
        ],
        acfLowerCi: [
          1.0, 0.07555483042436384, -0.39800051486454757, -0.7817284816186887,
          -0.9464253202963127, -1.0232069903183179, -1.1070053529818418,
          -1.2748818258973658, -1.3762208176065243, -1.320624101586756,
          -1.25191490468703,
        ],
        acfUpperCi: [
          1.0, 1.2574575830296895, 1.2261854739643308, 0.9837851000790858,
          0.8271455464424018, 0.7531631540284223, 0.6836437513868043,
          0.5503881282175527, 0.5468546002276954, 0.7235492521459781,
          0.8522808899110598,
        ],
      },
      pacfAnalysis: {
        pacf: [
          1.0, 0.7331568273997293, -0.06790743509523779, -0.45086994885593595,
          -0.03261471028113654,
        ],
        pacfLowerCi: [
          1.0, 0.1422054510970665, -0.6588588113979006, -1.0418213251585988,
          -0.6235660865837993,
        ],
        pacfUpperCi: [
          1.0, 1.3241082037023921, 0.523043941207425, 0.14008142744672686,
          0.5583366660215263,
        ],
      },
      startDate: '2024-05-12T22:43:49+02:00',
      endDate: '2025-05-12T20:42:30.782000Z',
      realizationDetails: {
        realizationId: 265,
        indicatorName: 'Przeciętne zatrudnienie w sektorze przedsiębiorstw',
        indicatorSector: 'all',
        indicatorRegion: 'polska',
        indicatorFrequency: 'monthly',
      },
    },
  ],
};
